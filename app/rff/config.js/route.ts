// Sirve la configuración pública del sitio RFF (public/rff) desde variables de entorno,
// para no guardar el token de Mapbox en el repositorio.
export async function GET() {
  const config = { mapboxToken: process.env.RFF_MAPBOX_TOKEN ?? "" };
  return new Response(`window.RFF_CONFIG = ${JSON.stringify(config)};\n`, {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
