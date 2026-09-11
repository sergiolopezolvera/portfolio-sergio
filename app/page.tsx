import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B130E] text-[#F2F5F0] font-sans antialiased selection:bg-[#2DD4BF] selection:text-[#0B130E]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B130E]/80 border-b border-[#1C3524] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono text-sm tracking-widest text-[#2DD4BF] uppercase font-semibold">
            Sergio López Olvera
          </span>
          <nav className="hidden md:flex gap-6 text-sm text-[#C8DDD0]">
            <a href="#proyectos" className="hover:text-[#2DD4BF] transition-colors">Proyectos</a>
            <a href="#experiencia" className="hover:text-[#2DD4BF] transition-colors">Experiencia</a>
            <a href="#investigacion" className="hover:text-[#2DD4BF] transition-colors">Publicaciones</a>
            <a href="#stack" className="hover:text-[#2DD4BF] transition-colors">Stack</a>
            <a href="#contacto" className="hover:text-[#2DD4BF] transition-colors">Contacto</a>
          </nav>
          <a
            href="https://www.upwork.com/freelancers/~01f7388af10990cf51?mp_source=share"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono bg-[#1C3524] hover:bg-[#2DD4BF] hover:text-[#0B130E] text-[#F2F5F0] px-3 py-1.5 rounded border border-[#2DD4BF]/40 transition-all"
          >
            Upwork Profile ↗
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#1C3524]/60 border border-[#2DD4BF]/30 text-[#2DD4BF]">
            <span className="h-2 w-2 rounded-full bg-[#2DD4BF] animate-pulse"></span>
            Full-Stack Web GIS & Spatial Data Science
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F5F0] max-w-3xl leading-tight">
            Ingeniería de datos espaciales y plataformas Web GIS en producción.
          </h1>
          <p className="text-lg sm:text-xl text-[#C8DDD0] max-w-2xl leading-relaxed">
            Ingeniero Civil y Ambiental con M.Sc. en Economía Ambiental. Arquitecto de plataformas geoespaciales empresariales, modelos biofísicos y visores interactivos en la nube.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#proyectos"
              className="px-5 py-3 rounded bg-[#2DD4BF] text-[#0B130E] font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Explorar Proyectos
            </a>
            <a
              href="mailto:lopezolverasergio@gmail.com"
              className="px-5 py-3 rounded border border-[#1C3524] bg-[#1C3524]/40 text-[#F2F5F0] text-sm font-medium hover:border-[#2DD4BF]/60 transition-colors"
            >
              Contactar Directamente
            </a>
          </div>
        </section>

        {/* Featured Projects (Live Demos & Systems) */}
        <section id="proyectos" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Plataformas & Visores Destacados</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Sistemas Web GIS y aplicaciones espaciales activas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Redwood Forest Foundation */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Web GIS & Terreno 3D</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">50,830+ Acres</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">Redwood Forest Foundation — Standley Creek Platform</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Delineación hidrológica de microcuencas (SRTM), pipeline automatizado de más de 50,000 imágenes satelitales (TUS/Storage), malla 3D en BlenderGIS y frontend en Webflow con pasarela de patrocinio (Stripe/Resend).
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Supabase", "Mapbox", "Python ETL", "Blender 3D", "Webflow", "Vercel"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Subsitio técnico integrado</span>
              </div>
            </div>

            {/* INCYT Case Studies */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Producción Live</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">Australia / IoT</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">INCYT — Customer Case Studies Map</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Visor Web GIS interactivo desplegado en producción con Mapbox GL JS, integrando tarjetas geolocalizadas, paneles modales dinámicos y filtrado reactivo de infraestructura agrícola inteligente.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Mapbox GL JS", "JavaScript ES6+", "GeoJSON", "UI/UX"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <a
                  href="https://www.incyt.com.au/customers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline"
                >
                  Visitar sitio web en vivo ↗
                </a>
              </div>
            </div>

            {/* Deep-Sea Coral Species Distribution */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Modelado Biofísico</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">AUC ~0.98</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">Species Distribution Modeling for MPA Analysis</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Modelo de nicho ambiental (MaxEnt) para octocorales de aguas profundas en el Pacífico norteamericano. Integración de predictores batimétricos y capas ambientales para delimitación de Áreas Marinas Protegidas.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["MaxEnt", "R", "QGIS", "Batimetría", "Oceanografía"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Upwork Enterprise Client ★ 5.0</span>
              </div>
            </div>

            {/* London NO2 Sentinel-5P */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Teledetección & Salud</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">Sentinel-5P</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">London NO₂ Pollution & Vulnerability Analysis</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Metodología y modelado estadístico para tesis de posgrado evaluando exposición a dióxido de nitrógeno en distritos de Londres, correlacionando datos sociodemográficos, clínicos y climáticos.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Sentinel-5P", "R", "Python", "Spatial Epidemiology"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Upwork Research Deliverable ★ 5.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section id="experiencia" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Experiencia Profesional</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Trayectoria empresarial, soporte L2 y consultoría</p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">MISTRAS Group (New Century Software)</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Feb 2026 – Presente</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Software Support Analyst II – Enterprise GIS & Asset Integrity</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Soporte técnico de nivel 2 para operadores Oil & Gas sobre software integrado con Esri.</li>
                <li>Administración de ArcGIS Enterprise, ArcGIS Online y geodatabases corporativas ArcSDE en Azure.</li>
                <li>Consultas SQL avanzadas, mantenimiento de redes geométricas y validación de bases de datos críticas.</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">Consultoría Independiente & Upwork</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Ago 2022 – Presente</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Senior Web GIS Developer & Spatial Data Scientist</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Desarrollo de visores Web GIS full-stack con Mapbox GL JS, Supabase, PostgreSQL/PostGIS y Vercel.</li>
                <li>Procesamiento de datos satelitales, modelado de nicho ecológico y generación de cartografía temática.</li>
                <li>Redacción de informes ejecutivos, white papers en economía del agua y políticas de residuos.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Publications */}
        <section id="investigacion" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Publicaciones Científicas</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Artículos arbitrados en revistas indexadas (Elsevier / Scopus)</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-xs font-mono text-[#2DD4BF]">Waste Management Bulletin (Elsevier) • 2025</span>
              <p className="text-sm text-[#F2F5F0] font-medium">
                Towards fiscal sustainable practices in Mexico: The quality of municipal tax regulation and tiered tariffs improve income from solid waste management services.
              </p>
              <span className="text-xs font-mono text-[#7AAF8E]">DOI: 10.1016/j.wmb.2025.01.009</span>
            </div>

            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-xs font-mono text-[#2DD4BF]">UVserva (Universidad Veracruzana) • 2024</span>
              <p className="text-sm text-[#F2F5F0] font-medium">
                Disponibilidad del agua: caudales, percepción y opinión en la microcuenca del río Pixquiac, Veracruz, México.
              </p>
              <span className="text-xs font-mono text-[#7AAF8E]">DOI: 10.25009/uvs.vi17.3025</span>
            </div>

            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-xs font-mono text-[#2DD4BF]">Food Bioscience (Elsevier) • 2026</span>
              <p className="text-sm text-[#F2F5F0] font-medium">
                Modelling the resistance of Fructobacillus spp. to technological stress conditions.
              </p>
              <span className="text-xs font-mono text-[#7AAF8E]">DOI: 10.1016/j.fbio.2026.109567</span>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section id="stack" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Stack Técnico</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Herramientas, plataformas y lenguajes en producción</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">GIS & Pipeline</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">ArcGIS Enterprise, ArcSDE, ArcGIS Pro, QGIS, GEE, PODS/APDM.</p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Data & Scripting</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">Python (GeoPandas, Rasterio, ArcPy), R, SQL, PostgreSQL/PostGIS.</p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Web GIS & UI</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">Mapbox GL JS, Next.js, Tailwind CSS, JavaScript ES6+, Webflow.</p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Cloud & 3D</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">Supabase, Vercel, Microsoft Azure, Blender/BlenderGIS, Resend, Stripe.</p>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer id="contacto" className="border-t border-[#1C3524] pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#F2F5F0]">Sergio López Olvera</h3>
            <p className="text-sm text-[#7AAF8E]">Coatepec, Veracruz, México • Remoto Global</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-mono">
            <a href="mailto:lopezolverasergio@gmail.com" className="text-[#2DD4BF] hover:underline">
              lopezolverasergio@gmail.com
            </a>
            <span className="text-[#1C3524]">|</span>
            <a
              href="https://www.upwork.com/freelancers/~01f7388af10990cf51?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8DDD0] hover:text-[#2DD4BF]"
            >
              Upwork
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}