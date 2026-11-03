import { FORMULARIOS_URL } from "../config";

export type Respuesta = { ok: boolean; error?: string; actualizado?: boolean };

// Apps Script acepta POST con text/plain sin preflight de CORS y responde JSON.
export async function enviar(datos: Record<string, unknown>): Promise<Respuesta> {
  if (!FORMULARIOS_URL) {
    return {
      ok: false,
      error: "El formulario todavía no está conectado. Escríbenos por correo mientras tanto.",
    };
  }
  try {
    const r = await fetch(FORMULARIOS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(datos),
    });
    return (await r.json()) as Respuesta;
  } catch {
    return {
      ok: false,
      error: "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.",
    };
  }
}

export const ESTADOS = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
  "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
  "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas", "Fuera de México",
];
