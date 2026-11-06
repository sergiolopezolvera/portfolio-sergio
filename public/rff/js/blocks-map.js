/* ========== BOOTSTRAP: load model-viewer web component ========== */
function ensureModelViewer() {
  const id = 'model-viewer-script';
  if (document.getElementById(id) || customElements.get('model-viewer')) return;
  const s = document.createElement('script');
  s.id = id;
  s.type = 'module';
  s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
  document.head.appendChild(s);
}

/* ========== BOOTSTRAP: load Mapbox GL (CSS/JS) ========== */
async function ensureMapbox(version = 'v2.15.0') {
  const norm = version.replace(/\W/g, '_');
  const cssId = `mbx_css_${norm}`;
  const jsId  = `mbx_js_${norm}`;

  if (!document.getElementById(cssId)) {
    const link = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.href = `https://api.mapbox.com/mapbox-gl-js/${version}/mapbox-gl.css`;
    document.head.appendChild(link);
  }

  if (!window.mapboxgl && !document.getElementById(jsId)) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.id      = jsId;
      s.src     = `https://api.mapbox.com/mapbox-gl-js/${version}/mapbox-gl.js`;
      s.onload  = resolve;
      s.onerror = () => reject(new Error('Failed to load Mapbox GL'));
      document.head.appendChild(s);
    });
  }
}

/* ========== BOOTSTRAP: base DOM + CSS ========== */
function ensureBaseDom() {
  const wrapper = document.getElementById('map-wrapper');
  if (!wrapper) throw new Error('Missing #map-wrapper element in the page.');

  const wrapperStyle = window.getComputedStyle(wrapper);
  if (wrapperStyle.position === 'static') wrapper.style.position = 'relative';
  if (!wrapper.style.height && wrapper.offsetHeight === 0) wrapper.style.height = '100vh';

  let map = document.getElementById('map');
  if (!map) {
    map = document.createElement('div');
    map.id = 'map';
    map.style.cssText = `
      width: 100%;
      height: 100%;
      min-height: 500px;
      position: relative;
      border-radius: 20px;
      border: 0.5px solid #1e301d;
      overflow: hidden;
    `;
    wrapper.appendChild(map);
  }

  if (!document.getElementById('explore-panel')) {
    const panel = document.createElement('aside');
    panel.id = 'explore-panel';
    panel.setAttribute('aria-label', 'Explore Standley Creek');
    panel.innerHTML = `
      <div class="explore-panel-inner">
        <div class="explore-panel-header">
          <p class="explore-kicker">Sponsor a Microwatershed</p>
          <h2>Explore Standley Creek</h2>
          <p class="explore-intro">
            Click on a microwatershed to explore its conservation data.
          </p>
        </div>

        <div class="explore-legend-grid">
          <div class="explore-legend-col">
            <h3>Map layers</h3>
            <div class="explore-static-row explore-static-row-sm">
              <span class="legend-swatch legend-swatch-watersheds"></span>
              <span>Microwatersheds</span>
            </div>
          </div>
          <div class="explore-legend-col">
            <h3>Projects</h3>
            <a href="#" class="explore-static-row explore-static-row-sm explore-legend-link">
              <span class="legend-line legend-line-research"></span>
              <span>Research Sites</span>
            </a>
            <a href="#" class="explore-static-row explore-static-row-sm explore-legend-link">
              <span class="legend-line legend-line-stream"></span>
              <span>Stream Restoration</span>
            </a>
            <a href="#" class="explore-static-row explore-static-row-sm explore-legend-link">
              <span class="legend-line legend-line-road"></span>
              <span>Road Decom. / Upgrade</span>
            </a>
            <a href="#" class="explore-static-row explore-static-row-sm explore-legend-link">
              <span class="legend-line legend-line-gulch"></span>
              <span>Gulch 7</span>
            </a>
          </div>
        </div>

        <div id="watershed-detail" class="watershed-detail" aria-live="polite">
          <p class="watershed-detail-empty">
            Click on a microwatershed on the map to explore it.
          </p>
        </div>
      </div>
    `;
    wrapper.appendChild(panel);
  }

  if (!document.getElementById('explore-panel-css')) {
    const style = document.createElement('style');
    style.id = 'explore-panel-css';
    style.textContent = `
      #explore-panel {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 360px;
        max-width: calc(100% - 40px);
        max-height: calc(100% - 40px);
        overflow: hidden;
        z-index: 12;
        background: #A8341A;
        color: #FDFBF2;
        border: 1px solid rgba(253, 251, 242, 0.38);
        border-radius: 18px;
        box-shadow: 0 14px 34px rgba(0,0,0,0.18);
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      #explore-panel .explore-panel-inner {
        max-height: calc(100vh - 80px);
        overflow-y: auto;
        scroll-behavior: smooth;
        padding: 18px;
      }

      #explore-panel .explore-panel-header { margin-bottom: 16px; }

      #explore-panel .explore-kicker {
        margin: 0 0 4px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.11em;
        text-transform: uppercase;
        color: rgba(253, 251, 242, 0.78);
      }

      #explore-panel h2 {
        margin: 0 0 8px;
        font-size: 23px;
        line-height: 1.08;
        color: #FDFBF2;
      }

      #explore-panel .explore-intro {
        margin: 0;
        font-size: 13px;
        line-height: 1.45;
        color: rgba(253, 251, 242, 0.84);
      }

      #explore-panel .explore-section {
        border-top: 1px solid rgba(253, 251, 242, 0.24);
        padding-top: 14px;
        margin-top: 14px;
      }

      #explore-panel h3 {
        margin: 0 0 10px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(253, 251, 242, 0.78);
      }

      #explore-panel .explore-static-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 34px;
        padding: 4px 8px;
        font-size: 13px;
        line-height: 1.25;
        color: rgba(253, 251, 242, 0.92);
      }

      #explore-panel .legend-swatch {
        flex: 0 0 auto;
        display: inline-block;
        width: 12px;
        height: 12px;
      }

      #explore-panel .legend-swatch-watersheds {
        background: #6cb04a;
        border: 1.5px solid #ce4422;
        border-radius: 2px;
      }

      /* Two-column legend grid */
      #explore-panel .explore-legend-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 12px;
        border-top: 1px solid rgba(253,251,242,0.24);
        padding-top: 14px;
        margin-top: 14px;
      }
      #explore-panel .explore-legend-col h3 { margin-bottom: 6px; }

      /* Clickable legend links */
      #explore-panel .explore-legend-link {
        display: flex;
        text-decoration: none;
        color: inherit;
        border-radius: 6px;
        transition: background 0.15s;
      }
      #explore-panel .explore-legend-link:hover {
        background: rgba(253,251,242,0.12);
      }

      #explore-panel .explore-static-row-sm {
        min-height: 24px;
        padding: 2px 8px;
        font-size: 12px;
        opacity: 0.85;
      }

      #explore-panel .legend-line {
        flex: 0 0 auto;
        display: inline-block;
        width: 18px;
        height: 3px;
        border-radius: 2px;
      }
      #explore-panel .legend-line-research { background: #e05c3a; border-radius: 50%; width: 10px; height: 10px; }
      #explore-panel .legend-line-stream   { background: #5b8fd4; }
      #explore-panel .legend-line-road     { background: #8b7355; }
      #explore-panel .legend-line-gulch    { background: #6ab4f5; width: 10px; height: 10px; border-radius: 2px; }

      /* Card hero: stacked on desktop, side-by-side on mobile */
      #explore-panel .watershed-card-hero {
        display: flex;
        flex-direction: column;
      }
      #explore-panel .watershed-hero-model { flex: 0 0 auto; }
      #explore-panel .watershed-hero-area  { display: none; }

      #explore-panel .watershed-detail { margin-top: 16px; }

      #explore-panel .watershed-detail-empty {
        margin: 0;
        padding: 12px;
        border-radius: 12px;
        background: rgba(253, 251, 242, 0.12);
        color: rgba(253, 251, 242, 0.82);
        font-size: 13px;
        line-height: 1.4;
      }

      #explore-panel .watershed-collapse-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        padding: 7px 10px;
        margin-bottom: 10px;
        background: rgba(253, 251, 242, 0.1);
        border: 1px solid rgba(253, 251, 242, 0.2);
        border-radius: 10px;
        color: rgba(253, 251, 242, 0.72);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
        cursor: pointer;
        text-align: left;
        transition: background-color 140ms ease, color 140ms ease;
      }

      #explore-panel .watershed-collapse-btn:hover {
        background: rgba(253, 251, 242, 0.17);
        color: rgba(253, 251, 242, 0.95);
      }

      #explore-panel .watershed-collapse-btn svg { flex-shrink: 0; opacity: 0.7; }

      #explore-panel .watershed-card {
        overflow: hidden;
        border-radius: 14px;
        background: #FDFBF2;
        border: 1px solid rgba(253, 251, 242, 0.5);
      }

      #explore-panel .watershed-card-header {
        padding: 14px 14px 10px;
        border-bottom: 1px solid rgba(49, 94, 32, 0.1);
      }

      #explore-panel .watershed-kicker {
        display: block;
        margin-bottom: 3px;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(49, 94, 32, 0.5);
      }

      #explore-panel .watershed-name {
        margin: 0;
        font-size: 17px;
        line-height: 1.2;
        color: #315E20;
      }

      #explore-panel .watershed-stats { padding: 4px 0; }

      #explore-panel .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 14px;
        border-bottom: 1px solid rgba(49, 94, 32, 0.07);
      }

      #explore-panel .stat-row:last-child { border-bottom: none; }

      #explore-panel .stat-label { font-size: 12px; color: rgba(49, 94, 32, 0.62); }

      #explore-panel .stat-value {
        font-size: 13px;
        font-weight: 700;
        color: #315E20;
      }

      #explore-panel .stat-value.stat-absent {
        font-weight: 400;
        color: rgba(49, 94, 32, 0.38);
      }

      #explore-panel .stat-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: 99px;
        font-size: 11px;
        font-weight: 700;
      }

      #explore-panel .stat-badge.present {
        background: rgba(49, 94, 32, 0.12);
        color: #315E20;
      }

      #explore-panel .watershed-card-footer {
        padding: 12px 14px;
        border-top: 1px solid rgba(49, 94, 32, 0.1);
      }

      #explore-panel .ws-sponsor-btn {
        display: block;
        width: 100%;
        padding: 10px 16px;
        border: none;
        border-radius: 10px;
        background: #CD4422;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 160ms ease;
      }

      #explore-panel .ws-sponsor-btn:hover:not(:disabled) { opacity: 0.88; }

      #explore-panel .ws-sponsor-btn:disabled {
        background: transparent;
        color: #315E20;
        border: 2px solid #315E20;
        cursor: default;
        font-weight: 600;
      }

      @media (max-width: 767px) {
        /* ---- Bottom sheet ---- */
        #explore-panel {
          top: auto;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 100%;
          max-height: 58vh;
          border-radius: 18px 18px 0 0;
          border-bottom: none;
          box-shadow: 0 -6px 24px rgba(0,0,0,0.22);
        }

        /* Drag handle */
        #explore-panel .explore-panel-inner::before {
          content: '';
          display: block;
          width: 36px;
          height: 4px;
          background: rgba(253,251,242,0.35);
          border-radius: 2px;
          margin: 0 auto 12px;
        }

        #explore-panel .explore-panel-inner {
          max-height: 58vh;
          padding: 12px 16px 16px;
        }

        #explore-panel h2 { font-size: 18px; }
        #explore-panel .explore-intro { font-size: 12px; }

        /* Hide intro text when a watershed is selected (detail is visible) */
        #explore-panel:has(.watershed-card) .explore-panel-header { display: none; }

        /* Compact legend when watershed is selected */
        #explore-panel:has(.watershed-card) .explore-section { display: none; }
        #explore-panel:has(.watershed-card) .explore-legend-grid { display: none; }

        /* Smaller model on mobile */
        #explore-panel model-viewer {
          height: 150px !important;
        }

        /* Hero: model left, name+area right */
        #explore-panel .watershed-card-hero {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 0;
        }
        #explore-panel .watershed-hero-model {
          flex: 0 0 48%;
          max-width: 48%;
        }
        #explore-panel .watershed-hero-model model-viewer {
          height: 130px !important;
          border-radius: 10px 10px 0 0;
        }
        #explore-panel .watershed-card-header {
          flex: 1 1 0;
          padding: 12px 12px 12px 0;
        }
        #explore-panel .watershed-hero-area {
          display: block;
          margin-top: 6px;
          font-size: 15px;
          font-weight: 700;
          color: #315E20;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (!document.getElementById('popup-clear-css')) {
    const style = document.createElement('style');
    style.id = 'popup-clear-css';
    style.textContent = `
      .mapboxgl-popup.popup-clear .mapboxgl-popup-content {
        background: transparent !important;
        padding: 0 !important;
        box-shadow: none !important;
        border: none !important;
      }
      .mapboxgl-popup.popup-clear .mapboxgl-popup-tip { display: none !important; }
    `;
    document.head.appendChild(style);
  }
}

/* ========== BLOCK ADOPTION MODAL ========== */
function ensureBlockModal() {
  if (document.getElementById('bm-backdrop')) return;

  const style = document.createElement('style');
  style.id = 'bm-css';
  style.textContent = `
    #bm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 20px;
    }
    #bm-modal {
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow: auto;
      background: #FDFBF2;
      border-radius: 16px;
      border: 1px solid #D8CDB9;
      box-shadow: 0 12px 32px rgba(0,0,0,.18);
      font-family: Inter, sans-serif;
      color: #2f4725;
    }
    #bm-modal .bm-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px 10px;
      border-bottom: 1px solid #E6DDCB;
    }
    #bm-modal .bm-body { padding: 18px 20px 22px; }
    #bm-modal h2 { margin: 0; font-size: 20px; color: #315E20; }
    #bm-modal .bm-close {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #315E20;
    }
    #bm-modal .bm-subtitle {
      margin: 0 0 16px;
      font-size: 14px;
      color: #5b7750;
    }
    #bm-modal .bm-grid { display: grid; gap: 14px; }
    #bm-modal label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #315E20;
    }
    #bm-modal input[type="text"],
    #bm-modal input[type="email"] {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid #CFC3AD;
      background: #fff;
      font-size: 14px;
      color: #24351d;
    }
    #bm-modal .bm-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    #bm-modal .bm-check-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #bm-modal .bm-check-row label {
      margin: 0;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    #bm-modal .bm-note {
      font-size: 12px;
      color: #5b7750;
      margin-top: 4px;
    }
    #bm-modal .bm-error {
      display: none;
      background: #fff1ee;
      color: #a12d14;
      border: 1px solid #efb4a7;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 13px;
      margin-bottom: 14px;
    }
    #bm-modal .bm-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 18px;
    }
    #bm-modal .bm-btn {
      border: none;
      border-radius: 10px;
      padding: 10px 16px;
      font-size: 14px;
      cursor: pointer;
    }
    #bm-modal .bm-btn-primary { background: #CD4422; color: #fff; }
    #bm-modal .bm-btn-secondary {
      background: transparent;
      color: #315E20;
      border: 2px solid #315E20;
    }
    @media (max-width: 560px) {
      #bm-modal .bm-row-2 { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  const backdrop = document.createElement('div');
  backdrop.id = 'bm-backdrop';
  backdrop.innerHTML = `
    <div id="bm-modal" role="dialog" aria-modal="true" aria-labelledby="bm-title">
      <div class="bm-header">
        <h2 id="bm-title">Sponsor this microwatershed</h2>
        <button type="button" class="bm-close" id="bm-close-btn">&times;</button>
      </div>
      <div class="bm-body">
        <p class="bm-subtitle" id="bm-subtitle"></p>

        <div class="bm-error" id="bm-error"></div>

        <div class="bm-grid">
          <div class="bm-row-2">
            <div>
              <label for="bm-donor-name">Your name</label>
              <input id="bm-donor-name" type="text" maxlength="120" />
            </div>
            <div>
              <label for="bm-donor-email">Your email</label>
              <input id="bm-donor-email" type="email" maxlength="190" />
            </div>
          </div>

          <div class="bm-check-row">
            <label>
              <input id="bm-hide-name" type="checkbox">
              Keep my name private in public recognition
            </label>
          </div>

          <div>
            <label for="bm-sponsor-logo">Sponsor logo (optional)</label>
            <input id="bm-sponsor-logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" />
            <div class="bm-note">JPG, PNG, WEBP or SVG. Max 5 MB. Will be reviewed before publishing.</div>
          </div>
        </div>

        <div class="bm-actions">
          <button type="button" class="bm-btn bm-btn-secondary" id="bm-cancel-btn">Cancel</button>
          <button type="button" class="bm-btn bm-btn-primary" id="bm-submit-btn">Continue to payment</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);
}

/* ========== MAIN ========== */
(async () => {
  try {
    await ensureMapbox();
    ensureModelViewer();
    ensureBaseDom();

    mapboxgl.accessToken = window.RFF_CONFIG?.mapboxToken || '';

    const MAP_STYLE = 'mapbox://styles/sergiolopezolvera/cmq7kmhfj000901s7hueg15dg';

    const WATERSHED_FILL_ID  = 'Microwatersheds';
    const WATERSHED_ID_FIELD = 'fid';

    const SUPABASE_URL      = 'https://ffphbjcyglfpglsydxkk.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcGhiamN5Z2xmcGdsc3lkeGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzgzNjgsImV4cCI6MjA3MTU1NDM2OH0.xL61RfNW8XXNlzxECQKQ9Qyvmx7TzHDt0UtIS0tTVNI';

    const HOLD_URL     = `${SUPABASE_URL}/functions/v1/hold`;
    const CHECKOUT_URL = `${SUPABASE_URL}/functions/v1/create_checkout_session_block`;

    const publicUrl = (bucket, key) =>
      `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${key}`;

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Caches
    const watershedCache = new Map();  // fid → microwatersheds row
    const blockCache     = new Map();  // fid → parcels_block row

    // ---------- Data fetching ----------

    async function getWatershedDetail(fid) {
      if (watershedCache.has(fid)) return watershedCache.get(fid);

      const { data, error } = await supabase
        .from('microwatersheds')
        .select('*')
        .eq('fid', fid)
        .maybeSingle();

      if (error) console.warn('Watershed query error:', error.message);
      const result = data ?? null;
      watershedCache.set(fid, result);
      return result;
    }

    async function getBlockDetail(fid) {
      if (blockCache.has(fid)) return blockCache.get(fid);

      const blockId = 'block_' + String(fid);
      const { data, error } = await supabase
        .from('parcels_block')
        .select('block_id, status, title, price_cents')
        .eq('block_id', blockId)
        .maybeSingle();

      if (error) console.warn('Block query error:', error.message);
      const result = data ?? null;
      blockCache.set(fid, result);
      return result;
    }

    // ---------- Watershed panel ----------

    let selectedWatershedId = null;
    let hoveredFid          = null;

    function updateWatershedOpacity() {
      if (!map.getLayer(WATERSHED_FILL_ID)) return;
      try {
        if (selectedWatershedId != null && hoveredFid != null && hoveredFid !== selectedWatershedId) {
          map.setPaintProperty(WATERSHED_FILL_ID, 'fill-opacity', [
            'case',
            ['==', ['get', WATERSHED_ID_FIELD], selectedWatershedId], 0.8,
            ['==', ['get', WATERSHED_ID_FIELD], hoveredFid],           0.7,
            0.2
          ]);
        } else if (selectedWatershedId != null) {
          map.setPaintProperty(WATERSHED_FILL_ID, 'fill-opacity', [
            'case',
            ['==', ['get', WATERSHED_ID_FIELD], selectedWatershedId], 0.8,
            0.2
          ]);
        } else if (hoveredFid != null) {
          map.setPaintProperty(WATERSHED_FILL_ID, 'fill-opacity', [
            'case',
            ['==', ['get', WATERSHED_ID_FIELD], hoveredFid], 0.7,
            0.45
          ]);
        } else {
          map.setPaintProperty(WATERSHED_FILL_ID, 'fill-opacity', 0.45);
        }
      } catch (e) {}
    }

    function fmt(val, unit, decimals = 1) {
      return val != null ? `${Number(val).toFixed(decimals)} ${unit}` : null;
    }

    function fmtPrice(cents) {
      if (!cents || cents <= 0) return null;
      const dollars = Math.round(cents / 100);
      return '$ ' + dollars.toLocaleString('en-US');
    }

    function collapseWatershed() {
      selectedWatershedId = null;
      updateWatershedOpacity();
      const detail = document.getElementById('watershed-detail');
      if (detail) {
        detail.innerHTML = '<p class="watershed-detail-empty">Click on a microwatershed on the map to explore it.</p>';
      }
    }

    function renderWatershedDetail(fid, data, block) {
      const detail = document.getElementById('watershed-detail');
      if (!detail) return;

      const name = data?.name || `Watershed ${fid}`;

      let statsHtml;
      if (!data) {
        statsHtml = `
          <div class="stat-row">
            <span class="stat-label" style="font-style:italic">No data available yet.</span>
          </div>`;
      } else {
        const areaRow = data.area_ha != null ? `
          <div class="stat-row">
            <span class="stat-label">Area</span>
            <span class="stat-value">${fmt(data.area_ha, 'ha')}</span>
          </div>` : '';

        const streamsRow = data.streams_length_mi != null ? `
          <div class="stat-row">
            <span class="stat-label">Streams &amp; rivers</span>
            <span class="stat-value">${fmt(data.streams_length_mi, 'mi')}</span>
          </div>` : '';

        const gulch7Row = data.gulch7_area_ha != null ? `
          <div class="stat-row">
            <span class="stat-label">Gulch 7 project</span>
            <span class="stat-value">${fmt(data.gulch7_area_ha, 'ha')}</span>
          </div>` : '';

        const roadRow = data.road_decommission_length_mi != null ? `
          <div class="stat-row">
            <span class="stat-label">Road decommission &amp; upgrade</span>
            <span class="stat-value">${fmt(data.road_decommission_length_mi, 'mi')}</span>
          </div>` : '';

        const streamRestRow = data.stream_restoration_length_mi != null ? `
          <div class="stat-row">
            <span class="stat-label">Stream restoration</span>
            <span class="stat-value">${fmt(data.stream_restoration_length_mi, 'mi')}</span>
          </div>` : '';

        const researchRow = data.has_research_center ? `
          <div class="stat-row">
            <span class="stat-label">Research center</span>
            <span class="stat-value"><span class="stat-badge present">Present</span></span>
          </div>` : '';

        statsHtml = areaRow + streamsRow + gulch7Row + roadRow + streamRestRow + researchRow;
      }

      const modelSrc = (data?.model_bucket && data?.model_key)
        ? publicUrl(data.model_bucket, data.model_key)
        : null;

      const modelHtml = modelSrc
        ? `<model-viewer
             src="${modelSrc}"
             alt="${name} 3D model"
             camera-controls
             auto-rotate
             style="width:100%;height:220px;background:#e8ede4;display:block;"
           ></model-viewer>`
        : `<div style="width:100%;height:120px;background:#e8ede4;display:flex;align-items:center;justify-content:center;">
             <span style="font-size:12px;color:rgba(49,94,32,0.45)">3D model coming soon</span>
           </div>`;

      // Sponsor button
      let footerHtml = '';
      if (block) {
        const isAvailable = block.status === 'available';
        const computedCents = data?.acres ? Math.round(data.acres * 100 * 100) : null;
        const priceCentsToUse = computedCents || block.price_cents;
        const priceLabel  = fmtPrice(priceCentsToUse);
        const btnLabel    = isAvailable
          ? (priceLabel ? `Sponsor · ${priceLabel} / yr` : 'Sponsor this microwatershed')
          : 'Already sponsored';

        footerHtml = `
          <div class="watershed-card-footer">
            <button
              type="button"
              class="ws-sponsor-btn"
              id="ws-sponsor-btn-${fid}"
              ${isAvailable ? '' : 'disabled'}
            >${btnLabel}</button>
          </div>`;
      }

      detail.innerHTML = `
        <button type="button" class="watershed-collapse-btn">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8L6 4L10 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Hide watershed
        </button>
        <div class="watershed-card">
          <div class="watershed-card-hero">
            <div class="watershed-hero-model">${modelHtml}</div>
            <div class="watershed-card-header">
              <span class="watershed-kicker">Microwatershed</span>
              <h4 class="watershed-name">${name}</h4>
              <div class="watershed-hero-area">${data?.acres != null ? `<span class="stat-value">${data.acres.toLocaleString('en-US', {maximumFractionDigits:0})} ac</span>` : ''}</div>
            </div>
          </div>
          <div class="watershed-stats">
            ${statsHtml}
          </div>
          ${footerHtml}
        </div>
      `;

      detail.querySelector('.watershed-collapse-btn').addEventListener('click', collapseWatershed);

      // Wire up sponsor button
      if (block && block.status === 'available') {
        const sponsorBtn = document.getElementById(`ws-sponsor-btn-${fid}`);
        if (sponsorBtn) {
          sponsorBtn.addEventListener('click', async () => {
            sponsorBtn.disabled = true;
            sponsorBtn.textContent = 'Reserving…';

            try {
              const holdRes = await fetch(HOLD_URL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                  'apikey': SUPABASE_ANON_KEY,
                },
                credentials: 'omit',
                body: JSON.stringify({ id: block.block_id, ttl_minutes: 10 }),
              });

              const holdOut = await holdRes.json();
              if (!holdRes.ok) throw new Error(holdOut.error || 'Hold failed');

              const hold_token = holdOut.hold_token;
              if (!hold_token) throw new Error('Hold token missing');

              // Mark locally as pending
              blockCache.set(fid, { ...block, status: 'pending' });
              const _restoreCents = (data?.acres ? Math.round(data.acres * 100 * 100) : null) || block.price_cents;
              sponsorBtn.textContent = _restoreCents
                ? `Sponsor · ${fmtPrice(_restoreCents)} / yr`
                : 'Sponsor this microwatershed';
              sponsorBtn.disabled = false;

              openBlockModal({
                blockId:    block.block_id,
                blockName:  name,
                priceCents: _restoreCents,
                hold_token,
              });
            } catch (err) {
              const _errCents = (data?.acres ? Math.round(data.acres * 100 * 100) : null) || block.price_cents;
              sponsorBtn.disabled = false;
              sponsorBtn.textContent = _errCents
                ? `Sponsor · ${fmtPrice(_errCents)} / yr`
                : 'Sponsor this microwatershed';
              alert(err?.message || String(err));
            }
          });
        }
      }
    }

    function scrollPanelToDetail() {
      const panelInner = document.querySelector('#explore-panel .explore-panel-inner');
      const detail     = document.getElementById('watershed-detail');
      if (!panelInner || !detail) return;
      requestAnimationFrame(() => {
        const panelRect  = panelInner.getBoundingClientRect();
        const detailRect = detail.getBoundingClientRect();
        panelInner.scrollTo({
          top: Math.max(0, detailRect.top - panelRect.top + panelInner.scrollTop - 12),
          behavior: 'smooth'
        });
      });
    }

    // ---------- Block adoption modal ----------

    let bmEls                = null;
    let currentBlockContext  = null;

    function getBmEls() {
      if (bmEls) return bmEls;
      ensureBlockModal();
      bmEls = {
        backdrop:  document.getElementById('bm-backdrop'),
        closeBtn:  document.getElementById('bm-close-btn'),
        cancelBtn: document.getElementById('bm-cancel-btn'),
        submitBtn: document.getElementById('bm-submit-btn'),
        subtitle:  document.getElementById('bm-subtitle'),
        error:     document.getElementById('bm-error'),
        donorName: document.getElementById('bm-donor-name'),
        donorEmail:document.getElementById('bm-donor-email'),
        hideName:  document.getElementById('bm-hide-name'),
        logoInput: document.getElementById('bm-sponsor-logo'),
      };
      bmEls.closeBtn.addEventListener('click',  closeBlockModal);
      bmEls.cancelBtn.addEventListener('click', closeBlockModal);
      bmEls.backdrop.addEventListener('click',  (e) => {
        if (e.target === bmEls.backdrop) closeBlockModal();
      });
      bmEls.submitBtn.addEventListener('click', submitBlockForm);
      return bmEls;
    }

    function openBlockModal({ blockId, blockName, priceCents, hold_token }) {
      const els = getBmEls();
      currentBlockContext = { blockId, hold_token };

      const priceStr = fmtPrice(priceCents);
      els.subtitle.textContent = priceStr
        ? `${blockName} · ${priceStr} / yr annual subscription`
        : blockName;

      // Reset fields
      els.donorName.value  = '';
      els.donorEmail.value = '';
      els.hideName.checked = false;
      els.logoInput.value  = '';
      hideBlockError();

      els.backdrop.style.display = 'flex';
      setTimeout(() => els.donorName.focus(), 60);
    }

    function closeBlockModal() {
      if (!bmEls) return;
      bmEls.backdrop.style.display = 'none';
      currentBlockContext = null;
    }

    function showBlockError(msg) {
      const els = getBmEls();
      els.error.textContent = msg;
      els.error.style.display = 'block';
    }

    function hideBlockError() {
      const els = getBmEls();
      els.error.textContent = '';
      els.error.style.display = 'none';
    }

    function sanitizeFileName(name) {
      return String(name || 'file').replace(/[^\w.\-]+/g, '_');
    }

    async function uploadSponsorLogo(file, holdToken) {
      if (!file) return { sponsor_logo_bucket: null, sponsor_logo_key: null };

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Logo must be JPG, PNG, WEBP, or SVG.');
      }

      const maxSizeBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        throw new Error('Logo must be 5 MB or smaller.');
      }

      const safeName = sanitizeFileName(file.name);
      const path = `block-holds/${holdToken}/sponsor-logo/${Date.now()}_${safeName}`;

      const { error } = await supabase.storage
        .from('user-uploads-staging')
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (error) throw new Error(`Logo upload failed: ${error.message}`);

      return {
        sponsor_logo_bucket: 'user-uploads-staging',
        sponsor_logo_key:    path,
      };
    }

    async function submitBlockForm() {
      const els = getBmEls();
      if (!currentBlockContext) return;

      hideBlockError();
      els.submitBtn.disabled    = true;
      els.submitBtn.textContent = 'Preparing checkout…';

      try {
        const donorName  = els.donorName.value.trim();
        const donorEmail = els.donorEmail.value.trim();

        if (!donorName)  throw new Error('Your name is required.');
        if (!donorEmail) throw new Error('Your email is required.');

        const { blockId, hold_token } = currentBlockContext;
        const logoFile = els.logoInput.files?.[0] ?? null;
        const logoData = await uploadSponsorLogo(logoFile, hold_token);

        const payload = {
          block_id:   blockId,
          hold_token,
          source:     'map',
          donor: {
            name:      donorName,
            email:     donorEmail,
            hide_name: !!els.hideName.checked,
          },
          sponsor_logo_bucket: logoData.sponsor_logo_bucket,
          sponsor_logo_key:    logoData.sponsor_logo_key,
        };

        const checkoutRes = await fetch(CHECKOUT_URL, {
          method:      'POST',
          headers:     {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY,
          },
          credentials: 'omit',
          body:        JSON.stringify(payload),
        });

        const checkoutOut = await checkoutRes.json();
        if (!checkoutRes.ok) throw new Error(checkoutOut.error || 'Checkout failed.');
        if (!checkoutOut.url) throw new Error('Stripe URL missing.');

        window.location.href = checkoutOut.url;
      } catch (err) {
        showBlockError(err?.message || String(err));
        els.submitBtn.disabled    = false;
        els.submitBtn.textContent = 'Continue to payment';
      }
    }

    // ---------- Map ----------

    const map = new mapboxgl.Map({
      container: 'map',
      style:     MAP_STYLE,
      center:    (window.innerWidth < 768) ? [-123.842, 39.900] : [-123.842, 39.920],
      zoom:      (window.innerWidth < 768) ? 11.2 : 12.6,
      renderWorldCopies: false,
      cooperativeGestures: true
    });

    map.touchZoomRotate.disableRotation();
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {

      const watershedLayerExists = !!map.getLayer(WATERSHED_FILL_ID);
      if (!watershedLayerExists) {
        console.warn(
          `[Watersheds] Layer "${WATERSHED_FILL_ID}" not found in style. ` +
          `Available layers: ${map.getStyle().layers.map(l => l.id).join(', ')}`
        );
      }

      map.on('mousemove', (e) => {
        if (!watershedLayerExists) return;
        const features = map.queryRenderedFeatures(e.point, { layers: [WATERSHED_FILL_ID] });
        const fid = features.length ? Number(features[0].properties?.[WATERSHED_ID_FIELD]) : null;
        if (fid === hoveredFid) return;
        hoveredFid = fid;
        map.getCanvas().style.cursor = fid != null ? 'pointer' : '';
        updateWatershedOpacity();
      });

      map.on('click', async (e) => {
        if (!watershedLayerExists) return;
        const features = map.queryRenderedFeatures(e.point, { layers: [WATERSHED_FILL_ID] });
        if (!features.length) return;

        const fid = Number(features[0].properties?.[WATERSHED_ID_FIELD]);
        if (!fid && fid !== 0) return;

        // Toggle off if already selected
        if (selectedWatershedId === fid) {
          collapseWatershed();
          return;
        }

        selectedWatershedId = fid;
        updateWatershedOpacity();

        const detail = document.getElementById('watershed-detail');
        if (detail) detail.innerHTML = '<p class="watershed-detail-empty">Loading…</p>';
        scrollPanelToDetail();

        const [watershedData, blockData] = await Promise.all([
          getWatershedDetail(fid),
          getBlockDetail(fid),
        ]);

        // Guard against user clicking elsewhere while loading
        if (selectedWatershedId !== fid) return;

        renderWatershedDetail(fid, watershedData, blockData);
        scrollPanelToDetail();
      });

      // Realtime: update block availability in cache + re-render if currently visible
      supabase
        .channel('blocks-realtime')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'parcels_block' }, (payload) => {
          const row = payload?.new;
          if (!row?.block_id) return;

          // Derive fid from block_id (e.g. "block_42" → 42)
          const fidMatch = String(row.block_id).match(/^block_(\d+)$/);
          if (!fidMatch) return;
          const fid = Number(fidMatch[1]);

          // Update cache
          const cached = blockCache.get(fid);
          if (cached) {
            blockCache.set(fid, { ...cached, status: row.status, price_cents: row.price_cents });
          } else {
            blockCache.set(fid, row);
          }

          // If this watershed is currently selected, re-render the sponsor button
          if (selectedWatershedId === fid) {
            const sponsorBtn = document.getElementById(`ws-sponsor-btn-${fid}`);
            if (sponsorBtn) {
              const isAvailable = row.status === 'available';
              const priceLabel  = fmtPrice(row.price_cents);
              sponsorBtn.disabled     = !isAvailable;
              sponsorBtn.textContent  = isAvailable
                ? (priceLabel ? `Sponsor · ${priceLabel} / yr` : 'Sponsor this microwatershed')
                : 'Already sponsored';
            }
          }
        })
        .subscribe();

      setTimeout(() => map.resize(), 200);
      window.addEventListener('resize', () => map.resize());
    });

  } catch (err) {
    console.error('Bootstrap error:', err);
  }
})();
