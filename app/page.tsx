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
            <a href="#proyectos" className="hover:text-[#2DD4BF] transition-colors">Proyectos & Reseñas</a>
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
            Perfil en Upwork ↗
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Hero Section */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#1C3524]/60 border border-[#2DD4BF]/30 text-[#2DD4BF]">
            <span className="h-2 w-2 rounded-full bg-[#2DD4BF] animate-pulse"></span>
            Full-Stack Web GIS • Spatial Data Science • Environmental Economics
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F5F0] max-w-4xl leading-tight">
            Ingeniería de datos espaciales, modelos biofísicos y plataformas Web GIS.
          </h1>
          <p className="text-lg sm:text-xl text-[#C8DDD0] max-w-3xl leading-relaxed">
            Ingeniero Civil y Ambiental, M.Sc. en Economía Ambiental e <span className="text-[#2DD4BF] font-semibold">investigador científico publicado</span>. Arquitecto de plataformas geoespaciales empresariales, modelos de nicho ecológico y visores interactivos en la nube.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#proyectos"
              className="px-5 py-3 rounded bg-[#2DD4BF] text-[#0B130E] font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Explorar Proyectos & Reseñas
            </a>
            <a
              href="mailto:lopezolverasergio@gmail.com"
              className="px-5 py-3 rounded border border-[#1C3524] bg-[#1C3524]/40 text-[#F2F5F0] text-sm font-medium hover:border-[#2DD4BF]/60 transition-colors"
            >
              Contactar Directamente
            </a>
          </div>
        </section>

        {/* Featured Projects with Client Reviews */}
        <section id="proyectos" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Plataformas, Proyectos & Reseñas</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Sistemas en producción y testimonios de clientes internacionales</p>
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
                <Link
                  href="/proyectos/rff"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline flex items-center gap-1"
                >
                  Ver caso de estudio y arquitectura técnica →
                </Link>
              </div>
            </div>

            {/* INCYT Case Studies */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Producción Live</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">Australia / AgTech IoT</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">INCYT by LX Group — Customer Case Studies Map</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Visor Web GIS interactivo desplegado en producción con Mapbox GL JS, integrando tarjetas geolocalizadas, paneles modales dinámicos y filtrado reactivo de infraestructura agrícola inteligente.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Mapbox GL JS", "JavaScript ES6+", "GeoJSON", "AgTech", "UI/UX"].map((t) => (
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
                  className="text-xs font-mono text-[#2DD4BF] hover:underline flex items-center gap-1"
                >
                  Visitar sitio web en vivo (incyt.com.au) ↗
                </a>
              </div>
            </div>

            {/* Deep-Sea Coral Species Distribution Modeling */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Modelado de Nicho Ecológico</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">AUC ~0.98</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">GIS & Species Distribution Modeling for MPA Analysis</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Modelado ambiental (MaxEnt) para octocorales de aguas profundas en el Pacífico norteamericano. Integración de predictores batimétricos y capas ambientales para delimitación de Áreas Marinas Protegidas.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["MaxEnt", "R", "QGIS", "Batimetría", "Oceanografía"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Client Review Box */}
                <div className="mt-4 p-3 rounded-lg bg-[#14281B]/80 border border-[#1C3524] space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <span>★★★★★</span>
                    <span className="text-[#C8DDD0] ml-2 font-sans font-medium">5.0 / 5.0 (Upwork)</span>
                  </div>
                  <p className="text-xs text-[#C8DDD0] italic leading-relaxed">
                    &ldquo;Sergio was an absolute pleasure to work with. He worked hard to ensure the best possible outcome and took the time to clearly explain every step of the process. His professionalism, communication, and commitment to quality were outstanding.&rdquo;
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Mar 2025 – Abr 2025 • Endosado por calidad y comunicación</span>
              </div>
            </div>

            {/* London NO2 Sentinel-5P */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Teledetección & Epidemiología Espacial</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">Sentinel-5P</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">Assessing London NO₂ Pollution & Vulnerability Analysis</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Diseño de metodología y modelado estadístico para tesis de maestría evaluando exposición a NO₂ a nivel de distrito (borough) en Londres mediante imágenes Sentinel-5P y datos sociodemográficos y clínicos.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Sentinel-5P", "R", "Python", "Spatial Vulnerability", "Salud Pública"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Client Review Box */}
                <div className="mt-4 p-3 rounded-lg bg-[#14281B]/80 border border-[#1C3524] space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <span>★★★★★</span>
                    <span className="text-[#C8DDD0] ml-2 font-sans font-medium">5.0 / 5.0 (Upwork)</span>
                  </div>
                  <p className="text-xs text-[#C8DDD0] italic leading-relaxed">
                    &ldquo;It has been an absolute delight to work with Sergio... Sergio is very knowledgeable, quite hardworking and a wonderful person to work with. He understood the project requirements from starting and delivered the agreed milestones within timeframe (despite aggressive deadlines).&rdquo;
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Dic 2025 – Ene 2026 • Endosado: Reliable, Detail Oriented</span>
              </div>
            </div>

            {/* Real Estate Heat Mapping Detroit */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Inteligencia Inmobiliaria</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">Detroit MLS</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">Heat Map Creation Using MLS Sales Data</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Procesamiento y análisis de densidad espacial de transacciones inmobiliarias MLS para construir mapas de calor de precios y demanda en el área metropolitana de Detroit.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["MLS Real Estate", "Heat Mapping", "Spatial Density", "QGIS"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#14281B]/80 border border-[#1C3524] space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <span>★★★★★</span>
                    <span className="text-[#C8DDD0] ml-2 font-sans font-medium">5.0 / 5.0 (Upwork)</span>
                  </div>
                  <p className="text-xs text-[#C8DDD0] italic leading-relaxed">
                    &ldquo;Amazing did exactly what I asked and also guided me to the right direction when I wasn’t certain.&rdquo;
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Ene 2025 – Feb 2025 • Análisis geoespacial aplicado a inversiones</span>
              </div>
            </div>

            {/* Water & Energy Policy Series */}
            <div className="rounded-xl border border-[#1C3524] bg-[#0E1B13] p-6 space-y-4 hover:border-[#2DD4BF]/50 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#2DD4BF] uppercase tracking-wider">Políticas Públicas & Energía</span>
                  <span className="text-xs text-[#7AAF8E] font-mono">White Papers</span>
                </div>
                <h3 className="text-xl font-bold text-[#F2F5F0]">Water Policy Series & Fracking Regulatory Analysis</h3>
                <p className="text-sm text-[#C8DDD0] leading-relaxed">
                  Investigación técnica y redacción de artículos especializados y white papers sobre gobernanza del agua, innovación tecnológica y riesgos del fracturamiento hidráulico en México para Juan Pablo Rivero.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Economía del Agua", "Fracking", "White Papers", "Gobernanza"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C3524] text-[#C8DDD0]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#14281B]/80 border border-[#1C3524] space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                    <span>★★★★★</span>
                    <span className="text-[#C8DDD0] ml-2 font-sans font-medium">5.0 / 5.0 (Upwork)</span>
                  </div>
                  <p className="text-xs text-[#C8DDD0] italic leading-relaxed">
                    &ldquo;It was great working with Sergio! I would definitely hire him again for future projects.&rdquo;
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1C3524]/60">
                <span className="text-xs font-mono text-[#7AAF8E]">Abr 2025 – Ago 2025 • Series especializadas de política ambiental</span>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience (Enterprise + Research) */}
        <section id="experiencia" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Experiencia Profesional & Científica</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Trayectoria en soporte L2 empresarial, investigación aplicada y consultoría</p>
          </div>

          <div className="space-y-6">
            {/* Enterprise GIS L2 */}
            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">MISTRAS Group (New Century Software)</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Feb 2026 – Presente</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Software Support Analyst II – Enterprise GIS & Asset Integrity</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Soporte técnico de nivel 2 para operadores Oil & Gas tier-one sobre software especializado integrado con la plataforma Esri.</li>
                <li>Administración de entornos ArcGIS Enterprise, ArcGIS Online y geodatabases corporativas ArcSDE alojadas en Microsoft Azure.</li>
                <li>Ejecución de consultas SQL avanzadas, mantenimiento y reparación de redes geométricas y optimización de rendimiento de bases de datos espaciales.</li>
                <li>Análisis de causa raíz en modelos de riesgo de ductos, generación de alignment sheets e integración con equipos de ingeniería.</li>
              </ul>
            </div>

            {/* Researcher: Estrategia Nacional RSU */}
            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">Estrategia Nacional RSU (Investigación Transdisciplinaria)</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Oct 2022 – Dic 2024</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Asociado de Investigación & Ciencia de Datos Espaciales</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Procesamiento estadístico en R y análisis espacial de caracterización de residuos sólidos urbanos en municipios mexicanos.</li>
                <li>Coordinación de talleres técnicos participativos con 76 municipios para el fortalecimiento del cumplimiento regulatorio y normativo.</li>
                <li>Coautoría de 4 artículos científicos arbitrados y 3 capítulos de libro sobre economía ambiental, marcos tarifarios e instrumentos de política pública.</li>
              </ul>
            </div>

            {/* Researcher: Observatorio del Agua */}
            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">Observatorio del Agua para el Estado de Veracruz (UV / CIESAS)</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Sep 2020 – Presente</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Investigador en Modelado Hidrológico & Análisis Geoespacial</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Modelado de disponibilidad hídrica, balances de caudales y vulnerabilidad climática en microcuencas prioritarias mediante R y QGIS.</li>
                <li>Diseño de tableros interactivos (Tableau/QGIS) para traducir datos espacio-temporales complejos a funcionarios y comunidades.</li>
                <li>Elaboración de líneas base de conservación y métricas para asignación sustentable de aguas subterráneas y superficiales.</li>
              </ul>
            </div>

            {/* Consulting Practice */}
            <div className="p-6 rounded-xl border border-[#1C3524] bg-[#0E1B13]/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg font-bold text-[#F2F5F0]">Consultoría Independiente & Upwork</h3>
                <span className="text-xs font-mono text-[#2DD4BF]">Ago 2022 – Presente</span>
              </div>
              <p className="text-sm text-[#7AAF8E] font-mono">Senior Web GIS Developer & Spatial Solutions Consultant</p>
              <ul className="list-disc list-inside text-sm text-[#C8DDD0] space-y-1 pt-2">
                <li>Arquitectura de aplicaciones Web GIS completas integrando PostgreSQL/PostGIS, Supabase, Mapbox GL JS y APIs REST.</li>
                <li>Implementación de flujos de trabajo automatizados con Python, ETLs espaciales y modelos de IA aplicada para diagnóstico territorial.</li>
                <li>Asesoría a organismos internacionales (Canadá, EE.UU., México) en planificación territorial e infraestructura ambiental.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Complete Scientific Publications Catalog */}
        <section id="investigacion" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Publicaciones Científicas Arbitradas</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Artículos de investigación en revistas internacionales indexadas (Elsevier / Scopus / Latindex)</p>
          </div>

          <div className="space-y-4">
            {/* 1. Waste Management Bulletin */}
            <div className="p-5 rounded-xl border border-[#1C3524] bg-[#0E1B13]/40 space-y-2 hover:border-[#2DD4BF]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#2DD4BF] bg-[#1C3524] px-2.5 py-0.5 rounded">Primer Autor • Elsevier</span>
                <span className="text-xs font-mono text-[#7AAF8E]">Waste Management Bulletin, 3(1), 243–254 (2025)</span>
              </div>
              <h3 className="text-base font-bold text-[#F2F5F0]">
                Towards fiscal sustainable practices in Mexico: The quality of municipal tax regulation and tiered tariffs improve income from solid waste management services
              </h3>
              <p className="text-xs font-mono text-[#C8DDD0]">
                López-Olvera, S., Olivo-Escudero, J. C., Hernández-Marroquín, M., López-Olvera, F. R., Vallejo-Rivera, Y. L., Rodríguez-Gómez, M. A., & Rodríguez-Herrero, P. H.
              </p>
              <div className="pt-1">
                <a
                  href="https://doi.org/10.1016/j.wmb.2025.01.009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline"
                >
                  DOI: 10.1016/j.wmb.2025.01.009 ↗
                </a>
              </div>
            </div>

            {/* 2. Food Bioscience */}
            <div className="p-5 rounded-xl border border-[#1C3524] bg-[#0E1B13]/40 space-y-2 hover:border-[#2DD4BF]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#2DD4BF] bg-[#1C3524] px-2.5 py-0.5 rounded">Coautor • Elsevier</span>
                <span className="text-xs font-mono text-[#7AAF8E]">Food Bioscience, 83, 109567 (2026)</span>
              </div>
              <h3 className="text-base font-bold text-[#F2F5F0]">
                Modelling the resistance of Fructobacillus spp. to technological stress conditions
              </h3>
              <p className="text-xs font-mono text-[#C8DDD0]">
                Andrade-Velásquez, A., Martínez-Mota, R., Hernández-Sánchez, H., López-Olvera, S., Hernández-Rodríguez, D., & Melgar-Lalanne, G.
              </p>
              <div className="pt-1">
                <a
                  href="https://doi.org/10.1016/j.fbio.2026.109567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline"
                >
                  DOI: 10.1016/j.fbio.2026.109567 ↗
                </a>
              </div>
            </div>

            {/* 3. Revista Mexicana de Análisis Político */}
            <div className="p-5 rounded-xl border border-[#1C3524] bg-[#0E1B13]/40 space-y-2 hover:border-[#2DD4BF]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#2DD4BF] bg-[#1C3524] px-2.5 py-0.5 rounded">Coautor • Administración Pública</span>
                <span className="text-xs font-mono text-[#7AAF8E]">Revista Mexicana de Análisis Político, 14(27) (2025)</span>
              </div>
              <h3 className="text-base font-bold text-[#F2F5F0]">
                Evaluación de las capacidades institucionales de las Entidades de Fiscalización Subnacionales en México en materia de residuos sólidos urbanos: un acercamiento horizontal
              </h3>
              <p className="text-xs font-mono text-[#C8DDD0]">
                Vallejo Rivera, Y. L., Olivo Escudero, J. C., López Olvera, S., & García-Barrios, J. R.
              </p>
            </div>

            {/* 4. UVserva - Hydrology */}
            <div className="p-5 rounded-xl border border-[#1C3524] bg-[#0E1B13]/40 space-y-2 hover:border-[#2DD4BF]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#2DD4BF] bg-[#1C3524] px-2.5 py-0.5 rounded">Primer Autor • Hidrología & Economía</span>
                <span className="text-xs font-mono text-[#7AAF8E]">UVserva, (17), 266–287 (2024)</span>
              </div>
              <h3 className="text-base font-bold text-[#F2F5F0]">
                Disponibilidad del agua: caudales, percepción y opinión en la microcuenca del río Pixquiac, Veracruz, México
              </h3>
              <p className="text-xs font-mono text-[#C8DDD0]">
                López-Olvera, S., Menchaca-Dávila, S., & Romero-López, R.
              </p>
              <div className="pt-1">
                <a
                  href="https://doi.org/10.25009/uvs.vi17.3025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline"
                >
                  DOI: 10.25009/uvs.vi17.3025 ↗
                </a>
              </div>
            </div>

            {/* 5. UVserva - Solid Waste Higher Education */}
            <div className="p-5 rounded-xl border border-[#1C3524] bg-[#0E1B13]/40 space-y-2 hover:border-[#2DD4BF]/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#2DD4BF] bg-[#1C3524] px-2.5 py-0.5 rounded">Coautor • Educación Superior</span>
                <span className="text-xs font-mono text-[#7AAF8E]">UVserva, (18), 244–258 (2024)</span>
              </div>
              <h3 className="text-base font-bold text-[#F2F5F0]">
                La gestión de residuos sólidos urbanos en los programas educativos de educación superior en México
              </h3>
              <p className="text-xs font-mono text-[#C8DDD0]">
                Olivo, J., López, S., Vallejo, Y., Rodríguez, A., & García-Barrios, R.
              </p>
              <div className="pt-1">
                <a
                  href="https://doi.org/10.25009/uvs.vi18.3011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#2DD4BF] hover:underline"
                >
                  DOI: 10.25009/uvs.vi18.3011 ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section id="stack" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Stack Técnico</h2>
            <p className="text-sm text-[#7AAF8E] font-mono mt-1">Herramientas, plataformas y metodologías de ingeniería</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Enterprise GIS & Utilities</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">
                ArcGIS Enterprise (Portal, Server, Data Store), ArcGIS Pro, ArcSDE geodatabases, QGIS, modelos PODS/APDM, Utility Networks.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Data Science & Code</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">
                Python (GeoPandas, Rasterio, ArcPy, Shapely), R (modelado estadístico avanzado), SQL (PostgreSQL/PostGIS, SQL Server).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Web GIS & Cloud</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">
                Mapbox GL JS, Next.js, Tailwind CSS, Supabase (Postgres 17, Storage), Microsoft Azure, Vercel, Resend, Stripe.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-2">
              <h4 className="text-sm font-bold text-[#2DD4BF] font-mono">Teledetección & 3D</h4>
              <p className="text-xs text-[#C8DDD0] leading-relaxed">
                Google Earth Engine, Sentinel-2, Sentinel-5P, DEM SRTM, Blender, BlenderGIS (mallas 3D OBJ con texturizado satelital).
              </p>
            </div>
          </div>
        </section>

        {/* Academic Credentials */}
        <section className="space-y-6">
          <div className="border-b border-[#1C3524] pb-4">
            <h2 className="text-2xl font-bold text-[#F2F5F0]">Formación Académica & Credenciales</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono text-[#C8DDD0]">
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-[#2DD4BF] block font-bold">Mtro. en Economía Ambiental y Ecológica</span>
              <p className="text-[#F2F5F0]">Universidad Veracruzana (2020 – 2022)</p>
              <p className="text-[#7AAF8E]">Especialización en valoración hídrica y econometría</p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-[#2DD4BF] block font-bold">Ingeniero Civil (Titulado)</span>
              <p className="text-[#F2F5F0]">Univ. Técnica Superior de Xalapa (2013 – 2017)</p>
              <p className="text-[#7AAF8E]">Diseño hidráulico, estructural y licitaciones</p>
            </div>
            <div className="p-4 rounded-lg border border-[#1C3524] bg-[#0E1B13]/40 space-y-1">
              <span className="text-[#2DD4BF] block font-bold">Ingeniero Ambiental</span>
              <p className="text-[#F2F5F0]">Universidad Veracruzana (2014 – 2019)</p>
              <p className="text-[#7AAF8E]">Diagnóstico territorial, EIA y saneamiento</p>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <footer id="contacto" className="border-t border-[#1C3524] pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-[#F2F5F0]">Sergio López Olvera</h3>
            <p className="text-sm text-[#7AAF8E]">Coatepec, Veracruz, México • Consultoría & Proyectos Remotos</p>
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
              Upwork Profile
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}