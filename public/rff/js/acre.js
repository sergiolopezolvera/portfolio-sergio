  // =========================================================
  // CONFIG
  // =========================================================
  const SUPABASE_URL = 'https://ffphbjcyglfpglsydxkk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcGhiamN5Z2xmcGdsc3lkeGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzgzNjgsImV4cCI6MjA3MTU1NDM2OH0.xL61RfNW8XXNlzxECQKQ9Qyvmx7TzHDt0UtIS0tTVNI';  const HOLD_URL = `${SUPABASE_URL}/functions/v1/hold_acres`;
  const CHECKOUT_URL = `${SUPABASE_URL}/functions/v1/create_checkout_session`;

  const MAP_PAGE_URL = '/rff/acres-map';

  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // =========================================================
  // ELEMENTS
  // =========================================================
  const params   = new URLSearchParams(window.location.search);
  const rawId    = params.get('id');

  const imgEl    = document.getElementById('acre-image');
  const statusEl = document.getElementById('acre-status');
  const titleEl  = document.getElementById('acre-title');
  const descEl   = document.getElementById('acre-desc');
  const panelEl  = document.getElementById('acre-action-panel');

  // =========================================================
  // HELPERS
  // =========================================================
  const publicUrl = (bucket, key) => `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${key}`;
  const setStatus = (t = '') => { if (statusEl) statusEl.textContent = t; };

  function parseAcreId(value) {
    if (!value) return null;
    const m = String(value).trim().match(/(\d+)/);
    if (!m) return null;
    const num = parseInt(m[1], 10);
    if (!Number.isFinite(num)) return null;
    return { num, slug: `acre_${num}` };
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function nl2br(value) {
    return escapeHtml(value).replace(/\n/g, '<br>');
  }

  function sanitizeFileName(name) {
    return String(name || 'file').replace(/[^\w.\-]+/g, '_');
  }

  function ensurePageStyles() {
    if (document.getElementById('acre-page-dynamic-css')) return;

    const style = document.createElement('style');
    style.id = 'acre-page-dynamic-css';
    style.textContent = `
      .acre-panel {
        background: #FDFBF2;
        border: 1px solid #D8CDB9;
        border-radius: 16px;
        padding: 20px;
        color: #2f4725;
        font-family: Inter, sans-serif;
      }

      .acre-panel h3 {
        margin: 0 0 10px;
        font-size: 22px;
        color: #315E20;
      }

      .acre-panel p {
        margin: 0 0 12px;
        line-height: 1.55;
      }

      .acre-tribute-wrap {
        margin: 16px 0 18px;
      }

      .acre-tribute-image {
        display: block;
        width: 100%;
        max-width: 420px;
        height: auto;
        border-radius: 14px;
        border: 1px solid #E6DDCB;
        background: #fff;
      }

      .acre-recognition-line {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 14px;
      }

      .acre-public-message {
        margin: 16px 0;
        padding: 14px 16px;
        border-radius: 12px;
        background: #fff;
        border: 1px solid #E6DDCB;
        color: #3A4F31;
      }

      .acre-cta-copy {
        margin-top: 14px;
        color: #5b7750;
      }

      .acre-btn-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 18px;
      }

      .acre-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border-radius: 10px;
        padding: 11px 18px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity .15s ease;
      }

      .acre-btn:hover {
        opacity: .92;
      }

      .acre-btn-primary {
        background: #CD4422;
        color: #fff;
        border: none;
      }

      .acre-btn-secondary {
        background: transparent;
        color: #315E20;
        border: 2px solid #315E20;
      }

      .acre-small-note {
        margin-top: 10px;
        font-size: 12px;
        color: #6D8362;
      }

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
  }

  function ensureAdoptionModal() {
    if (document.getElementById('adoption-modal-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'adoption-modal-backdrop';
    backdrop.innerHTML = `
      <div id="adoption-modal" role="dialog" aria-modal="true" aria-labelledby="adoption-modal-title">
        <div class="am-header">
          <h2 id="adoption-modal-title">Adopt this acre</h2>
          <button type="button" class="am-close" id="adoption-close-btn">&times;</button>
        </div>
        <div class="am-body">
          <div style="margin-bottom:14px;font-size:14px;">
            <strong id="adoption-acre-label">Acre</strong>
          </div>

          <div class="am-error" id="adoption-error"></div>

          <div class="am-grid">
            <div>
              <label>Choose your contribution</label>
              <div class="am-radio-group">
                <label>
                  <input type="radio" name="adoption_cadence" value="one_time" checked>
                  One-time adoption
                </label>
                <label>
                  <input type="radio" name="adoption_cadence" value="monthly">
                  Monthly adoption
                </label>
              </div>
              <div class="am-note">Choose a one-time annual contribution or a recurring monthly contribution.</div>
            </div>

            <div>
              <label>Who is this adoption for?</label>
              <div class="am-radio-group">
                <label><input type="radio" name="adoption_type" value="standard" checked> Standard adoption</label>
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

  // =========================================================
  // MODAL LOGIC
  // =========================================================
  ensurePageStyles();
  ensureAdoptionModal();

  const modalEls = {
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

  let currentAdoptionContext = null;

  function getSelectedAdoptionType() {
    const checked = document.querySelector('input[name="adoption_type"]:checked');
    return checked?.value === 'gift' ? 'gift' : 'standard';
  }

  function isGiftMode() {
    return getSelectedAdoptionType() === 'gift';
  }

  function getSelectedCadence() {
    const checked = document.querySelector('input[name="adoption_cadence"]:checked');
    return checked?.value === 'monthly' ? 'monthly' : 'one_time';
  }

  function updateAdoptionModeUI() {
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

  function showModalError(message) {
    modalEls.error.textContent = message;
    modalEls.error.style.display = 'block';
  }

  function hideModalError() {
    modalEls.error.textContent = '';
    modalEls.error.style.display = 'none';
  }

  function openAdoptionModal({ acreID, hold_token }) {
    currentAdoptionContext = { acreID, hold_token };
    modalEls.acreLabel.textContent = `Acre ${acreID}`;
    hideModalError();
    modalEls.backdrop.style.display = 'flex';
    updateAdoptionModeUI();
  }

  function closeAdoptionModal() {
    modalEls.backdrop.style.display = 'none';
    currentAdoptionContext = null;
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
      const cadence = getSelectedCadence();

      const payload = {
        parcel_id: acreID,
        hold_token,
        cadence,
        source: 'acre_page',
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

  document.querySelectorAll('input[name="adoption_type"]').forEach((el) => {
    el.addEventListener('change', updateAdoptionModeUI);
  });

  modalEls.closeBtn.addEventListener('click', closeAdoptionModal);
  modalEls.cancelBtn.addEventListener('click', closeAdoptionModal);
  modalEls.backdrop.addEventListener('click', (e) => {
    if (e.target === modalEls.backdrop) closeAdoptionModal();
  });
  modalEls.submitBtn.addEventListener('click', submitAdoptionForm);

  // =========================================================
  // DATA LOAD
  // =========================================================
  const parsed = parseAcreId(rawId);

  if (!parsed) {
    if (titleEl) titleEl.textContent = 'Missing acre id';
    if (descEl) descEl.textContent = 'Append ?id=acre_123 or ?id=123 to the URL.';
    if (panelEl) panelEl.innerHTML = '';
    setStatus('');
    throw new Error('No acre id in URL');
  }

  setStatus('Loading…');

  let parcel = null;
  let adoption = null;

  try {
    let resp = await supabase
      .from('parcels_acre')
      .select('acre_id, status, title, description, image_bucket, image_key')
      .eq('acre_id', parsed.slug)
      .maybeSingle();

    if ((!resp.data && !resp.error) || resp.error) {
      resp = await supabase
        .from('parcels_acre')
        .select('acre_id, status, title, description, image_bucket, image_key')
        .eq('acre_id', parsed.num)
        .maybeSingle();
    }

    if (resp.error) throw resp.error;
    parcel = resp.data || null;

    if (!parcel) {
      throw new Error('Acre not found.');
    }

    if (parcel.status === 'adopted') {
      const adoptionResp = await supabase
        .from('adoptions_acre_public')
        .select(`
          donor_name,
          donor_hide_name,
          is_gift,
          recipient_name,
          public_message,
          public_message_status,
          tribute_image_bucket,
          tribute_image_key,
          tribute_image_status
        `)
        .eq('parcel_id', parcel.acre_id)
        .maybeSingle();

      if (adoptionResp.error) {
        throw adoptionResp.error;
      }

      adoption = adoptionResp.data || null;
    }
  } catch (err) {
    console.error(err);
    if (titleEl) titleEl.textContent = 'Error loading acre';
    if (descEl) descEl.textContent = err?.message || 'Please try again later.';
    if (panelEl) {
      panelEl.innerHTML = `
        <div class="acre-panel">
          <p>We couldn’t load this acre right now.</p>
        </div>
      `;
    }
    setStatus('');
    throw err;
  }

  // =========================================================
  // UI DECISIONS
  // =========================================================
  const acreID = parcel.acre_id || parsed.slug;
  const displayTitle = parcel.title || acreID;
  const displayDesc = parcel.description || '';

  if (titleEl) titleEl.textContent = displayTitle;
  if (descEl) descEl.textContent = displayDesc;

  let mainImageUrl = null;

  if (parcel.image_bucket && parcel.image_key) {
    mainImageUrl = publicUrl(parcel.image_bucket, parcel.image_key);
  } else {
    const fallbackKey = `acre_${parsed.num}.png`;
    mainImageUrl = publicUrl('acre-images', fallbackKey);
  }

  if (imgEl && mainImageUrl) {
    imgEl.setAttribute('decoding', 'async');
    imgEl.setAttribute('loading', 'eager');
    imgEl.setAttribute('fetchpriority', 'high');

    imgEl.addEventListener('load', () => setStatus(''), { once: true });
    imgEl.addEventListener('error', () => {
      console.error('Could not load image:', mainImageUrl);
      setStatus('Could not load acre image.');
    }, { once: true });

    imgEl.src = mainImageUrl;
  } else {
    setStatus('');
  }

  function renderAdoptedPanel() {
    if (!panelEl) return;

    let recognitionLine = 'This acre has been adopted.';

    if (adoption?.is_gift) {
      recognitionLine = `This acre was adopted as a gift for <strong>${escapeHtml(adoption.recipient_name || 'someone special')}</strong>.`;
    } else if (adoption?.donor_hide_name) {
      recognitionLine = `This acre was adopted by <strong>an anonymous supporter</strong>.`;
    } else {
      recognitionLine = `This acre was adopted by <strong>${escapeHtml(adoption?.donor_name || 'a supporter')}</strong>.`;
    }

    const hasApprovedTributeImage =
      adoption?.tribute_image_status === 'approved' &&
      adoption?.tribute_image_bucket &&
      adoption?.tribute_image_key &&
      !adoption?.donor_hide_name;

    const tributeImageHtml = hasApprovedTributeImage
      ? `
        <div class="acre-tribute-wrap">
          <img
            class="acre-tribute-image"
            src="${publicUrl(adoption.tribute_image_bucket, adoption.tribute_image_key)}"
            alt="Recognition image for ${escapeHtml(displayTitle)}"
          />
        </div>
      `
      : '';

    const hasApprovedPublicMessage =
      adoption?.public_message_status === 'approved' &&
      adoption?.public_message &&
      adoption.public_message.trim() !== '';

    const publicMessageHtml = hasApprovedPublicMessage
      ? `<div class="acre-public-message">“${nl2br(adoption.public_message)}”</div>`
      : '';

    panelEl.innerHTML = `
      <div class="acre-panel">
        <div class="acre-recognition-line">${recognitionLine}</div>
        ${tributeImageHtml}
        ${publicMessageHtml}
        <p class="acre-cta-copy">You can help protect the redwoods too by adopting another acre.</p>
        <div class="acre-btn-row">
          <a class="acre-btn acre-btn-primary" href="${MAP_PAGE_URL}">Adopt an acre too</a>
        </div>
      </div>
    `;
  }

  async function handleAvailableAdoptionClick(buttonEl) {
    const originalText = buttonEl.textContent;
    buttonEl.disabled = true;
    buttonEl.textContent = 'Reserving…';

    try {
      const holdRes = await fetch(HOLD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ id: acreID, ttl_minutes: 10 }),
      });

      const holdOut = await holdRes.json();

      if (!holdRes.ok) {
        throw new Error(holdOut.error || 'Hold failed.');
      }

      if (!holdOut.hold_token) {
        throw new Error('Hold token missing.');
      }

      buttonEl.disabled = false;
      buttonEl.textContent = originalText;

      openAdoptionModal({ acreID, hold_token: holdOut.hold_token });
    } catch (err) {
      console.error(err);
      buttonEl.disabled = false;
      buttonEl.textContent = originalText;
      alert(err?.message || 'Could not reserve this acre.');
    }
  }

  function renderAvailablePanel() {
    if (!panelEl) return;

    panelEl.innerHTML = `
      <div class="acre-panel">
        <h3>This acre is available for adoption</h3>
        <p>Adopt this specific acre and help protect one of the world’s most remarkable redwood landscapes.</p>
        <div class="acre-btn-row">
          <button type="button" class="acre-btn acre-btn-primary" id="acre-adopt-btn">Adopt this acre</button>
          <a class="acre-btn acre-btn-secondary" href="${MAP_PAGE_URL}">Explore the map</a>
        </div>
        <div class="acre-small-note">You’ll be able to choose one-time or monthly adoption in the next step.</div>
      </div>
    `;

    const adoptBtn = document.getElementById('acre-adopt-btn');
    if (adoptBtn) {
      adoptBtn.addEventListener('click', () => handleAvailableAdoptionClick(adoptBtn));
    }
  }

  function renderFallbackPanel() {
    if (!panelEl) return;

    panelEl.innerHTML = `
      <div class="acre-panel">
        <p>This acre’s current status could not be determined.</p>
        <div class="acre-btn-row">
          <a class="acre-btn acre-btn-secondary" href="${MAP_PAGE_URL}">Explore the map</a>
        </div>
      </div>
    `;
  }

  if (parcel.status === 'adopted') {
    renderAdoptedPanel();
  } else if (parcel.status === 'available') {
    renderAvailablePanel();
  } else {
    renderFallbackPanel();
  }

  if (displayTitle) {
    document.title = `${displayTitle} • Acre`;
  }

  setStatus('');
