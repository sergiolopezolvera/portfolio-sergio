// Same pattern as blocks-success, using the get-acre-adoption-success edge function.
document.addEventListener('DOMContentLoaded', async function () {
  const SUPABASE_URL = 'https://ffphbjcyglfpglsydxkk.supabase.co';
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  const els = {
    acre:      document.getElementById('acre-id'),
    status:    document.getElementById('adoption-status'),
    email:     document.getElementById('donor-email'),
    amount:    document.getElementById('contribution'),
    reference: document.getElementById('payment-reference'),
    started:   document.getElementById('started-at'),
    expires:   document.getElementById('expires-at'),
  };
  const set = (el, v) => { if (el) el.textContent = v ?? 'Unavailable'; };
  function formatDate(value) {
    if (!value) return 'Unavailable';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return 'Unavailable';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
  }
  if (!sessionId) {
    Object.values(els).forEach(el => set(el, 'Unavailable'));
    return;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/get-acre-adoption-success?session_id=${encodeURIComponent(sessionId)}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data = await res.json();
    set(els.acre, data.parcel_id);
    set(els.status, data.adoption_status);
    set(els.email, data.donor_email);
    set(els.amount, data.amount);
    set(els.reference, data.payment_reference);
    set(els.started, formatDate(data.started_at));
    set(els.expires, formatDate(data.expires_at));
  } catch (err) {
    console.error('Error loading adoption details:', err);
    Object.values(els).forEach(el => set(el, 'Unavailable'));
    set(els.status, 'Unable to load details');
  }
});
