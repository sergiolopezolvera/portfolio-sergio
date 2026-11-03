"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SESIONES } from "../config";
import { ESTADOS, enviar } from "../_componentes/enviar";
import styles from "../seminario.module.css";

const SECTORES = [
  "Gobierno municipal",
  "Gobierno estatal",
  "Gobierno federal",
  "Prestador de servicios (empresa, consultora o profesionista)",
  "Academia o investigación",
  "Organización de la sociedad civil",
  "Otro",
];

type Estado = "listo" | "enviando" | "hecho" | "error";

export default function FormularioRegistro() {
  const [estado, setEstado] = useState<Estado>("listo");
  const [mensaje, setMensaje] = useState("");
  const [correo, setCorreo] = useState("");

  async function alEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const sesiones = f.getAll("sesiones").map(String);
    if (sesiones.length === 0) {
      setEstado("error");
      setMensaje("Elige al menos una sesión.");
      return;
    }
    setEstado("enviando");
    const r = await enviar({
      tipo: "registro",
      nombre: f.get("nombre"),
      correo: f.get("correo"),
      sector: f.get("sector"),
      institucion: f.get("institucion"),
      cargo: f.get("cargo"),
      municipio: f.get("municipio"),
      estado: f.get("estado"),
      sesiones,
      como_se_entero: f.get("como_se_entero"),
      acepta_privacidad: f.get("acepta_privacidad") === "on",
      acepta_novedades: f.get("acepta_novedades") === "on",
      sitio_web: f.get("sitio_web"),
    });
    if (r.ok) {
      setCorreo(String(f.get("correo")));
      setEstado("hecho");
    } else {
      setEstado("error");
      setMensaje(r.error ?? "No pudimos guardar tu registro.");
    }
  }

  if (estado === "hecho") {
    return (
      <div className={styles.confirmacion} role="status">
        <h2 className={styles.h2}>Registro confirmado</h2>
        <p>
          Te enviamos un correo a <strong>{correo}</strong> con tus sesiones y el enlace de
          Teams. Si no lo ves en unos minutos, revisa la carpeta de correo no deseado.
        </p>
        <Link href="/sig-para-mexico" className={styles.enlace}>
          Volver al programa
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.formulario} onSubmit={alEnviar} noValidate={false}>
      <fieldset className={styles.grupo}>
        <legend>Tus datos</legend>
        <label className={styles.campo}>
          <span>Nombre completo</span>
          <input name="nombre" required autoComplete="name" maxLength={150} />
          <small>Así aparecerá en tu constancia, con acentos y mayúsculas.</small>
        </label>
        <label className={styles.campo}>
          <span>Correo electrónico</span>
          <input name="correo" type="email" required autoComplete="email" maxLength={150} />
          <small>Usa el mismo correo al entrar a Teams para registrar tu asistencia.</small>
        </label>
      </fieldset>

      <fieldset className={styles.grupo}>
        <legend>Dónde trabajas</legend>
        <label className={styles.campo}>
          <span>Sector</span>
          <select name="sector" required defaultValue="">
            <option value="" disabled>
              Elige una opción
            </option>
            {SECTORES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className={styles.campo}>
          <span>Institución, dependencia o empresa</span>
          <input name="institucion" required autoComplete="organization" maxLength={200} />
        </label>
        <label className={styles.campo}>
          <span>Cargo</span>
          <input name="cargo" required autoComplete="organization-title" maxLength={150} />
        </label>
        <div className={styles.dosCampos}>
          <label className={styles.campo}>
            <span>Municipio</span>
            <input name="municipio" required maxLength={120} />
          </label>
          <label className={styles.campo}>
            <span>Estado</span>
            <select name="estado" required defaultValue="">
              <option value="" disabled>
                Elige un estado
              </option>
              {ESTADOS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.grupo}>
        <legend>Sesiones a las que asistirás</legend>
        {SESIONES.map((s) => (
          <label key={s.id} className={styles.opcion}>
            <input type="checkbox" name="sesiones" value={s.id} defaultChecked />
            <span>
              {s.fecha}: {s.tema}
            </span>
          </label>
        ))}
      </fieldset>

      <label className={styles.campo}>
        <span>¿Cómo te enteraste del seminario? (opcional)</span>
        <input name="como_se_entero" maxLength={200} />
      </label>

      {/* Campo trampa: oculto para personas, los bots lo llenan */}
      <label className={styles.trampa} aria-hidden="true">
        Sitio web
        <input name="sitio_web" tabIndex={-1} autoComplete="off" />
      </label>

      <fieldset className={styles.grupo}>
        <legend className={styles.oculto}>Consentimiento</legend>
        <label className={styles.opcion}>
          <input type="checkbox" name="acepta_privacidad" required />
          <span>
            Leí y acepto el{" "}
            <Link href="/sig-para-mexico/privacidad" target="_blank" className={styles.enlace}>
              aviso de privacidad
            </Link>
            .
          </span>
        </label>
        <label className={styles.opcion}>
          <input type="checkbox" name="acepta_novedades" />
          <span>Quiero recibir información de futuros seminarios, cursos y servicios de SIG.</span>
        </label>
      </fieldset>

      {estado === "error" && (
        <p className={styles.error} role="alert">
          {mensaje}
        </p>
      )}

      <button type="submit" className={styles.botonGrande} disabled={estado === "enviando"}>
        {estado === "enviando" ? "Registrando…" : "Registrarme"}
      </button>
    </form>
  );
}
