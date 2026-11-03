"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SESIONES } from "../config";
import { enviar } from "../_componentes/enviar";
import styles from "../seminario.module.css";

type Estado = "listo" | "enviando" | "hecho" | "error";

export default function FormularioPonencia() {
  const [estado, setEstado] = useState<Estado>("listo");
  const [mensaje, setMensaje] = useState("");

  async function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEstado("enviando");
    const r = await enviar({
      tipo: "ponencia",
      nombre: f.get("nombre"),
      correo: f.get("correo"),
      institucion: f.get("institucion"),
      semblanza: f.get("semblanza"),
      titulo: f.get("titulo"),
      sesion: f.get("sesion"),
      problema: f.get("problema"),
      afectados: f.get("afectados"),
      region: f.get("region"),
      tecnicas: f.get("tecnicas"),
      software: f.get("software"),
      datos: f.get("datos"),
      autoriza_publicar: f.get("autoriza_publicar") === "on",
      interes_libro: f.get("interes_libro") === "on",
      sitio_web: f.get("sitio_web"),
    });
    if (r.ok) {
      setEstado("hecho");
    } else {
      setEstado("error");
      setMensaje(r.error ?? "No pudimos guardar tu información.");
    }
  }

  if (estado === "hecho") {
    return (
      <div className={styles.confirmacion} role="status">
        <h2 className={styles.h2}>Recibimos tu ponencia</h2>
        <p>
          Gracias. Revisaremos la ficha y, una semana antes del seminario, te escribiremos
          para pedirte las diapositivas y acordar el ensayo técnico.
        </p>
        <Link href="/sig-para-mexico" className={styles.enlace}>
          Ver el programa
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.formulario} onSubmit={alEnviar}>
      <fieldset className={styles.grupo}>
        <legend>Quién presenta</legend>
        <label className={styles.campo}>
          <span>Nombre con grado académico</span>
          <input name="nombre" required maxLength={150} placeholder="Dra. Ana Pérez López" />
        </label>
        <label className={styles.campo}>
          <span>Correo electrónico</span>
          <input name="correo" type="email" required autoComplete="email" maxLength={150} />
        </label>
        <label className={styles.campo}>
          <span>Institución</span>
          <input name="institucion" required maxLength={200} />
        </label>
        <label className={styles.campo}>
          <span>Semblanza breve</span>
          <textarea name="semblanza" required rows={4} maxLength={600} />
          <small>Hasta 600 caracteres. Aparecerá en la ficha de tu ponencia.</small>
        </label>
      </fieldset>

      <fieldset className={styles.grupo}>
        <legend>La ponencia</legend>
        <label className={styles.campo}>
          <span>Título</span>
          <input name="titulo" required maxLength={200} />
        </label>
        <label className={styles.campo}>
          <span>Sesión</span>
          <select name="sesion" required defaultValue="">
            <option value="" disabled>
              Elige la sesión acordada
            </option>
            {SESIONES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fecha}: {s.tema}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.campo}>
          <span>El problema, en dos o tres frases</span>
          <textarea name="problema" required rows={3} maxLength={400} />
        </label>
        <div className={styles.dosCampos}>
          <label className={styles.campo}>
            <span>A quién afecta</span>
            <input name="afectados" required maxLength={200} />
          </label>
          <label className={styles.campo}>
            <span>Región o ciudad</span>
            <input name="region" required maxLength={200} />
          </label>
        </div>
        <label className={styles.campo}>
          <span>Técnicas y métodos</span>
          <input name="tecnicas" required maxLength={300} placeholder="Análisis multicriterio, interpolación, clasificación supervisada…" />
        </label>
        <div className={styles.dosCampos}>
          <label className={styles.campo}>
            <span>Software</span>
            <input name="software" required maxLength={200} placeholder="QGIS, R, Python…" />
          </label>
          <label className={styles.campo}>
            <span>Fuentes de datos</span>
            <input name="datos" required maxLength={300} placeholder="INEGI, CONAGUA, Sentinel-2…" />
          </label>
        </div>
      </fieldset>

      <label className={styles.trampa} aria-hidden="true">
        Sitio web
        <input name="sitio_web" tabIndex={-1} autoComplete="off" />
      </label>

      <fieldset className={styles.grupo}>
        <legend className={styles.oculto}>Autorizaciones</legend>
        <label className={styles.opcion}>
          <input type="checkbox" name="autoriza_publicar" required />
          <span>
            Autorizo que la ponencia se grabe y que la grabación, las diapositivas y esta ficha
            se publiquen en el sitio del seminario.
          </span>
        </label>
        <label className={styles.opcion}>
          <input type="checkbox" name="interes_libro" />
          <span>Me interesa desarrollar la ponencia como capítulo del libro.</span>
        </label>
        <p className={styles.letraChica}>
          Tus datos se tratan conforme al{" "}
          <Link href="/sig-para-mexico/privacidad" target="_blank" className={styles.enlace}>
            aviso de privacidad
          </Link>
          .
        </p>
      </fieldset>

      {estado === "error" && (
        <p className={styles.error} role="alert">
          {mensaje}
        </p>
      )}

      <button type="submit" className={styles.botonGrande} disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar ponencia"}
      </button>
    </form>
  );
}
