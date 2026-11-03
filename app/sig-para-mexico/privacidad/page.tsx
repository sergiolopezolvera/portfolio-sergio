import type { Metadata } from "next";
import { CONTACTO } from "../config";
import styles from "../seminario.module.css";

// Completa el domicilio del responsable: la ley pide identidad y domicilio.
const RESPONSABLE = "Sergio López Olvera";
const DOMICILIO = "Xalapa, Veracruz, México";
const ACTUALIZADO = "3 de noviembre de 2026";

export const metadata: Metadata = {
  title: "Aviso de privacidad · Seminario SIG para México",
  robots: { index: false, follow: true },
};

export default function Privacidad() {
  return (
    <main className={styles.seccion}>
      <article className={styles.documento}>
        <h1 className={styles.tituloPagina}>Aviso de privacidad</h1>
        <p className={styles.nota}>
          Seminario virtual SIG para México. Última actualización: {ACTUALIZADO}.
        </p>

        <h2>Quién es responsable de tus datos</h2>
        <p>
          {RESPONSABLE}, con domicilio en {DOMICILIO}, es responsable del tratamiento de los
          datos personales que nos proporcionas en los formularios de registro y de ponencias
          de este sitio, conforme a la Ley Federal de Protección de Datos Personales en
          Posesión de los Particulares.
        </p>

        <h2>Qué datos recabamos</h2>
        <p>
          Asistentes: nombre completo, correo electrónico, sector, institución o empresa,
          cargo, municipio y estado, sesiones elegidas y, si lo indicas, cómo te enteraste del
          seminario. También registramos tu asistencia a cada sesión.
        </p>
        <p>
          Ponentes: además de lo anterior, semblanza, información de la ponencia, diapositivas,
          y la grabación de la sesión.
        </p>
        <p>No recabamos datos personales sensibles.</p>

        <h2>Para qué los usamos</h2>
        <p>Finalidades necesarias para participar en el seminario:</p>
        <ul>
          <li>Registrarte y enviarte los enlaces de conexión e información de las sesiones.</li>
          <li>Verificar tu asistencia y gestionar la emisión de tu constancia digital.</li>
          <li>
            En el caso de ponentes, preparar el programa y publicar la ficha, las diapositivas
            y la grabación de su ponencia en este sitio.
          </li>
          <li>Elaborar estadísticas generales de participación, sin identificar personas.</li>
        </ul>
        <p>Finalidad adicional, solo si la autorizas en el formulario:</p>
        <ul>
          <li>Enviarte información sobre futuros seminarios, cursos y servicios relacionados con sistemas de información geográfica.</li>
        </ul>
        <p>
          Puedes negarte a la finalidad adicional sin que afecte tu participación: basta con no
          marcar la casilla o escribirnos en cualquier momento para retirar tu consentimiento.
        </p>

        <h2>Con quién los compartimos</h2>
        <p>
          Compartimos tu nombre, correo y registro de asistencia con el Centro de
          Investigaciones y Estudios Superiores en Antropología Social, Unidad Regional Golfo
          (CIESAS Golfo), únicamente para emitir las constancias. Los datos se almacenan en
          servicios de Google y las sesiones se realizan en Microsoft Teams, que actúan como
          proveedores tecnológicos. No vendemos ni cedemos tus datos a terceros para otros fines.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes acceder a tus datos, pedir que los corrijamos, solicitar que los eliminemos u
          oponerte a su uso (derechos ARCO), así como revocar tu consentimiento, escribiendo a{" "}
          <a href={`mailto:${CONTACTO}`} className={styles.enlace}>
            {CONTACTO}
          </a>{" "}
          con tu nombre, el derecho que quieres ejercer y un medio para responderte. Te
          contestaremos en un plazo máximo de 20 días hábiles.
        </p>

        <h2>Cuánto tiempo los conservamos</h2>
        <p>
          Conservamos los datos de registro y asistencia hasta un año después del seminario,
          para atender aclaraciones sobre constancias. Los datos de quienes autorizaron recibir
          información se conservan hasta que retiren su consentimiento.
        </p>

        <h2>Cambios a este aviso</h2>
        <p>Cualquier cambio a este aviso se publicará en esta misma página.</p>
      </article>
    </main>
  );
}
