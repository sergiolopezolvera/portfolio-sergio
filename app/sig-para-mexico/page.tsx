import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import styles from "./seminario.module.css";

// ── Datos editables del seminario ────────────────────────────────────────────
// Cambia estos valores cuando tengas la información definitiva.
const COORDINADOR_SEMINARIO = "Nombre del coordinador"; // tu amigo, coordinador del seminario
const REGISTRO_URL = ""; // enlace al formulario de registro; vacío = aún no abre
const CONTACTO = "lopezolverasergio@gmail.com";

const DIAS = [
  { fecha: "Lunes 30 de noviembre", tema: "Agua y medio ambiente" },
  { fecha: "Martes 1 de diciembre", tema: "Riesgos y territorio" },
  { fecha: "Miércoles 2 de diciembre", tema: "Ciudades y servicios públicos" },
];

const AGENDA_DIARIA = [
  { hora: "17:00", actividad: "Bienvenida y presentación del día" },
  { hora: "17:10", actividad: "Ponencia y preguntas" },
  { hora: "17:35", actividad: "Ponencia y preguntas" },
  { hora: "18:00", actividad: "Ponencia y preguntas" },
  { hora: "18:25", actividad: "Ponencia y preguntas" },
  { hora: "18:50", actividad: "Preguntas generales y cierre" },
];

const ESTRUCTURA = [
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

const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
});

const sourceSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIG para México · Seminario virtual para servidores públicos",
  description:
    "Seminario virtual, del 30 de noviembre al 2 de diciembre de 2026, sobre cómo los sistemas de información geográfica ayudan a entender y resolver problemas públicos de México. Con el aval académico de CIESAS Golfo.",
  openGraph: {
    title: "SIG para México",
    description:
      "Seminario virtual para servidores públicos municipales y estatales. 30 de noviembre al 2 de diciembre de 2026, de 17:00 a 19:00 (Ciudad de México).",
    locale: "es_MX",
    type: "website",
  },
};

// Curvas de nivel generadas: dos elevaciones con bordes irregulares,
// al estilo de una carta topográfica.
function curva(cx: number, cy: number, r: number, i: number, semilla: number) {
  const puntos: string[] = [];
  const pasos = 96;
  for (let k = 0; k <= pasos; k++) {
    const t = (k / pasos) * Math.PI * 2;
    const ruido =
      1 +
      0.11 * Math.sin(3 * t + i * 0.45 + semilla) +
      0.06 * Math.sin(5 * t - i * 0.3 + semilla * 2) +
      0.03 * Math.sin(9 * t + i * 0.8);
    const x = cx + Math.cos(t) * r * ruido * 1.25;
    const y = cy + Math.sin(t) * r * ruido;
    puntos.push(`${k === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return puntos.join(" ") + "Z";
}

function CurvasDeNivel() {
  const cerros = [
    { cx: 800, cy: 260, niveles: 14, paso: 26, semilla: 0.7 },
    { cx: 1040, cy: 520, niveles: 9, paso: 24, semilla: 2.1 },
  ];
  return (
    <svg
      className={styles.curvas}
      viewBox="0 0 1100 640"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      {cerros.map((c) =>
        Array.from({ length: c.niveles }, (_, i) => (
          <path
            key={`${c.cx}-${i}`}
            d={curva(c.cx, c.cy, 18 + i * c.paso, i, c.semilla)}
            className={i % 5 === 4 ? styles.curvaMaestra : styles.curva}
          />
        )),
      )}
      <path
        className={styles.rio}
        d="M-20 625 C 200 600, 330 632, 480 598 S 640 470, 700 430 S 760 340, 900 300 S 1060 250, 1140 180"
      />
    </svg>
  );
}

function Registro({ grande = false }: { grande?: boolean }) {
  if (REGISTRO_URL) {
    return (
      <a href={REGISTRO_URL} className={grande ? styles.botonGrande : styles.boton}>
        Registrarme
      </a>
    );
  }
  return (
    <a
      href={`mailto:${CONTACTO}?subject=${encodeURIComponent("Registro al seminario SIG para México")}`}
      className={grande ? styles.botonGrande : styles.boton}
    >
      Avísenme cuando abra el registro
    </a>
  );
}

export default function SeminarioSIG() {
  const totalMinutos = ESTRUCTURA.reduce((s, e) => s + e.minutos, 0);

  return (
    <div className={`${styles.pagina} ${archivo.variable} ${sourceSerif.variable}`} lang="es">
      <header className={styles.barra}>
        <Link href="/" className={styles.marca}>
          Sergio López Olvera
        </Link>
        <nav className={styles.nav} aria-label="Secciones">
          <a href="#programa">Programa</a>
          <a href="#ponencias">Ponencias</a>
          <a href="#libro">Libro</a>
          <a href="#registro">Registro</a>
        </nav>
      </header>

      <main>
        <section className={styles.portada}>
          <CurvasDeNivel />
          <span className={`${styles.coord} ${styles.coordArriba}`}>19°32′ N</span>
          <span className={`${styles.coord} ${styles.coordAbajo}`}>96°55′ O</span>

          <div className={styles.portadaTexto}>
            <p className={styles.antetitulo}>Seminario virtual para servidores públicos</p>
            <h1 className={styles.titulo}>
              SIG para
              <br />
              México
            </h1>
            <p className={styles.bajada}>
              Tres tardes para ver cómo los sistemas de información geográfica ayudan a
              entender y resolver problemas públicos del país, sus regiones y sus ciudades.
            </p>

            <dl className={styles.ficha}>
              <div>
                <dt>Fechas</dt>
                <dd>30 de noviembre al 2 de diciembre de 2026</dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>17:00 a 19:00, hora de la Ciudad de México</dd>
              </div>
              <div>
                <dt>Modalidad</dt>
                <dd>En línea</dd>
              </div>
              <div>
                <dt>Aval académico</dt>
                <dd>CIESAS Golfo</dd>
              </div>
            </dl>

            <div className={styles.acciones}>
              <Registro />
              <a href="#programa" className={styles.enlace}>
                Ver el programa
              </a>
            </div>
          </div>
        </section>

        <section className={styles.seccion} aria-labelledby="dirigido">
          <div className={styles.dosColumnas}>
            <h2 id="dirigido" className={styles.h2}>
              Para quién es
            </h2>
            <div className={styles.prosa}>
              <p>
                Para personal de ayuntamientos y dependencias estatales que trabaja con
                agua, protección civil, desarrollo urbano, catastro, medio ambiente, salud o
                servicios públicos, y quiere saber qué puede hacer con datos geográficos.
              </p>
              <p>
                No necesitas experiencia previa en SIG. Cada ponencia parte de un problema
                concreto y muestra, paso a paso, cómo se analizó y qué se obtuvo.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.seccion} aria-labelledby="formato">
          <div className={styles.dosColumnas}>
            <div>
              <h2 id="formato" className={styles.h2}>
                Veinte minutos por caso
              </h2>
              <p className={styles.nota}>
                Todas las ponencias siguen la misma estructura, para que puedas comparar
                problemas y métodos de un caso a otro.
              </p>
            </div>

            <div>
              <div
                className={styles.regla}
                role="img"
                aria-label={`Reparto de los ${totalMinutos} minutos: ${ESTRUCTURA.map((e) => `${e.parte}, ${e.minutos} minutos`).join("; ")}.`}
              >
                {ESTRUCTURA.map((e) => (
                  <div
                    key={e.parte}
                    className={styles.tramo}
                    style={{ flexGrow: e.minutos }}
                  >
                    <span>{e.minutos} min</span>
                  </div>
                ))}
              </div>
              <ol className={styles.estructura}>
                {ESTRUCTURA.map((e) => (
                  <li key={e.parte}>
                    <h3>{e.parte}</h3>
                    <p>{e.detalle}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="programa" className={styles.seccion} aria-labelledby="programa-t">
          <h2 id="programa-t" className={styles.h2}>
            Programa
          </h2>
          <p className={styles.nota}>
            Cuatro ponencias por tarde. Los nombres de ponentes y títulos se publicarán
            aquí en cuanto estén confirmados.
          </p>

          <div className={styles.dias}>
            {DIAS.map((d) => (
              <article key={d.fecha} className={styles.dia}>
                <p className={styles.fecha}>{d.fecha}</p>
                <h3 className={styles.tema}>{d.tema}</h3>
                <table className={styles.agenda}>
                  <tbody>
                    {AGENDA_DIARIA.map((a, i) => (
                      <tr key={`${d.fecha}-${i}`}>
                        <th scope="row">{a.hora}</th>
                        <td>{a.actividad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>

        <section id="ponencias" className={styles.seccion} aria-labelledby="ponencias-t">
          <div className={styles.dosColumnas}>
            <h2 id="ponencias-t" className={styles.h2}>
              Ponencias
            </h2>
            <div className={styles.prosa}>
              <p>
                Después del seminario, cada ponencia quedará disponible en esta página con
                su grabación, sus diapositivas y una ficha que resume el problema, la región,
                las técnicas y datos empleados y quién la presentó.
              </p>
            </div>
          </div>
        </section>

        <section id="libro" className={`${styles.seccion} ${styles.libro}`} aria-labelledby="libro-t">
          <div className={styles.dosColumnas}>
            <h2 id="libro-t" className={styles.h2}>
              Un libro abierto
            </h2>
            <div className={styles.prosa}>
              <p>
                Varias ponencias se convertirán en capítulos de <cite>SIG para México</cite>,
                un manual gratuito para aprender sistemas de información geográfica con
                ejercicios sobre problemas públicos del país, hechos con software libre y
                datos abiertos.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.seccion} aria-labelledby="organizan">
          <h2 id="organizan" className={styles.h2}>
            Organizan
          </h2>
          <dl className={styles.creditos}>
            <div>
              <dt>Coordinación del seminario</dt>
              <dd>{COORDINADOR_SEMINARIO}</dd>
            </div>
            <div>
              <dt>Coordinación del libro</dt>
              <dd>Sergio López Olvera</dd>
            </div>
            <div>
              <dt>Aval académico</dt>
              <dd>Centro de Investigaciones y Estudios Superiores en Antropología Social, Unidad Regional Golfo</dd>
            </div>
          </dl>
        </section>

        <section id="registro" className={`${styles.seccion} ${styles.cierre}`} aria-labelledby="registro-t">
          <h2 id="registro-t" className={styles.h2Cierre}>
            Tres tardes, doce casos
          </h2>
          <p className={styles.nota}>
            {REGISTRO_URL
              ? "El registro es en línea. Recibirás el enlace de conexión por correo antes de cada sesión."
              : "El registro abrirá pronto. Escríbenos y te mandamos el enlace en cuanto esté listo."}
          </p>
          <Registro grande />
        </section>
      </main>

      <footer className={styles.pie}>
        <p>
          Dudas:{" "}
          <a href={`mailto:${CONTACTO}`} className={styles.enlace}>
            {CONTACTO}
          </a>
        </p>
      </footer>
    </div>
  );
}
