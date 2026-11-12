// ── Datos editables del seminario ────────────────────────────────────────────
// Cambia estos valores cuando tengas la información definitiva.

export const ORGANIZADORES = ["Mtro. Sergio López Olvera", "Dr. Juan Carlos Olivo Escudero"];
export const CIESAS_LOGO = "/sig-para-mexico/ciesas.png"; // emblema, en la portada
export const CIESAS_LOGO_COMPLETO = "/sig-para-mexico/secihti-ciesas.png"; // Secihti + CIESAS, en Organizan
export const CONTACTO = "lopezolverasergio@gmail.com";

// URL de la aplicación web de Apps Script (termina en /exec). Ver
// scripts/sig-para-mexico/INSTRUCCIONES.md. Mientras esté vacía, los
// formularios muestran un aviso en lugar de enviar.
export const FORMULARIOS_URL = "https://script.google.com/macros/s/AKfycbyRpiaVpml0Lc5NaqwIRnlpd0x3pRtnaZf7vbn0Ne4vJ-IH72dtQ1kMDShjXxSlFaAG/exec";

export const REGISTRO_URL = "/sig-para-mexico/registro";

// Agregar a tu calendario. Las tres sesiones son días consecutivos de 17:00 a
// 19:00 en la Ciudad de México (UTC-6, sin horario de verano), por eso se
// expresan como un evento en UTC que se repite 3 días.
// El archivo .ics está en public/sig-para-mexico/sig-para-mexico.ics: si
// cambias fechas o textos aquí, cámbialos también allá.
export const CALENDARIO_ICS = "/sig-para-mexico/sig-para-mexico.ics";
const CAL_TITULO = "Seminario SIG para México";
const CAL_DETALLE =
  "Seminario virtual con aval académico de CIESAS Golfo. Tres sesiones, del 30 de noviembre al 2 de diciembre, de 17:00 a 19:00 (hora de la Ciudad de México). El enlace para conectarte llega por correo al registrarte en https://sergiolopezolvera.com/sig-para-mexico/registro";
export const CALENDARIO_GOOGLE =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: CAL_TITULO,
    dates: "20261130T230000Z/20261201T010000Z",
    details: CAL_DETALLE,
    location: "En línea",
    recur: "RRULE:FREQ=DAILY;COUNT=3",
    ctz: "America/Mexico_City",
  }).toString();

export const SESIONES = [
  { id: "2026-11-30", fecha: "Lunes 30 de noviembre", tema: "Residuos sólidos urbanos y agua" },
  { id: "2026-12-01", fecha: "Martes 1 de diciembre", tema: "Riesgos y territorio" },
  { id: "2026-12-02", fecha: "Miércoles 2 de diciembre", tema: "Ciudades y servicios públicos" },
];
// Apertura y cierre, iguales en las tres sesiones.
export const APERTURA = { hora: "17:00", actividad: "Bienvenida y presentación del día" };
export const CIERRE = { hora: "18:50", actividad: "Preguntas generales y cierre" };

// Ponencias por sesión (la clave es el id de SESIONES).
// Con confirmada: false, la página muestra "Ponencia por confirmar" en lugar
// del nombre y el título; cambia a true cuando la persona confirme.
export type Ponencia = {
  hora: string;
  ponente: string;
  afiliacion: string;
  titulo: string;
  confirmada: boolean;
};

export const PONENCIAS: Record<string, Ponencia[]> = {
  "2026-11-30": [
    {
      hora: "17:10",
      ponente: "Mario Daniel Muñoz Ríos",
      afiliacion: "Universidad de Guadalajara",
      titulo: "Del lago a la llave: cartografía ciudadana para comprender la crisis del agua en Guadalajara",
      confirmada: true,
    },
    {
      hora: "17:35",
      ponente: "Carmen Julia Navarro Gómez",
      afiliacion: "Universidad Autónoma de Chihuahua / JMAS",
      titulo: "Acuíferos sobreexplotados y sectorización de redes de agua en Chihuahua",
      confirmada: true,
    },
    {
      hora: "18:00",
      ponente: "Juan Antonio Araiza Aguilar",
      afiliacion: "UNICACH",
      titulo: "Recolección de basura con menos paradas y más toneladas: rutas SIG en Villaflores, Chiapas",
      confirmada: true,
    },
    {
      hora: "18:25",
      ponente: "Juan Carlos Olivo Escudero",
      afiliacion: "CIESAS Golfo",
      titulo: "Ordenación del territorio para la gestión de los residuos sólidos urbanos",
      confirmada: true,
    },
  ],
  "2026-12-01": [
    {
      hora: "17:10",
      ponente: "Javier Gómez Maturano",
      afiliacion: "CIMAV",
      titulo: "¿Dónde poner el relleno sanitario? SIG y análisis multicriterio en 23 municipios de Puebla",
      confirmada: true,
    },
    {
      hora: "17:35",
      ponente: "Fernando Silva López",
      afiliacion: "CENAPRED",
      titulo: "Preparación del Atlas Nacional de Riesgos",
      confirmada: true,
    },
    {
      hora: "18:00",
      ponente: "José Antonio Ávalos Lozano",
      afiliacion: "UASLP / VARICLIM",
      titulo: "El primer Atlas Dinámico de Riesgos de México: alertar en tiempo real en San Luis Potosí",
      confirmada: true,
    },
    {
      hora: "18:25",
      ponente: "Jorge Paolo Ortiz Sauceda",
      afiliacion: "ALOS Consultores",
      titulo: "Micro-Zonificación Policial y Acreditación de Servicios de Seguridad: Inteligencia Espacial para la Eficiencia Municipal",
      confirmada: true,
    },
  ],
  "2026-12-02": [
    {
      hora: "17:10",
      ponente: "Camilo Alberto Caudillo Cos",
      afiliacion: "CentroGeo",
      titulo: "¿Quién queda fuera del transporte? Desventaja de movilidad en la Zona Metropolitana del Valle de México",
      confirmada: true,
    },
    {
      hora: "17:35",
      ponente: "Harmida Rubio Gutiérrez",
      afiliacion: "Universidad Veracruzana",
      titulo: "Mapear la violencia contra las mujeres para decidir en el municipio: la cartografía por colonias de Xalapa",
      confirmada: false,
    },
    {
      hora: "18:00",
      ponente: "Hennessy Amor Becerra Ayala",
      afiliacion: "IIEG Jalisco",
      titulo: "Del siniestro al mapa: SiniestraliMap y MapaLab para decidir dónde intervenir en la ciudad",
      confirmada: true,
    },
    {
      hora: "18:25",
      ponente: "Yunive Moreno Sánchez",
      afiliacion: "Visor Urbano, Jalisco",
      titulo: "El mapa que decide trámites: catastro multipropósito y licencias en línea con Visor Urbano",
      confirmada: false,
    },
  ],
};

export const ESTRUCTURA = [
  {
    parte: "Problema",
    minutos: 5,
    detalle: "Qué ocurre, a quién afecta, cómo lo afecta y dónde se presenta.",
  },
  {
    parte: "Abordaje con SIG",
    minutos: 7,
    detalle: "Datos, técnicas, software y método empleados.",
  },
  {
    parte: "Resultados",
    minutos: 6,
    detalle: "Mapas, modelos, propuestas y datos generados.",
  },
  {
    parte: "Conclusiones",
    minutos: 2,
    detalle: "Qué puede hacer con esto una dependencia desde mañana.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────
