import type { Metadata } from "next";
import { ESTRUCTURA } from "../config";
import FormularioPonencia from "./FormularioPonencia";
import styles from "../seminario.module.css";

export const metadata: Metadata = {
  title: "Ponentes · Seminario SIG para México",
  description: "Ficha de las ponencias del seminario SIG para México.",
  robots: { index: false, follow: false },
};

export default function Ponentes() {
  return (
    <main className={styles.seccion}>
      <div className={styles.dosColumnas}>
        <div>
          <h1 className={styles.tituloPagina}>Ficha de ponencia</h1>
          <p className={styles.nota}>
            Con estos datos armamos la ficha de tu ponencia en el sitio del seminario. Las
            fichas se ven en el programa y, después del seminario, junto a la grabación.
          </p>
          <p className={styles.nota}>
            Las diapositivas te las pediremos por correo una semana antes del seminario.
          </p>
          <p className={styles.nota}>Recuerda la estructura de 20 minutos:</p>
          <ol className={styles.listaSimple}>
            {ESTRUCTURA.map((e) => (
              <li key={e.parte}>
                {e.parte}, {e.minutos} min
              </li>
            ))}
          </ol>
        </div>
        <FormularioPonencia />
      </div>
    </main>
  );
}
