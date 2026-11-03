import type { NextConfig } from "next";

// Libro y seminario "SIG para México": vive en su propio proyecto de Vercel
// (repo sergiolopezolvera/sig-para-mexico) y se sirve aquí bajo /sig-para-mexico/.
const SIG_PARA_MEXICO = "https://sig-para-mexico.vercel.app";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Quarto usa rutas relativas: la portada debe abrirse como archivo
        // para que estilos e imágenes resuelvan dentro de /sig-para-mexico/.
        source: "/sig-para-mexico",
        destination: "/sig-para-mexico/index.html",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sig-para-mexico/:path+",
        destination: `${SIG_PARA_MEXICO}/sig-para-mexico/:path+`,
      },
    ];
  },
};

export default nextConfig;
