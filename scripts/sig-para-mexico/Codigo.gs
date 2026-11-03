/**
 * Seminario SIG para México 2026 — receptor de formularios.
 *
 * Recibe dos formularios de sergiolopezolvera.com/sig-para-mexico:
 *   - tipo "registro": asistentes → hoja "Registro" + correo de confirmación
 *   - tipo "ponencia": ponentes   → hoja "Ponencias" + archivo en Drive
 *
 * Instalación: ver INSTRUCCIONES.md en esta misma carpeta.
 */

// ── Configuración ───────────────────────────────────────────────────────────
const CONFIG = {
  // Carpeta "Archivos de ponentes" en Drive
  CARPETA_PONENTES_ID: "1QuIazsGBbLaktZZ1XMr4w1shuEu3e2tv",
  // Enlaces de cada webinar de Teams. Si están vacíos, el correo de confirmación
  // avisa que el enlace llegará más adelante.
  TEAMS: {
    "2026-11-30": "",
    "2026-12-01": "",
    "2026-12-02": "",
  },
  NOMBRE_SESION: {
    "2026-11-30": "Lunes 30 de noviembre",
    "2026-12-01": "Martes 1 de diciembre",
    "2026-12-02": "Miércoles 2 de diciembre",
  },
  REMITENTE: "Seminario SIG para México",
  RESPONDER_A: "lopezolverasergio@gmail.com",
  MAX_ARCHIVO_MB: 25,
};

const COLUMNAS_REGISTRO = [
  "Fecha de registro", "Nombre (constancia)", "Correo", "Sector", "Institución o empresa",
  "Cargo", "Municipio", "Estado", "Sesiones", "Cómo se enteró",
  "Acepta aviso de privacidad", "Acepta recibir novedades",
];

const COLUMNAS_PONENCIA = [
  "Fecha de envío", "Nombre", "Correo", "Institución", "Semblanza", "Título",
  "Sesión", "Problema", "Población afectada", "Región", "Técnicas y métodos",
  "Software", "Fuentes de datos", "Archivo", "Autoriza grabar y publicar",
  "Interés en capítulo del libro",
];
// ────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const datos = JSON.parse(e.postData.contents);
    if (datos.sitio_web) return responder({ ok: true }); // campo trampa para bots

    if (datos.tipo === "registro") return responder(guardarRegistro(datos));
    if (datos.tipo === "ponencia") return responder(guardarPonencia(datos));
    return responder({ ok: false, error: "Formulario desconocido." });
  } catch (err) {
    console.error(err);
    return responder({ ok: false, error: "No pudimos guardar tus datos. Intenta de nuevo en unos minutos." });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return responder({ ok: true, servicio: "SIG para México" });
}

function guardarRegistro(d) {
  const correo = limpiar(d.correo).toLowerCase();
  if (!limpiar(d.nombre) || !esCorreo(correo)) {
    return { ok: false, error: "Revisa tu nombre y tu correo." };
  }
  if (d.acepta_privacidad !== true) {
    return { ok: false, error: "Para registrarte necesitas aceptar el aviso de privacidad." };
  }
  const sesiones = (Array.isArray(d.sesiones) ? d.sesiones : []).filter((s) => s in CONFIG.TEAMS);
  if (sesiones.length === 0) {
    return { ok: false, error: "Elige al menos una sesión." };
  }

  const hoja = hojaCon("Registro", COLUMNAS_REGISTRO);
  const existente = buscarFila(hoja, 3, correo);
  const fila = [
    new Date(), limpiar(d.nombre), correo, limpiar(d.sector), limpiar(d.institucion),
    limpiar(d.cargo), limpiar(d.municipio), limpiar(d.estado),
    sesiones.map((s) => CONFIG.NOMBRE_SESION[s]).join(", "), limpiar(d.como_se_entero),
    "Sí", d.acepta_novedades === true ? "Sí" : "No",
  ];
  if (existente) {
    hoja.getRange(existente, 1, 1, fila.length).setValues([fila]);
  } else {
    hoja.appendRow(fila);
  }

  enviarConfirmacion(limpiar(d.nombre), correo, sesiones);
  return { ok: true, actualizado: Boolean(existente) };
}

function guardarPonencia(d) {
  const correo = limpiar(d.correo).toLowerCase();
  if (!limpiar(d.nombre) || !esCorreo(correo) || !limpiar(d.titulo)) {
    return { ok: false, error: "Revisa tu nombre, tu correo y el título de la ponencia." };
  }
  if (d.autoriza_publicar !== true) {
    return { ok: false, error: "Necesitamos tu autorización para grabar y publicar la ponencia." };
  }

  let enlaceArchivo = "";
  if (d.archivo && d.archivo.contenido) {
    const tipo = String(d.archivo.tipo || "");
    const permitido =
      tipo === "application/pdf" ||
      tipo === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      tipo === "application/vnd.ms-powerpoint";
    if (!permitido) return { ok: false, error: "El archivo debe ser PDF o PowerPoint." };

    const bytes = Utilities.base64Decode(d.archivo.contenido);
    if (bytes.length > CONFIG.MAX_ARCHIVO_MB * 1024 * 1024) {
      return { ok: false, error: `El archivo pesa más de ${CONFIG.MAX_ARCHIVO_MB} MB.` };
    }
    const nombreArchivo = `${limpiar(d.nombre)} - ${limpiar(d.archivo.nombre)}`.slice(0, 200);
    const archivo = DriveApp.getFolderById(CONFIG.CARPETA_PONENTES_ID)
      .createFile(Utilities.newBlob(bytes, tipo, nombreArchivo));
    enlaceArchivo = archivo.getUrl();
  }

  const hoja = hojaCon("Ponencias", COLUMNAS_PONENCIA);
  hoja.appendRow([
    new Date(), limpiar(d.nombre), correo, limpiar(d.institucion), limpiar(d.semblanza),
    limpiar(d.titulo), CONFIG.NOMBRE_SESION[d.sesion] || "", limpiar(d.problema),
    limpiar(d.afectados), limpiar(d.region), limpiar(d.tecnicas), limpiar(d.software),
    limpiar(d.datos), enlaceArchivo, "Sí", d.interes_libro === true ? "Sí" : "No",
  ]);
  return { ok: true };
}

function enviarConfirmacion(nombre, correo, sesiones) {
  const lineas = sesiones.map((s) => {
    const enlace = CONFIG.TEAMS[s];
    return `• ${CONFIG.NOMBRE_SESION[s]}, 17:00 a 19:00 (hora de la Ciudad de México)\n  ${
      enlace ? `Enlace de Teams: ${enlace}` : "Te enviaremos el enlace de Teams antes de la sesión."
    }`;
  });
  const cuerpo = [
    `Hola, ${nombre}:`,
    "",
    "Tu registro al seminario virtual SIG para México quedó confirmado. Estas son tus sesiones:",
    "",
    ...lineas,
    "",
    "Al entrar a Teams usa este mismo nombre y correo; así podremos registrar tu asistencia para la constancia digital de CIESAS Golfo.",
    "",
    "Programa y detalles: https://sergiolopezolvera.com/sig-para-mexico",
    "",
    "Si tienes dudas, responde a este correo.",
  ].join("\n");

  MailApp.sendEmail({
    to: correo,
    subject: "Registro confirmado · Seminario SIG para México",
    body: cuerpo,
    name: CONFIG.REMITENTE,
    replyTo: CONFIG.RESPONDER_A,
  });
}

// ── Utilidades ──────────────────────────────────────────────────────────────
function hojaCon(nombre, columnas) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(nombre);
  if (!hoja) {
    hoja = libro.insertSheet(nombre);
    hoja.appendRow(columnas);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, columnas.length).setFontWeight("bold");
  }
  return hoja;
}

function buscarFila(hoja, columna, valor) {
  const ultima = hoja.getLastRow();
  if (ultima < 2) return 0;
  const valores = hoja.getRange(2, columna, ultima - 1, 1).getValues();
  const i = valores.findIndex((f) => String(f[0]).toLowerCase() === valor);
  return i === -1 ? 0 : i + 2;
}

function limpiar(v) {
  // Evita que un texto empiece con = + - @ y se interprete como fórmula
  return String(v == null ? "" : v).trim().slice(0, 2000).replace(/^[=+\-@]/, "'$&");
}

function esCorreo(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Ejecútala una vez desde el editor para autorizar permisos y crear las hojas. */
function preparar() {
  hojaCon("Registro", COLUMNAS_REGISTRO);
  hojaCon("Ponencias", COLUMNAS_PONENCIA);
  DriveApp.getFolderById(CONFIG.CARPETA_PONENTES_ID).getName();
  console.log(`Correos disponibles hoy: ${MailApp.getRemainingDailyQuota()}`);
}
