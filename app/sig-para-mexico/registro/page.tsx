import type { Metadata } from "next";
import FormularioRegistro from "./FormularioRegistro";
import styles from "../seminario.module.css";

export const metadata: Metadata = {
  title: "Registro · Seminario SIG para México",
  description:
    "Regístrate al seminario virtual SIG para México, del 30 de noviembre al 2 de diciembre de 2026.",
};

export default function Registro() {
  return (
    <main className={styles.seccion}>
      <div className={styles.dosColumnas}>
        <div>
          <h1 className={styles.tituloPagina}>Registro</h1>
          <p className={styles.nota}>
            Tres sesiones en línea por Microsoft Teams, del 30 de noviembre al 2 de diciembre
            de 2026, de 17:00 a 19:00, hora de la Ciudad de México.
          </p>
          <p className={styles.nota}>
            Quienes asistan recibirán una constancia digital emitida por CIESAS Golfo.
          </p>
        </div>
        <FormularioRegistro />
      </div>
    </main>
  );
}
