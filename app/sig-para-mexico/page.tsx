import type { Metadata } from "next";
import {
  APERTURA,
  CALENDARIO_GOOGLE,
  CALENDARIO_ICS,
  CIERRE,
  CIESAS_LOGO,
  CIESAS_LOGO_COMPLETO,
  ESTRUCTURA,
  ORGANIZADORES,
  PONENCIAS,
  REGISTRO_URL,
  SESIONES,
} from "./config";
import styles from "./seminario.module.css";

export const metadata: Metadata = {
  title: "SIG para México: Herramientas para la gestión territorial: RSU, agua, riesgos, la ciudad y sus servicios públicos",
  description:
    "Seminario virtual, del 30 de noviembre al 2 de diciembre de 2026, para servidores públicos y prestadores de servicios sobre herramientas SIG para la gestión territorial: residuos sólidos urbanos (RSU), agua, riesgos, la ciudad y sus servicios públicos. Constancia digital de CIESAS Golfo.",
  openGraph: {
    title: "SIG para México: Herramientas para la gestión territorial: RSU, agua, riesgos, la ciudad y sus servicios públicos",
    description:
      "Seminario virtual para servidores públicos y prestadores de servicios. 30 de noviembre al 2 de diciembre de 2026, de 17:00 a 19:00 (Ciudad de México).",
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
  return (
    <a href={REGISTRO_URL} className={grande ? styles.botonGrande : styles.boton}>
      Registrarme
    </a>
  );
}

function Calendario() {
  return (
    <p className={styles.calendario}>
      <span className={styles.calendarioEtiqueta}>Agrega las tres sesiones a tu calendario:</span>{" "}
      <a href={CALENDARIO_GOOGLE} className={styles.enlace} target="_blank" rel="noopener noreferrer">
        Google Calendar
      </a>
      <span aria-hidden="true"> · </span>
      <a href={CALENDARIO_ICS} className={styles.enlace} download="sig-para-mexico.ics">
        Outlook, Apple y otros (.ics)
      </a>
    </p>
  );
}

function LogoCiesas({ completo = false }: { completo?: boolean }) {
  const src = completo ? CIESAS_LOGO_COMPLETO : CIESAS_LOGO;
  const clase = completo ? styles.logoCompleto : styles.logo;
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={completo ? "Secretaría de Ciencia, Humanidades, Tecnología e Innovación y CIESAS" : "CIESAS"}
        className={clase}
      />
    );
  }
  return <span className={`${clase} ${styles.logoVacio}`} aria-hidden="true" />;
}

export default function SeminarioSIG() {
  const totalMinutos = ESTRUCTURA.reduce((s, e) => s + e.minutos, 0);

  return (
    <main>
        <section className={styles.portada}>
          <CurvasDeNivel />
          <span className={`${styles.coord} ${styles.coordArriba}`}>19°32′ N</span>
          <span className={`${styles.coord} ${styles.coordAbajo}`}>96°55′ O</span>

          <div className={styles.portadaTexto}>
            <p className={styles.antetitulo}>
              Seminario virtual para servidores públicos y prestadores de servicios
            </p>
            <h1 className={styles.titulo}>
              SIG para
              <br />
              México
              <span className={styles.subtitulo}>
                Herramientas para la gestión territorial: RSU, agua, riesgos, la ciudad y sus
                servicios públicos
              </span>
            </h1>
            <p className={styles.bajada}>
              Tres sesiones para ver cómo los sistemas de información geográfica ayudan a
              gestionar residuos sólidos urbanos, agua, riesgos y servicios en municipios y
              estados de México.
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
                <dt>Constancia digital</dt>
                <dd className={styles.conLogo}>
                  <LogoCiesas />
                  CIESAS Golfo
                </dd>
              </div>
            </dl>

            <div className={styles.acciones}>
              <Registro />
              <a href="#programa" className={styles.enlace}>
                Ver el programa
              </a>
            </div>
            <Calendario />
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
                También para consultoras, despachos y profesionistas que prestan servicios
                a gobiernos municipales y estatales: estudios, proyectos ejecutivos,
                ordenamiento territorial o evaluaciones ambientales.
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
            Cuatro ponencias por sesión, de 20 minutos cada una con espacio para preguntas.
            Horario del centro de México.
          </p>

          <div className={styles.dias}>
            {SESIONES.map((d) => (
              <article key={d.fecha} className={styles.dia}>
                <p className={styles.fecha}>{d.fecha}</p>
                <h3 className={styles.tema}>{d.tema}</h3>
                <table className={styles.agenda}>
                  <tbody>
                    <tr>
                      <th scope="row">{APERTURA.hora}</th>
                      <td className={styles.actividad}>{APERTURA.actividad}</td>
                    </tr>
                    {(PONENCIAS[d.id] ?? []).map((p) => (
                      <tr key={`${d.id}-${p.hora}`}>
                        <th scope="row">{p.hora}</th>
                        {p.confirmada ? (
                          <td>
                            <span className={styles.tituloPonencia}>{p.titulo}</span>
                            <span className={styles.ponente}>{p.ponente}</span>
                            <span className={styles.afiliacion}>{p.afiliacion}</span>
                          </td>
                        ) : (
                          <td className={styles.porConfirmar}>Ponencia por confirmar</td>
                        )}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row">{CIERRE.hora}</th>
                      <td className={styles.actividad}>{CIERRE.actividad}</td>
                    </tr>
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
              <dt className={styles.oculto}>Organizadores</dt>
              {ORGANIZADORES.map((nombre) => (
                <dd key={nombre} className={styles.organizador}>
                  {nombre}
                </dd>
              ))}
            </div>
            <div>
              <dt>Aval académico y constancia</dt>
              <dd className={styles.conLogoApilado}>
                <LogoCiesas completo />
                <span>
                  Centro de Investigaciones y Estudios Superiores en Antropología Social,
                  Unidad Regional Golfo
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section id="registro" className={`${styles.seccion} ${styles.cierre}`} aria-labelledby="registro-t">
          <h2 id="registro-t" className={styles.h2Cierre}>
            Tres sesiones, doce casos
          </h2>
          <p className={styles.nota}>
            Regístrate en línea y recibirás por correo el enlace para conectarte a las
            sesiones. Quienes asistan recibirán una constancia digital emitida por CIESAS
            Golfo.
          </p>
          <Registro grande />
          <Calendario />
        </section>
    </main>
  );
}
