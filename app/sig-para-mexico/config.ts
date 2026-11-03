// ── Datos editables del seminario ────────────────────────────────────────────
// Cambia estos valores cuando tengas la información definitiva.

export const ORGANIZADORES = ["Mtro. Sergio López Olvera", "Dr. Juan Carlos Olivo Escudero"];
export const CIESAS_LOGO = ""; // ruta del logo en /public, p. ej. "/sig-para-mexico/ciesas-golfo.svg"
export const CONTACTO = "lopezolverasergio@gmail.com";

// URL de la aplicación web de Apps Script (termina en /exec). Ver
// scripts/sig-para-mexico/INSTRUCCIONES.md. Mientras esté vacía, los
// formularios muestran un aviso en lugar de enviar.
export const FORMULARIOS_URL = "https://script.google.com/macros/s/AKfycbyRpiaVpml0Lc5NaqwIRnlpd0x3pRtnaZf7vbn0Ne4vJ-IH72dtQ1kMDShjXxSlFaAG/exec";

export const REGISTRO_URL = "/sig-para-mexico/registro";

export const SESIONES = [
  { id: "2026-11-30", fecha: "Lunes 30 de noviembre", tema: "Residuos sólidos urbanos y agua" },
  { id: "2026-12-01", fecha: "Martes 1 de diciembre", tema: "Riesgos y territorio" },
  { id: "2026-12-02", fecha: "Miércoles 2 de diciembre", tema: "Ciudades y servicios públicos" },
];
export const AGENDA_DIARIA = [
  { hora: "17:00", actividad: "Bienvenida y presentación del día" },
  { hora: "17:10", actividad: "Ponencia y preguntas" },
  { hora: "17:35", actividad: "Ponencia y preguntas" },
  { hora: "18:00", actividad: "Ponencia y preguntas" },
  { hora: "18:25", actividad: "Ponencia y preguntas" },
  { hora: "18:50", actividad: "Preguntas generales y cierre" },
];

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
