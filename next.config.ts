import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio estático de RFF (migrado de Webflow) en public/rff/.
  // URLs limpias: /rff -> /rff/index.html, /rff/acres-map -> /rff/acres-map.html
  rewrites() {
    return [
      { source: "/rff", destination: "/rff/index.html" },
      { source: "/rff/:page", destination: "/rff/:page.html" },
    ];
  },
};

export default nextConfig;
