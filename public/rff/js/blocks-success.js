document.addEventListener('DOMContentLoaded', async function () {
  const SUPABASE_URL = 'https://ffphbjcyglfpglsydxkk.supabase.co';
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const blockEl     = document.getElementById('sub-basin');
  const statusEl    = document.getElementById('adoption-status');
  const emailEl     = document.getElementById('donor-email');
  const amountEl    = document.getElementById('contribution');
  const referenceEl = document.getElementById('payment-reference');
  const startedAtEl = document.getElementById('started-at');
  const expiresAtEl = document.getElementById('expires-at');
  function formatDate(value) {
    if (!value) return 'Unavailable';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Unavailable';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }
  if (!sessionId) {
    if (statusEl)    statusEl.textContent    = 'Unavailable';
    if (startedAtEl) startedAtEl.textContent = 'Unavailable';
    if (expiresAtEl) expiresAtEl.textContent = 'Unavailable';
    return;
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/get_block_adoption_success?session_id=${encodeURIComponent(sessionId)}`);
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    if (blockEl)     blockEl.textContent     = data.block_name      ?? 'Unavailable';
    if (statusEl)    statusEl.textContent    = data.adoption_status ?? 'Unavailable';
    if (emailEl)     emailEl.textContent     = data.donor_email     ?? 'Unavailable';
    if (amountEl)    amountEl.textContent    = data.amount          ?? 'Unavailable';
    if (referenceEl) referenceEl.textContent = data.payment_reference ?? 'Unavailable';
    if (startedAtEl) startedAtEl.textContent = formatDate(data.started_at);
    if (expiresAtEl) expiresAtEl.textContent = formatDate(data.expires_at);
  } catch (error) {
    console.error('Error loading adoption details:', error);
    if (statusEl)    statusEl.textContent    = 'Unable to load details';
    [blockEl, emailEl, amountEl, referenceEl, startedAtEl, expiresAtEl].forEach(el => { if (el) el.textContent = 'Unavailable'; });
  }
});
