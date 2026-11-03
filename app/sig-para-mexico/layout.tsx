import type { ReactNode } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { CONTACTO } from "./config";
import styles from "./seminario.module.css";

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

export default function SeminarioLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.pagina} ${archivo.variable} ${sourceSerif.variable}`} lang="es">
      <header className={styles.barra}>
        <div className={styles.marcas}>
          <Link href="/" className={styles.marca}>
            Sergio López Olvera
          </Link>
          <a
            href="https://www.linkedin.com/in/juan-carlos-olivo-escudero-098717132/"
            className={styles.marca}
            target="_blank"
            rel="noopener noreferrer"
          >
            Juan Carlos Olivo Escudero
          </a>
        </div>
        <nav className={styles.nav} aria-label="Secciones">
          <Link href="/sig-para-mexico#programa">Programa</Link>
          <Link href="/sig-para-mexico#ponencias">Ponencias</Link>
          <Link href="/sig-para-mexico#libro">Libro</Link>
          <Link href="/sig-para-mexico/registro">Registro</Link>
        </nav>
      </header>

      {children}

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
