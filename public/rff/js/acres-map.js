/* ========== BOOTSTRAP: load Mapbox GL (CSS/JS) ========== */
async function ensureMapbox(version = 'v2.15.0') {
  const norm = version.replace(/\W/g, '_');
  const cssId = `mbx_css_${norm}`;
  const jsId = `mbx_js_${norm}`;

  if (!document.getElementById(cssId)) {
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.href = `https://api.mapbox.com/mapbox-gl-js/${version}/mapbox-gl.css`;
    document.head.appendChild(link);
  }

  if (!window.mapboxgl && !document.getElementById(jsId)) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.id = jsId;
      s.src = `https://api.mapbox.com/mapbox-gl-js/${version}/mapbox-gl.js`;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load Mapbox GL'));
      document.head.appendChild(s);
    });
  }
}

/* ========== BOOTSTRAP: base DOM + CSS ========== */
function ensureBaseDom() {
  const wrapper = document.getElementById('map-wrapper');

  if (!wrapper) {
    throw new Error('Missing #map-wrapper element in the page.');
  }

  // Ensure wrapper can position legend absolutely inside it
  const wrapperStyle = window.getComputedStyle(wrapper);
  if (wrapperStyle.position === 'static') {
    wrapper.style.position = 'relative';
  }

  // Optional: if wrapper has no explicit height, give it one
  if (!wrapper.style.height && wrapper.offsetHeight === 0) {
    wrapper.style.height = '100vh';
  }

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
        <button type="button" class="panel-drag-handle" aria-label="Toggle panel"></button>
        <div class="explore-panel-header">
          <p class="explore-kicker">Sponsor an Acre</p>
          <h2>Explore Standley Creek</h2>
          <p class="explore-intro">
            Learn how sponsorship supports conservation, research, and restoration work across the watershed.
          </p>
        </div>
  
        <div class="explore-legend-grid">
          <div class="explore-legend-col">
            <h3>Map layers</h3>
            <div class="explore-static-row explore-static-row-sm">
              <span class="legend-swatch legend-swatch-acres"></span>
              <span>Sponsorable acres</span>
            </div>
          </div>
          <div class="explore-legend-col">
            <h3>Projects in the watershed</h3>
            <button type="button" class="project-row explore-static-row-sm" data-project-key="researchSites">
              <span class="legend-swatch legend-swatch-research"></span>
              <span>Research Sites</span>
            </button>
            <button type="button" class="project-row explore-static-row-sm" data-project-key="streamRestoration">
              <span class="legend-swatch legend-swatch-stream"></span>
              <span>Stream Restoration</span>
            </button>
            <button type="button" class="project-row explore-static-row-sm" data-project-key="roadDecommission">
              <span class="legend-swatch legend-swatch-road"></span>
              <span>Road Decommission / Upgrade</span>
            </button>
            <button type="button" class="project-row explore-static-row-sm" data-project-key="gulch7">
              <span class="legend-swatch legend-swatch-gulch7"></span>
              <span>Gulch 7</span>
            </button>
          </div>
        </div>
  
        <div id="project-detail" class="project-detail" aria-live="polite">
          <p class="project-detail-empty">
            Select a project layer to learn more.
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
  
      #explore-panel .explore-panel-header {
        margin-bottom: 16px;
      }
  
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
  
      #explore-panel .explore-static-row,
      #explore-panel .project-row {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 10px;
        min-height: 34px;
        padding: 7px 8px;
        border-radius: 10px;
        font-size: 13px;
        line-height: 1.25;
      }
  
      #explore-panel .explore-static-row {
        color: rgba(253, 251, 242, 0.92);
      }
  
      #explore-panel .project-row {
        margin: 0;
        border: 1px solid transparent;
        background: transparent;
        color: #FDFBF2;
        text-align: left;
        cursor: pointer;
        transition:
          background-color 160ms ease,
          border-color 160ms ease,
          transform 160ms ease;
      }
  
      #explore-panel .project-row:hover {
        background: rgba(253, 251, 242, 0.12);
      }
  
      #explore-panel .project-row.is-active {
        background: #FDFBF2;
        color: #315E20;
        border-color: rgba(49, 94, 32, 0.28);
        font-weight: 800;
      }
  
      #explore-panel .legend-swatch {
        flex: 0 0 auto;
        display: inline-block;
        width: 12px;
        height: 12px;
      }
  
      #explore-panel .legend-swatch-acres {
        background: #91cb70;
        background-size: 5px 5px;
        border: 1px solid #315e20;
      }
  
      #explore-panel .legend-swatch-research {
        border-radius: 50%;
        background: #ec370e;
        box-shadow: 0 0 0 2px #ec370e;
      }
  
      #explore-panel .legend-swatch-stream {
        height: 4px;
        border-radius: 99px;
        background: #2724ff;
      }
  
      #explore-panel .legend-swatch-road {
        height: 4px;
        border-radius: 99px;
        background: #803100;
      }

      #explore-panel .legend-swatch-gulch7 {
        height: 4px;
        border-radius: 99px;
        background: #4c6af0;
        box-shadow: 0 0 0 2px #4c6af0;
      }
  
      #explore-panel .project-detail {
        margin-top: 16px;
      }

      #explore-panel .project-collapse-btn {
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

      #explore-panel .project-collapse-btn:hover {
        background: rgba(253, 251, 242, 0.17);
        color: rgba(253, 251, 242, 0.95);
      }

      #explore-panel .project-collapse-btn svg {
        flex-shrink: 0;
        opacity: 0.7;
      }
  
      #explore-panel .project-detail-empty {
        margin: 0;
        padding: 12px;
        border-radius: 12px;
        background: rgba(253, 251, 242, 0.12);
        color: rgba(253, 251, 242, 0.82);
        font-size: 13px;
        line-height: 1.4;
      }
  
      #explore-panel .project-card {
        overflow: hidden;
        border-radius: 15px;
        background: #FDFBF2;
        color: #315E20;
        border: 1px solid rgba(253, 251, 242, 0.5);
      }
  
      #explore-panel .project-card img {
        width: 100%;
        height: 200px;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
        background: #E8EEE7;
      }
  
      #explore-panel .project-card-body {
        padding: 14px;
      }
  
      #explore-panel .project-card h4 {
        margin: 0 0 8px;
        font-size: 18px;
        line-height: 1.15;
        color: #315E20;
      }
  
      #explore-panel .project-card p {
        margin: 0 0 12px;
        font-size: 13px;
        line-height: 1.45;
        color: #3E6522;
      }
  
      #explore-panel .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0 0 12px;
      }
  
      #explore-panel .project-tag {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 4px 8px;
        font-size: 11px;
        font-weight: 800;
        line-height: 1;
      }
  
      #explore-panel .project-tag.green {
        background: rgba(49, 94, 32, 0.14);
        color: #315E20;
      }
  
      #explore-panel .project-tag.blue {
        background: rgba(47, 111, 143, 0.16);
        color: #2F6F8F;
      }
  
      #explore-panel .project-card ul {
        margin: 0 0 14px;
        padding-left: 18px;
        color: #315E20;
        font-size: 13px;
        line-height: 1.4;
      }
  
      #explore-panel .project-card li + li {
        margin-top: 5px;
      }
  
      #explore-panel .project-card a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 10px;
        padding: 10px 12px;
        background: #315E20;
        color: #FDFBF2;
        font-size: 13px;
        font-weight: 800;
        text-decoration: none;
      }
  
      /* Drag handle — hidden on desktop, shown on mobile */
      #explore-panel .panel-drag-handle {
        display: none;
        width: 100%;
        border: none;
        background: transparent;
        padding: 0 0 12px;
        cursor: pointer;
      }
      #explore-panel .panel-drag-handle::after {
        content: '';
        display: block;
        width: 36px;
        height: 4px;
        background: rgba(253,251,242,0.35);
        border-radius: 2px;
        margin: 0 auto;
      }

      #explore-panel .explore-legend-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 12px;
        border-top: 1px solid rgba(253,251,242,0.24);
        padding-top: 14px;
        margin-top: 14px;
      }
      #explore-panel .explore-legend-col h3 {
        margin-bottom: 6px;
      }
      #explore-panel .explore-static-row-sm,
      #explore-panel .project-row.explore-static-row-sm {
        min-height: 26px;
        padding: 4px 6px;
        font-size: 12px;
      }

      @media (max-width: 767px) {
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
          transition: max-height 0.3s ease;
        }
        #explore-panel .panel-drag-handle {
          display: block;
        }
        #explore-panel .explore-panel-inner {
          max-height: 58vh;
          padding: 14px;
        }
        #explore-panel h2 {
          font-size: 20px;
        }
        #explore-panel.is-collapsed {
          max-height: 32px !important;
          overflow: hidden;
          cursor: pointer;
          transition: max-height 0.3s ease;
          box-shadow: 0 -3px 12px rgba(0,0,0,0.15);
        }
        #explore-panel.is-collapsed .panel-drag-handle {
          padding: 0;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #explore-panel.is-collapsed .panel-drag-handle::after {
          margin: 0;
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
      .mapboxgl-popup.popup-clear .mapboxgl-popup-tip {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

function ensureAdoptionModal() {
  if (document.getElementById('adoption-modal')) return;

  const style = document.createElement('style');
  style.id = 'adoption-modal-css';
  style.textContent = `
    #adoption-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.45);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 20px;
    }
    #adoption-modal {
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow: auto;
      background: #FDFBF2;
      border-radius: 16px;
      border: 1px solid #D8CDB9;
      box-shadow: 0 12px 32px rgba(0,0,0,.18);
      font-family: Inter, sans-serif;
      color: #2f4725;
    }
    #adoption-modal .am-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px 10px;
      border-bottom: 1px solid #E6DDCB;
    }
    #adoption-modal .am-body {
      padding: 18px 20px 22px;
    }
    #adoption-modal h2 {
      margin: 0;
      font-size: 20px;
      color: #315E20;
    }
    #adoption-modal .am-close {
      background: transparent;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #315E20;
    }
    #adoption-modal .am-grid {
      display: grid;
      gap: 14px;
    }
    #adoption-modal label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #315E20;
    }
    #adoption-modal input[type="text"],
    #adoption-modal input[type="email"],
    #adoption-modal textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid #CFC3AD;
      background: #fff;
      font-size: 14px;
      color: #24351d;
    }
    #adoption-modal textarea {
      min-height: 96px;
      resize: vertical;
    }
    #adoption-modal .am-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    #adoption-modal .am-radio-group,
    #adoption-modal .am-check-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }
    #adoption-modal .am-radio-group label,
    #adoption-modal .am-check-row label {
      margin: 0;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    #adoption-modal .am-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 18px;
    }
    #adoption-modal .am-btn {
      border: none;
      border-radius: 10px;
      padding: 10px 16px;
      font-size: 14px;
      cursor: pointer;
    }
    #adoption-modal .am-btn-primary {
      background: #CD4422;
      color: #fff;
    }
    #adoption-modal .am-btn-secondary {
      background: transparent;
      color: #315E20;
      border: 2px solid #315E20;
    }
    #adoption-modal .am-error {
      display: none;
      background: #fff1ee;
      color: #a12d14;
      border: 1px solid #efb4a7;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 13px;
    }
    #adoption-modal .am-note {
      font-size: 12px;
      color: #5b7750;
      margin-top: 4px;
    }
    #adoption-standard-fields,
    #adoption-gift-fields {
      display: none;
    }
    @media (max-width: 640px) {
      #adoption-modal .am-row-2 {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  const backdrop = document.createElement('div');
  backdrop.id = 'adoption-modal-backdrop';
  backdrop.innerHTML = `
    <div id="adoption-modal" role="dialog" aria-modal="true" aria-labelledby="adoption-modal-title">
      <div class="am-header">
        <h2 id="adoption-modal-title">Sponsor this acre</h2>
        <button type="button" class="am-close" id="adoption-close-btn">&times;</button>
      </div>
      <div class="am-body">
        <div style="margin-bottom:14px;font-size:14px;">
          <strong id="adoption-acre-label">Acre</strong>
        </div>

        <div class="am-error" id="adoption-error"></div>

        <div class="am-grid">

          <div>
            <label>Who is this sponsorship for?</label>
            <div class="am-radio-group">
              <label><input type="radio" name="adoption_type" value="standard" checked> Standard sponsorship</label>
              <label><input type="radio" name="adoption_type" value="gift"> Gift</label>
            </div>
          </div>

          <div class="am-row-2">
            <div>
              <label for="adoption-donor-name">Your name</label>
              <input id="adoption-donor-name" type="text" maxlength="120" />
            </div>
            <div>
              <label for="adoption-donor-email">Your email</label>
              <input id="adoption-donor-email" type="email" maxlength="190" />
            </div>
          </div>

          <div class="am-check-row">
            <label><input id="adoption-hide-name" type="checkbox"> Keep my name private in public recognition</label>
          </div>

          <div id="adoption-standard-fields">
            <div>
              <label for="adoption-public-message">Message for the world</label>
              <textarea id="adoption-public-message" maxlength="1000"></textarea>
              <div class="am-note">Optional. This message may be displayed publicly.</div>
            </div>
            <div>
              <label for="adoption-tribute-image-standard">Upload your photo</label>
              <input id="adoption-tribute-image-standard" type="file" accept="image/png,image/jpeg,image/webp" />
              <div class="am-note">Optional. JPG, PNG or WEBP. Max 5 MB.</div>
            </div>
          </div>

          <div id="adoption-gift-fields">
            <div class="am-row-2">
              <div>
                <label for="adoption-recipient-name">Recipient name</label>
                <input id="adoption-recipient-name" type="text" maxlength="120" />
              </div>
              <div>
                <label for="adoption-recipient-email">Recipient email</label>
                <input id="adoption-recipient-email" type="email" maxlength="190" />
              </div>
            </div>
            <div>
              <label for="adoption-gift-message">Message to the recipient</label>
              <textarea id="adoption-gift-message" maxlength="1000"></textarea>
            </div>
            <div>
              <label for="adoption-tribute-image-gift">Upload a photo of the recipient</label>
              <input id="adoption-tribute-image-gift" type="file" accept="image/png,image/jpeg,image/webp" />
              <div class="am-note">Optional. JPG, PNG or WEBP. Max 5 MB.</div>
            </div>
          </div>
        </div>

        <div class="am-actions">
          <button type="button" class="am-btn am-btn-secondary" id="adoption-cancel-btn">Cancel</button>
          <button type="button" class="am-btn am-btn-primary" id="adoption-submit-btn">Continue to payment</button>
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
    ensureBaseDom();

    mapboxgl.accessToken = window.RFF_CONFIG?.mapboxToken || '';
    const MAP_STYLE = 'mapbox://styles/sergiolopezolvera/cmq4ngetk003x01sa8ki2amd8';

    const SOURCE_LAYER = 'c6450bacffb4d0d8c281';
    const FILL_ID = 'StandleyCreek_Fill';
    const TILE_ID_FIELD = 'acreID';
    const DB_ID_FIELD = 'acre_id';

    const SUPABASE_URL = 'https://ffphbjcyglfpglsydxkk.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcGhiamN5Z2xmcGdsc3lkeGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzgzNjgsImV4cCI6MjA3MTU1NDM2OH0.xL61RfNW8XXNlzxECQKQ9Qyvmx7TzHDt0UtIS0tTVNI';
    
    const publicUrl = (bucket, key) => `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${key}`;
    
    const PROJECT_IMAGE_BUCKET = 'project-images';

    const PROJECTS = {
      researchSites: {
        title: 'Research Sites',
        shortDescription:
          'Field research sites help document ecological conditions and guide long-term conservation decisions in Standley Creek.',
        bullets: [
          'Supports monitoring and adaptive management',
          'Documents forest and watershed conditions',
          'Helps communicate the scientific value of the property'
        ],
        image: publicUrl(PROJECT_IMAGE_BUCKET, 'research-sites.png'),
        learnMoreUrl: '#',
        tags: [
          { label: 'Research', color: 'blue' },
          { label: 'Conservation science', color: 'green' }
        ],
        layerIds: [
          'Research Sites'
        ],
        paintProperty: 'circle-opacity'
      },
    
      streamRestoration: {
        title: 'Stream Restoration',
        shortDescription:
          'Stream restoration work improves aquatic habitat, riparian function, and watershed resilience in Standley Creek.',
        bullets: [
          'Improves habitat quality',
          'Supports stream and riparian recovery',
          'Strengthens long-term watershed function'
        ],
        image: publicUrl(PROJECT_IMAGE_BUCKET, 'stream-restoration.png'),
        learnMoreUrl: '#',
        tags: [
          { label: 'Watershed health', color: 'blue' },
          { label: 'Habitat recovery', color: 'green' }
        ],
        layerIds: [
          'Stream Restoration'
        ],
        paintProperty: 'line-opacity'
      },
    
      roadDecommission: {
        title: 'Road Decommission / Upgrade',
        shortDescription:
          'Road decommissioning and upgrades reduce erosion risks, improve drainage, and protect sensitive watershed areas.',
        bullets: [
          'Reduces sediment delivery to streams',
          'Improves road drainage and stability',
          'Protects restoration and conservation investments'
        ],
        image: publicUrl(PROJECT_IMAGE_BUCKET, 'road-decomission.png'),
        learnMoreUrl: '#',
        tags: [
          { label: 'Access management', color: 'green' },
          { label: 'Water quality', color: 'blue' }
        ],
        layerIds: [
          'Road Decomission Upgrade'
        ],
        paintProperty: 'line-opacity'
      },
      gulch7: {
        title: 'Gulch 7 Stream Habitat Improvement Project',
        shortDescription:
          'A proposed 635-acre, FRGP-funded habitat restoration project on RFFI-owned land northwest of Leggett, focused on improving salmonid habitat in Gulch 7 and North Fork Gulch 7.',
        bullets: [
          'Improves approximately 0.55 miles of salmonid habitat',
          'Increases channel complexity, pool frequency, spawning gravel retention, and low-velocity refuge',
          'Supports summer rearing habitat for coho salmon and other aquatic species',
          'Restores disturbed access areas with winterization, seeding, mulching, and native tree planting'
        ],
        image: publicUrl(PROJECT_IMAGE_BUCKET, 'gulch-7.png'),
        learnMoreUrl: '#',
        tags: [
          { label: '635 acres', color: 'green' },
          { label: 'Salmonid habitat', color: 'blue' },
          { label: 'FRGP proposed', color: 'green' }
        ],
        layerIds: [
          'Gulch 7'
        ],
        paintProperty: 'line-opacity'
      }
    };
    
  
    const HOLD_URL = `${SUPABASE_URL}/functions/v1/hold_acres`;
    const CHECKOUT_URL = `${SUPABASE_URL}/functions/v1/create_checkout_session`;
   
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const availabilityCache = new Map();
    const detailCache = new Map();
    const getAcreId = f => f?.properties?.[TILE_ID_FIELD] ?? null;

    async function getDetail(acreID) {
      if (detailCache.has(acreID)) return detailCache.get(acreID);

      const { data: parcel, error } = await supabase
        .from('parcels_acre')
        .select(`${DB_ID_FIELD}, status, title, description, image_bucket, image_key`)
        .eq(DB_ID_FIELD, acreID)
        .maybeSingle();

      if (error || !parcel) return null;

      let adoption = null;

      if (parcel.status === 'adopted') {
        const { data } = await supabase
          .from('adoptions_acre_public')
          .select(`
            donor_name,
            donor_hide_name,
            is_gift,
            recipient_name,
            tribute_image_bucket,
            tribute_image_key,
            tribute_image_status
          `)
          .eq('parcel_id', acreID)
          .maybeSingle();

        adoption = data ?? null;
      }

      const result = { ...parcel, adoption };
      availabilityCache.set(acreID, parcel.status === 'available');
      detailCache.set(acreID, result);

      return result;
    }

    let modalEls = null;

    function getModalEls() {
      if (modalEls) return modalEls;

      ensureAdoptionModal();

      modalEls = {
        backdrop: document.getElementById('adoption-modal-backdrop'),
        closeBtn: document.getElementById('adoption-close-btn'),
        cancelBtn: document.getElementById('adoption-cancel-btn'),
        submitBtn: document.getElementById('adoption-submit-btn'),
        error: document.getElementById('adoption-error'),
        acreLabel: document.getElementById('adoption-acre-label'),
        donorName: document.getElementById('adoption-donor-name'),
        donorEmail: document.getElementById('adoption-donor-email'),
        hideName: document.getElementById('adoption-hide-name'),
        standardFields: document.getElementById('adoption-standard-fields'),
        giftFields: document.getElementById('adoption-gift-fields'),
        publicMessage: document.getElementById('adoption-public-message'),
        recipientName: document.getElementById('adoption-recipient-name'),
        recipientEmail: document.getElementById('adoption-recipient-email'),
        giftMessage: document.getElementById('adoption-gift-message'),
        standardImage: document.getElementById('adoption-tribute-image-standard'),
        giftImage: document.getElementById('adoption-tribute-image-gift'),
      };

      document.querySelectorAll('input[name="adoption_type"]').forEach((el) => {
        el.addEventListener('change', updateAdoptionModeUI);
      });

      modalEls.closeBtn.addEventListener('click', closeAdoptionModal);
      modalEls.cancelBtn.addEventListener('click', closeAdoptionModal);
      modalEls.backdrop.addEventListener('click', (e) => {
        if (e.target === modalEls.backdrop) closeAdoptionModal();
      });
      modalEls.submitBtn.addEventListener('click', submitAdoptionForm);

      return modalEls;
    }

    let currentAdoptionContext = null;

    function getSelectedAdoptionType() {
      getModalEls();
      const checked = document.querySelector('input[name="adoption_type"]:checked');
      return checked?.value === 'gift' ? 'gift' : 'standard';
    }

    function isGiftMode() {
      return getSelectedAdoptionType() === 'gift';
    }

    function updateAdoptionModeUI() {
      const modalEls = getModalEls();
      const giftMode = isGiftMode();
      modalEls.standardFields.style.display = giftMode ? 'none' : 'block';
      modalEls.giftFields.style.display = giftMode ? 'block' : 'none';

      if (giftMode) {
        modalEls.publicMessage.value = '';
        modalEls.standardImage.value = '';
      } else {
        modalEls.recipientName.value = '';
        modalEls.recipientEmail.value = '';
        modalEls.giftMessage.value = '';
        modalEls.giftImage.value = '';
      }
    }

    function openAdoptionModal({ acreID, hold_token }) {
      const modalEls = getModalEls();
      currentAdoptionContext = { acreID, hold_token };
      modalEls.acreLabel.textContent = `Acre ${acreID}`;
      hideModalError();
      modalEls.backdrop.style.display = 'flex';
      updateAdoptionModeUI();
    }

    function closeAdoptionModal() {
      if (!modalEls) return;
      modalEls.backdrop.style.display = 'none';
      currentAdoptionContext = null;
    }

    function showModalError(message) {
      const modalEls = getModalEls();
      modalEls.error.textContent = message;
      modalEls.error.style.display = 'block';
    }

    function hideModalError() {
      const modalEls = getModalEls();
      modalEls.error.textContent = '';
      modalEls.error.style.display = 'none';
    }

    function sanitizeFileName(name) {
      return String(name || 'file').replace(/[^\w.\-]+/g, '_');
    }

    async function uploadTributeImage(file, holdToken) {
      if (!file) {
        return { tribute_image_bucket: null, tribute_image_key: null };
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Image must be JPG, PNG, or WEBP.');
      }

      const maxSizeBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        throw new Error('Image must be 10 MB or smaller.');
      }

      const safeName = sanitizeFileName(file.name);
      const path = `acre-holds/${holdToken}/tribute/${Date.now()}_${safeName}`;

      const { error } = await supabase.storage
        .from('user-uploads-staging')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw new Error(`Image upload failed: ${error.message}`);
      }

      return {
        tribute_image_bucket: 'user-uploads-staging',
        tribute_image_key: path,
      };
    }

    function validateAdoptionForm() {
      const modalEls = getModalEls();
      const donorName = modalEls.donorName.value.trim();
      const donorEmail = modalEls.donorEmail.value.trim();

      if (!donorName) throw new Error('Your name is required.');
      if (!donorEmail) throw new Error('Your email is required.');

      if (isGiftMode()) {
        const recipientName = modalEls.recipientName.value.trim();
        const recipientEmail = modalEls.recipientEmail.value.trim();

        if (!recipientName) throw new Error('Recipient name is required for gift adoptions.');
        if (!recipientEmail) throw new Error('Recipient email is required for gift adoptions.');
      }
    }

    async function submitAdoptionForm() {
      const modalEls = getModalEls();
      if (!currentAdoptionContext) throw new Error('Missing adoption context.');

      hideModalError();
      modalEls.submitBtn.disabled = true;
      modalEls.submitBtn.textContent = 'Preparing checkout…';

      try {
        validateAdoptionForm();

        const { acreID, hold_token } = currentAdoptionContext;
        const giftMode = isGiftMode();

        const selectedFile = giftMode
          ? (modalEls.giftImage.files?.[0] ?? null)
          : (modalEls.standardImage.files?.[0] ?? null);

        const imageData = await uploadTributeImage(selectedFile, hold_token);

        const cadence = 'one_time';

        const payload = {
          parcel_id: acreID,
          hold_token,
          cadence,
          source: 'map',
          donor: {
            name: modalEls.donorName.value.trim(),
            email: modalEls.donorEmail.value.trim(),
            hide_name: !!modalEls.hideName.checked,
          },
          gift: {
            is_gift: giftMode,
            recipient_name: giftMode ? (modalEls.recipientName.value.trim() || null) : null,
            recipient_email: giftMode ? (modalEls.recipientEmail.value.trim() || null) : null,
            gift_message: giftMode ? (modalEls.giftMessage.value.trim() || null) : null,
          },
          public_message: giftMode ? null : (modalEls.publicMessage.value.trim() || null),
          tribute_image_bucket: imageData.tribute_image_bucket,
          tribute_image_key: imageData.tribute_image_key,
        };

        const checkoutRes = await fetch(CHECKOUT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'omit',
          body: JSON.stringify(payload),
        });

        const checkoutOut = await checkoutRes.json();

        if (!checkoutRes.ok) {
          throw new Error(checkoutOut.error || 'Checkout failed.');
        }
        if (!checkoutOut.url) {
          throw new Error('Stripe URL missing.');
        }

        window.location.href = checkoutOut.url;
      } catch (err) {
        showModalError(err?.message || String(err));
        modalEls.submitBtn.disabled = false;
        modalEls.submitBtn.textContent = 'Continue to payment';
      }
    }

    let selectedProjectKey = null;
      
      function collapseProject() {
        selectedProjectKey = null;

        document.querySelectorAll('.project-row').forEach(btn => btn.classList.remove('is-active'));

        Object.values(PROJECTS).forEach(project => {
          project.layerIds.forEach(layerId => {
            if (map.getLayer(layerId)) {
              try { map.setPaintProperty(layerId, project.paintProperty, 0.45); } catch (e) {}
            }
          });
        });

        const detail = document.getElementById('project-detail');
        if (detail) {
          detail.innerHTML = '<p class="project-detail-empty">Select a project layer to learn more.</p>';
        }

        if (window.innerWidth >= 768) {
          map.easeTo({ padding: { left: 0, right: 0, top: 0, bottom: 0 }, duration: 450 });
        }
      }

      function escapeHtml(value) {
        return String(value ?? '')
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#039;');
      }
      
      function renderProjectDetail(projectKey) {
        const detail = document.getElementById('project-detail');
        const project = PROJECTS[projectKey];
      
        if (!detail || !project) return;
      
        const tagsHtml = (project.tags || [])
          .map(tag => `
            <span class="project-tag ${escapeHtml(tag.color)}">
              ${escapeHtml(tag.label)}
            </span>
          `)
          .join('');
      
        const bulletsHtml = (project.bullets || [])
          .map(item => `<li>${escapeHtml(item)}</li>`)
          .join('');
      
        detail.innerHTML = `
          <button type="button" class="project-collapse-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8L6 4L10 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Hide project
          </button>
          <article class="project-card">
            <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" />
            <div class="project-card-body">
              <div class="project-tags">${tagsHtml}</div>
              <h4>${escapeHtml(project.title)}</h4>
              <p>${escapeHtml(project.shortDescription)}</p>
              <ul>${bulletsHtml}</ul>
              <a href="${escapeHtml(project.learnMoreUrl)}" target="_blank" rel="noopener">
                Learn more
              </a>
            </div>
          </article>
        `;

        detail.querySelector('.project-collapse-btn').addEventListener('click', collapseProject);
      }

    function scrollExplorePanelToProjectCard() {
      const panelInner = document.querySelector('#explore-panel .explore-panel-inner');
      const detail = document.getElementById('project-detail');
    
      if (!panelInner || !detail) return;
    
      requestAnimationFrame(() => {
        const panelRect = panelInner.getBoundingClientRect();
        const detailRect = detail.getBoundingClientRect();
    
        const currentScroll = panelInner.scrollTop;
        const detailTopInsidePanel = detailRect.top - panelRect.top + currentScroll;
    
        panelInner.scrollTo({
          top: Math.max(0, detailTopInsidePanel - 12),
          behavior: 'smooth'
        });
      });
    }
          
      function setProjectLayerOpacity(projectKey) {
        Object.entries(PROJECTS).forEach(([key, project]) => {
          const opacity = key === projectKey ? 1 : 0.25;
      
          project.layerIds.forEach(layerId => {
            if (!map.getLayer(layerId)) {
              console.warn(`Project layer not found: ${layerId}`);
              return;
            }
      
            try {
              map.setPaintProperty(layerId, project.paintProperty, opacity);
            } catch (e) {
              console.warn(`setPaintProperty failed for ${layerId}:`, e.message);
            }
          });
        });
      }
      
      function setActiveProjectRow(projectKey) {
        document.querySelectorAll('.project-row').forEach(btn => {
          btn.classList.toggle('is-active', btn.dataset.projectKey === projectKey);
        });
      }
      
      function selectProject(projectKey) {
        if (!PROJECTS[projectKey]) return;

        if (selectedProjectKey === projectKey) {
          collapseProject();
          return;
        }

        selectedProjectKey = projectKey;
        setActiveProjectRow(projectKey);
        renderProjectDetail(projectKey);
        scrollExplorePanelToProjectCard();
        setProjectLayerOpacity(projectKey);
      
        if (window.innerWidth >= 768) {
          map.easeTo({
            padding: { left: 410, right: 40, top: 40, bottom: 40 },
            duration: 450
          });
        }
      }
      
      function collapsePanel() {
        const panel = document.getElementById('explore-panel');
        if (panel) panel.classList.add('is-collapsed');
      }

      function expandPanel() {
        const panel = document.getElementById('explore-panel');
        if (panel) panel.classList.remove('is-collapsed');
      }

      function initExplorePanelInteractions() {
        // Drag handle toggles collapse on mobile
        const dragHandle = document.querySelector('#explore-panel .panel-drag-handle');
        if (dragHandle) {
          dragHandle.addEventListener('click', () => {
            const panel = document.getElementById('explore-panel');
            if (panel) panel.classList.toggle('is-collapsed');
          });
        }

        document.querySelectorAll('.project-row').forEach(btn => {
          btn.addEventListener('click', () => {
            selectProject(btn.dataset.projectKey);
          });
          // Hover: temporarily highlight the layer when not already selected
          btn.addEventListener('mouseenter', () => {
            if (selectedProjectKey === btn.dataset.projectKey) return;
            const proj = PROJECTS[btn.dataset.projectKey];
            if (!proj) return;
            proj.layerIds.forEach(layerId => {
              if (map.getLayer(layerId)) {
                try { map.setPaintProperty(layerId, proj.paintProperty, 0.9); } catch(e) {}
              }
            });
          });
          btn.addEventListener('mouseleave', () => {
            if (selectedProjectKey === btn.dataset.projectKey) return;
            const proj = PROJECTS[btn.dataset.projectKey];
            if (!proj) return;
            proj.layerIds.forEach(layerId => {
              if (map.getLayer(layerId)) {
                try { map.setPaintProperty(layerId, proj.paintProperty, 0.45); } catch(e) {}
              }
            });
          });
        });
      }

    const map = new mapboxgl.Map({
      container: 'map',
      style: MAP_STYLE,
      center: [-123.842, 39.936],
      zoom: (window.innerWidth < 768) ? 11.4 : 12.6,
      renderWorldCopies: false,
      cooperativeGestures: true
    });

    
    map.touchZoomRotate.disableRotation();
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {

      if (window.innerWidth < 768) {
        const panelH = Math.round(window.innerHeight * 0.58);
        map.easeTo({ padding: { top: 0, bottom: panelH, left: 0, right: 0 }, duration: 0 });
      }

      const HIDE_LAYERS = ['grid-blocks-fill', 'grid-blocks-outline'];
      HIDE_LAYERS.forEach(id => {
        if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', 'none');
      });

      initExplorePanelInteractions();

        // Optional: start with all project layers quiet.
        Object.values(PROJECTS).forEach(project => {
          project.layerIds.forEach(layerId => {
            if (map.getLayer(layerId)) {
              try {
                map.setPaintProperty(layerId, project.paintProperty, 0.45);
              } catch (e) {
                console.warn(`setPaintProperty failed for ${layerId}:`, e.message);
              }
            }
          });
        });

      map.on('mouseenter', FILL_ID, () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', FILL_ID, () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', FILL_ID, async (e) => {
        const f = e.features?.[0];
        if (!f) return;

        const acreID = getAcreId(f);
        if (!acreID) return;

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          // Collapse the panel first (panel becomes 32px)
          collapsePanel();
          const containerH = map.getContainer().clientHeight;
          // top padding reserves space for the popup above the acre
          // bottom padding is just enough to clear the collapsed panel (32px)
          map.easeTo({
            center: e.lngLat,
            padding: { top: Math.round(containerH * 0.38), bottom: 52, left: 20, right: 20 },
            duration: 400
          });
        } else {
          map.easeTo({
            center: e.lngLat,
            padding: { left: 400, right: 40, top: 60, bottom: 60 },
            duration: 400
          });
        }
        const anchor = 'bottom'; // popup always renders above the point

        const popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          className: 'popup-clear',
          anchor,
          offset: [0, anchor === 'bottom' ? -10 : 10]
        });

        const wrap = document.createElement('div');
        wrap.style.cssText = 'background:#F6F1E4;border:1px solid #D8CDB9;border-radius:12px;box-shadow:0 4px 8px rgba(0,0,0,.1);font-family:Inter,sans-serif;color:#3E6522;max-width:280px;overflow:hidden;';
        wrap.innerHTML = `<div style="padding:14px"><h3 style="margin:0 0 8px">${acreID}</h3><p style="margin:0;color:#5b7750">Loading…</p></div>`;
        popup.setLngLat(e.lngLat).setDOMContent(wrap).addTo(map);

        // Re-expand panel when popup is closed
        if (isMobile) {
          popup.once('close', expandPanel);
        }

        const row = await getDetail(acreID);
        const title = row?.title || acreID;

        let desc = row?.description || 'Sponsor this acre for $100 - every sponsored acre helps us protect and restore this forest';
        let img = (row?.image_bucket && row?.image_key)
          ? publicUrl(row.image_bucket, row.image_key)
          : 'https://via.placeholder.com/600x300?text=Acre';

        if (row?.status === 'adopted' && row?.adoption) {
          const a = row.adoption;

          const shouldUseRecognitionImage =
            a.donor_hide_name !== true &&
            a.tribute_image_status === 'approved' &&
            !!a.tribute_image_bucket &&
            !!a.tribute_image_key;

          if (shouldUseRecognitionImage) {
            img = publicUrl(a.tribute_image_bucket, a.tribute_image_key);
          }

          if (a.is_gift) {
            desc = `This acre was sponsored as a gift for <strong>${a.recipient_name || 'someone special'}</strong>.`;
          } else if (a.donor_hide_name) {
            desc = `This acre was sponsored by <strong>an anonymous supporter</strong>.`;
          } else {
            desc = `This acre was sponsored by <strong>${a.donor_name || 'a supporter'}</strong>.`;
          }
        }

        wrap.innerHTML = `
          <div style="background:#fff">
            <img src="${img}" alt="${title}" style="width:100%;height:auto;object-fit:contain;display:block" />
          </div>
          <div style="padding:14px">
            <h3 style="margin:0 0 8px;font-size:16px">${title}</h3>
            <p style="margin:0 0 12px;line-height:1.4">${desc}</p>
            <div class="btns" style="display:flex;gap:12px;justify-content:center"></div>
          </div>`;

        const btns = wrap.querySelector('.btns');
        const isAvail = availabilityCache.get(acreID) ?? (row?.status === 'available');

        const adoptBtn = document.createElement('button');

        const setAdoptUI = () => {
          adoptBtn.textContent = 'Sponsor';
          adoptBtn.disabled = false;
          adoptBtn.style.cssText = 'background:#CD4422;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:14px;cursor:pointer;';
        };

        const setAdoptedUI = () => {
          adoptBtn.textContent = 'Sponsored';
          adoptBtn.disabled = true;
          adoptBtn.style.cssText = 'background:transparent;color:#315E20;border:2px solid #315E20;padding:8px 20px;border-radius:8px;font-size:14px;cursor:default;';
        };

        const setBusyUI = (label) => {
          adoptBtn.textContent = label;
          adoptBtn.disabled = true;
          adoptBtn.style.cssText = 'background:#CD4422;color:#fff;border:none;padding:8px 20px;border-radius:8px;font-size:14px;cursor:default;opacity:0.85;';
        };

        if (isAvail) {
          setAdoptUI();

          adoptBtn.onclick = async () => {
            setBusyUI('Reserving…');

            try {
              const holdRes = await fetch(HOLD_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'omit',
                body: JSON.stringify({ id: acreID, ttl_minutes: 10 }),
              });

              const holdOut = await holdRes.json();
              if (!holdRes.ok) throw new Error(holdOut.error || 'Hold failed');

              const hold_token = holdOut.hold_token;
              if (!hold_token) throw new Error('Hold token missing');

              availabilityCache.set(acreID, false);

              setAdoptUI();
              openAdoptionModal({ acreID, hold_token });
            } catch (err) {
              availabilityCache.set(acreID, true);
              setAdoptUI();
              alert(err?.message || String(err));
            }
          };
        } else {
          setAdoptedUI();
        }

        btns.appendChild(adoptBtn);
      });

      supabase
        .channel('acres-realtime')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'parcels_acre' }, (payload) => {
          const row = payload?.new;
          if (!row) return;

          availabilityCache.set(row[DB_ID_FIELD], row.status === 'available');

          if (detailCache.has(row[DB_ID_FIELD])) {
            detailCache.set(row[DB_ID_FIELD], { ...detailCache.get(row[DB_ID_FIELD]), ...row });
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
