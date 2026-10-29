import './style.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { computeRollover } from './rollover.js';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

import { initializeApp } from 'firebase/app';
import {
  getAuth, initializeAuth, indexedDBLocalPersistence, onAuthStateChanged, GoogleAuthProvider,
  signInWithPopup, signInWithRedirect, signInWithCredential,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const isNative = Capacitor.isNativePlatform();

/* =========================================================
   Firebase
========================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyAv0T-gsygVQfVhvU0iyE3F7cU-CPbsydU",
  authDomain: "money-traker7.firebaseapp.com",
  projectId: "money-traker7",
  storageBucket: "money-traker7.firebasestorage.app",
  messagingSenderId: "1020688892818",
  appId: "1:1020688892818:web:292f464edf08a42401774b"
};
const fbApp = initializeApp(firebaseConfig);
const auth = isNative ? initializeAuth(fbApp, {persistence: indexedDBLocalPersistence}) : getAuth(fbApp);
const db = getFirestore(fbApp);

/* =========================================================
   Helpers
========================================================= */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const egp = (v, sign) => {
  const n = Number(v) || 0;
  const s = Math.abs(n).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  return (n < 0 ? '-' : (sign ? '+' : '')) + 'EGP ' + s;
};
const egp0 = v => 'EGP ' + Math.round(Number(v) || 0).toLocaleString('en-US');
const pad = n => String(n).padStart(2, '0');
const isoDate = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const ymOf = d => d.slice(0, 7);
const prettyDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'});
const monthLabel = ym => new Date(ym + '-01T00:00:00').toLocaleDateString('en-GB', {month: 'short', year: 'numeric'});
let toastTimer;
function toast(msg, err, action) {
  const t = $('toast');
  t.textContent = msg;
  if (action) {
    const b = document.createElement('button');
    b.className = 'act'; b.type = 'button'; b.textContent = action.label;
    b.onclick = () => { clearTimeout(toastTimer); t.classList.remove('show', 'has-act'); action.run(); };
    t.appendChild(b);
  }
  t.className = 'toast show' + (err ? ' err' : '') + (action ? ' has-act' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show', 'has-act'), action ? 5000 : 2800);
}
/* smooth number change for the dashboard figures */
function setMoney(el, value, fmt) {
  const to = Number(value) || 0, uid = currentUser ? currentUser.uid : '';
  const from = (el._v == null || el._u !== uid) ? to : el._v;
  el._v = to; el._u = uid;
  cancelAnimationFrame(el._raf);
  if (from === to || matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to); return; }
  const t0 = performance.now(), dur = 450;
  const step = now => {
    const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(k < 1 ? from + (to - from) * e : to);
    if (k < 1) el._raf = requestAnimationFrame(step);
  };
  el._raf = requestAnimationFrame(step);
}
/* user data shape (rates = daily-allowance history for the rollover balance) */
const mkData = o => ({
  tx: o.tx || [], budget: o.budget || 0, seq: o.seq || 1,
  rates: Array.isArray(o.rates) ? o.rates : [],
  weekStart: Number.isInteger(o.weekStart) ? o.weekStart : 6
});
function lsGet(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast('Could not save — browser storage is blocked.', true); } }

/* =========================================================
   Auth (Firebase: Google + email/password)
========================================================= */
let currentUser = null;      // {uid, name, email}
let cache = null;            // the signed-in user's data, mirrored from Firestore
let justSignedIn = null;     // 'new' | 'back' -> decides which welcome toast to show

const modal = $('authModal');
let authMode = 'login';
function openAuth(mode, msg) {
  authMode = mode;
  $('authError').className = 'form-error';
  $('authForm').reset();
  const signup = mode === 'signup';
  $('nameField').style.display = signup ? '' : 'none';
  $('confirmField').style.display = signup ? '' : 'none';
  $('aPass').autocomplete = signup ? 'new-password' : 'current-password';
  $('authTitle').textContent = signup ? 'Create your account' : 'Welcome back';
  $('authSub').textContent = msg || (signup ? 'Start tracking your money in EGP — it takes 30 seconds.' : 'Log in to see your money.');
  $('authSubmit').textContent = signup ? 'Create account' : 'Log in';
  $('authSwitch').innerHTML = signup
    ? 'Already have an account? <a id="swLink">Log in</a>'
    : "Don't have an account? <a id=\"swLink\">Sign up</a>";
  $('swLink').onclick = () => openAuth(signup ? 'login' : 'signup');
  modal.classList.add('open');
  setTimeout(() => (signup ? $('aName') : $('aEmail')).focus(), 50);
}
function closeAuth() { modal.classList.remove('open'); }
function authError(msg) { const e = $('authError'); e.textContent = msg; e.className = 'form-error show'; }

document.querySelectorAll('[data-auth]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  openAuth(a.dataset.auth);
}));
$('authClose').onclick = closeAuth;
modal.addEventListener('mousedown', e => { if (e.target === modal) closeAuth(); });
addEventListener('keydown', e => { if (e.key === 'Escape') closeAuth(); });
$('pwToggle').onclick = () => {
  const p = $('aPass'), show = p.type === 'password';
  p.type = show ? 'text' : 'password';
  $('pwToggle').textContent = show ? 'Hide' : 'Show';
};

function fbMessage(err) {
  switch (err && err.code) {
    case 'auth/email-already-in-use': return 'This email is already registered. Try logging in.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/weak-password': return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials': return 'Wrong email or password.';
    case 'auth/too-many-requests': return 'Too many attempts. Please wait a bit and try again.';
    case 'auth/network-request-failed': return 'Network error. Check your internet connection.';
    case 'auth/operation-not-allowed': return 'This sign-in method is not enabled yet in the Firebase console.';
    case 'auth/unauthorized-domain': return 'This domain is not authorized. Add it in Firebase → Authentication → Settings → Authorized domains.';
    default: return (err && err.message) || 'Something went wrong. Please try again.';
  }
}

$('authForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = $('aEmail').value.trim().toLowerCase();
  const pass = $('aPass').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return authError('Please enter a valid email address.');
  if (pass.length < 6) return authError('Password must be at least 6 characters.');
  const btn = $('authSubmit'); btn.disabled = true;
  try {
    if (authMode === 'signup') {
      const name = $('aName').value.trim();
      if (name.length < 2) { btn.disabled = false; return authError('Please enter your name.'); }
      if (pass !== $('aConfirm').value) { btn.disabled = false; return authError("Passwords don't match."); }
      justSignedIn = 'new';
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, {displayName: name});
      currentUser && (currentUser.name = name);
    } else {
      justSignedIn = 'back';
      await signInWithEmailAndPassword(auth, email, pass);
    }
  } catch (err) {
    justSignedIn = null;
    authError(fbMessage(err));
  } finally { btn.disabled = false; }
});

$('googleBtn').addEventListener('click', async () => {
  const btn = $('googleBtn'); btn.disabled = true;
  justSignedIn = 'back';
  try {
    if (isNative) {
      /* phone: native Google account picker, then hand the token to Firebase JS */
      const res = await FirebaseAuthentication.signInWithGoogle({skipNativeAuth: true});
      const cred = GoogleAuthProvider.credential(res.credential && res.credential.idToken);
      await signInWithCredential(auth, cred);
    } else {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt: 'select_account'});
      await signInWithPopup(auth, provider);
    }
  } catch (err) {
    justSignedIn = null;
    if (!isNative && err.code === 'auth/popup-blocked') {
      try { await signInWithRedirect(auth, new GoogleAuthProvider()); return; } catch (e2) { err = e2; }
    }
    const msg = String((err && (err.code || err.message)) || '');
    if (!/popup-closed-by-user|cancelled-popup-request|canceled|cancelled/i.test(msg)) authError(fbMessage(err));
  } finally { btn.disabled = false; }
});

/* ---- cloud data (Firestore: users/{uid}) ---- */
const userRef = uid => doc(db, 'users', uid);
async function loadCloud(u) {
  const snap = await getDoc(userRef(u.uid));
  if (snap.exists()) {
    const d = snap.data();
    cache = mkData(d);
    return;
  }
  /* first time in the cloud: bring over any data saved earlier on this device */
  const old = lsGet('mt_data_' + (u.email || '').toLowerCase(), null);
  cache = mkData(old && old.tx ? old : {});
  await setDoc(userRef(u.uid), {name: u.name, email: u.email, ...cache, createdAt: serverTimestamp(), updatedAt: serverTimestamp()});
  if (old && old.tx && old.tx.length) setTimeout(() => toast('Your earlier data from this device was imported ✅'), 1500);
}

onAuthStateChanged(auth, async user => {
  if (!user) { cache = null; return leaveApp(); }
  const email = user.email || '';
  currentUser = {uid: user.uid, email, name: user.displayName || email.split('@')[0] || 'Friend', photo: user.photoURL || ''};
  try {
    await loadCloud(currentUser);
  } catch (err) {
    console.error(err);
    const hint = err.code === 'permission-denied' ? 'Firestore rules are blocking access — publish the rules from firestore.rules.'
      : (err.code === 'not-found' || err.code === 'failed-precondition') ? 'Firestore database is not created yet — create it in the Firebase console.'
      : 'Check your connection. (' + (err.code || err.message) + ')';
    toast('Could not load your data. ' + hint, true);
    try { await signOut(auth); } catch (e) {}
    return;
  }
  closeAuth();
  enterApp(justSignedIn);
  justSignedIn = null;
});

function enterApp(kind) {
  const u = currentUser; if (!u) return leaveApp();
  document.body.classList.add('authed');
  $('logoutBtn').style.display = '';
  const first = u.name.split(' ')[0];
  $('navName').textContent = first;
  $('appName').textContent = first;
  const av = $('navAvatar');
  if (u.photo) {
    av.textContent = '';
    const img = document.createElement('img');
    img.src = u.photo; img.alt = u.name; img.referrerPolicy = 'no-referrer';
    img.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover';
    av.appendChild(img);
  } else av.textContent = u.name.trim()[0].toUpperCase();
  $('appDate').textContent = new Date().toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
  $('fDate').value = isoDate(new Date());
  $('rlFrom').value = $('rlFrom').max = isoDate(new Date());
  $('rlAmount').dataset.dirty = '';
  $('fMonth').dataset.touched = '';
  setType('expense');
  render();
  scrollTo(0, 0);
  if (kind === 'new') toast('Account created. Welcome! 🎉');
  else if (kind === 'back') toast('Logged in successfully ✅');
}
function leaveApp() {
  currentUser = null;
  document.body.classList.remove('authed');
  $('logoutBtn').style.display = 'none';
  scrollTo(0, 0);
}
$('logoutBtn').onclick = async () => {
  try { await signOut(auth); } catch (e) {}
  toast('Logged out');
};
$('logoLink').addEventListener('click', () => { if (currentUser) scrollTo({top: 0, behavior: 'smooth'}); });

/* =========================================================
   Data (per user)
========================================================= */
const loadData = () => cache || mkData({});
function saveData(d) {
  cache = d;                         // UI updates instantly...
  if (!currentUser) return;
  setDoc(userRef(currentUser.uid), {      // ...and Firestore is updated in the background
    name: currentUser.name, email: currentUser.email,
    tx: d.tx, budget: d.budget, seq: d.seq, rates: d.rates || [], weekStart: Number.isInteger(d.weekStart) ? d.weekStart : 6,
    updatedAt: serverTimestamp()
  }, {merge: true}).catch(err => {
    console.error(err);
    toast('Could not save to the cloud. Check your connection.', true);
  });
}
const SIGN = {income: 1, deposit: 1, expense: -1, withdraw: -1, transfer: -1};
const EXP_CATS = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];
const CAT_COLORS = {'Food & Dining': '#3b82f6', 'Transport': '#a855f7', 'Shopping': '#14e6b0', 'Entertainment': '#f59e0b', 'Bills': '#ef4444', 'Other': '#facc15'};
const INC_CATS = ['Salary', 'Freelance', 'Gift', 'Other'];
const METHODS = ['Visa', 'Meeza', 'Vodafone Cash', 'InstaPay', 'Fawry', 'Bank account'];
const TYPE_META = {
  expense: {label: 'Expense', color: '#e5384a', icon: '−'},
  income: {label: 'Income', color: '#14c996', icon: '+'},
  deposit: {label: 'Deposit', color: '#3b82f6', icon: '↓'},
  withdraw: {label: 'Withdraw', color: '#f59e0b', icon: '↑'},
  transfer: {label: 'Transfer', color: '#0ea5a4', icon: '⇄'}
};

/* ---- add form ---- */
let curType = 'expense';
function setType(t) {
  curType = t;
  [...$('typeTabs').children].forEach(b => b.classList.toggle('on', b.dataset.t === t));
  const cats = t === 'expense' ? EXP_CATS : t === 'income' ? INC_CATS : METHODS;
  $('fCatLabel').textContent = (t === 'expense' || t === 'income') ? 'Category' : 'Method';
  $('fCat').innerHTML = cats.map(c => `<option>${esc(c)}</option>`).join('');
  $('txError').className = 'form-error';
}
$('typeTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setType(b.dataset.t); });

$('txForm').addEventListener('submit', e => {
  e.preventDefault();
  const amount = Math.round(parseFloat($('fAmount').value) * 100) / 100;
  const date = $('fDate').value;
  const err = $('txError');
  if (!(amount > 0)) { err.textContent = 'Enter an amount greater than zero.'; err.className = 'form-error show'; return; }
  if (!date) { err.textContent = 'Pick a date.'; err.className = 'form-error show'; return; }
  const d = loadData();
  if (SIGN[curType] < 0 && (curType === 'withdraw' || curType === 'transfer')) {
    const bal = d.tx.reduce((s, t) => s + SIGN[t.type] * t.amount, 0);
    if (amount > bal) { err.textContent = `Not enough balance. You have ${egp(bal)}.`; err.className = 'form-error show'; return; }
  }
  d.tx.push({
    id: d.seq++, date, type: curType, cat: $('fCat').value,
    desc: $('fDesc').value.trim() || TYPE_META[curType].label, amount
  });
  saveData(d);
  $('fAmount').value = ''; $('fDesc').value = '';
  err.className = 'form-error';
  render();
  toast(`${TYPE_META[curType].label} of ${egp(amount)} added ✅`);
});

/* ---- budget ---- */
$('saveBudget').onclick = () => {
  const v = parseFloat($('budgetInput').value);
  if (!(v >= 0)) return toast('Enter a valid budget amount.', true);
  const d = loadData(); d.budget = v; saveData(d); render();
  toast('Budget saved ✅');
};

/* ---- filters ---- */
['fSearch', 'fType', 'fMonth'].forEach(id => $(id).addEventListener('input', () => { if (id === 'fMonth') $('fMonth').dataset.touched = '1'; renderTable(); }));

/* ---- delete / reset / sample / export ---- */
$('txBody').addEventListener('click', e => {
  const b = e.target.closest('.del'); if (!b) return;
  const d = loadData(), id = Number(b.dataset.id);
  const removed = d.tx.find(t => t.id === id); if (!removed) return;
  d.tx = d.tx.filter(t => t.id !== id); saveData(d); render();
  toast('Transaction deleted', false, {label: 'Undo', run: () => {
    const cur = loadData();
    if (cur.tx.some(t => t.id === removed.id)) return;
    cur.tx.push(removed); saveData(cur); render(); toast('Transaction restored ✅');
  }});
});
$('resetBtn').onclick = () => {
  if (!confirm('Delete ALL your transactions and budget? This cannot be undone.')) return;
  saveData(mkData({weekStart: loadData().weekStart})); render(); toast('All data cleared');
};
$('sampleBtn').onclick = () => {
  const d = loadData(); const now = new Date();
  const day = (mAgo, dd) => { const x = new Date(now.getFullYear(), now.getMonth() - mAgo, dd); return isoDate(x > now ? now : x); };
  const rows = [];
  for (let m = 5; m >= 0; m--) {
    rows.push(['income', 'Salary', 'Monthly salary', 15000, day(m, 1)]);
    rows.push(['expense', 'Bills', 'Electricity & internet', 700 + (m * 37) % 200, day(m, 5)]);
    rows.push(['expense', 'Food & Dining', 'Groceries', 2200 + (m * 211) % 700, day(m, 8)]);
    rows.push(['expense', 'Transport', 'Uber & fuel', 900 + (m * 97) % 400, day(m, 12)]);
    rows.push(['expense', 'Shopping', 'Clothes', 800 + (m * 313) % 1200, day(m, 16)]);
    rows.push(['expense', 'Entertainment', 'Netflix & cinema', 199 + (m * 53) % 300, day(m, 20)]);
    rows.push(['expense', 'Food & Dining', 'Restaurants', 600 + (m * 71) % 500, day(m, 24)]);
  }
  rows.forEach(r => d.tx.push({id: d.seq++, type: r[0], cat: r[1], desc: r[2], amount: r[3], date: r[4]}));
  if (!d.budget) d.budget = 12000;
  if (!d.rates.length) d.rates = [{from: day(0, 1), amount: Math.round(d.budget / 30)}];
  saveData(d); render(); toast('Sample data loaded');
};
$('exportBtn').onclick = async () => {
  const d = loadData();
  if (!d.tx.length) return toast('Nothing to export yet.', true);
  const q = s => '"' + String(s).replace(/"/g, '""') + '"';
  const lines = ['Date,Type,Category,Description,Amount (EGP)'].concat(
    d.tx.slice().sort((a, b) => a.date.localeCompare(b.date)).map(t => [t.date, t.type, q(t.cat), q(t.desc), (SIGN[t.type] * t.amount).toFixed(2)].join(',')));
  const csv = '\ufeff' + lines.join('\n');
  if (isNative) {
    try {
      const file = await Filesystem.writeFile({path: 'money-tracker.csv', data: csv, directory: Directory.Cache, encoding: Encoding.UTF8});
      await Share.share({title: 'Money Tracker', text: 'Money Tracker export', url: file.uri, dialogTitle: 'Export transactions'});
    } catch (e) { if (!/cancel/i.test(String(e && e.message))) toast('Could not export the file.', true); }
    return;
  }
  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'money-tracker.csv'; a.click(); URL.revokeObjectURL(a.href);
};

/* =========================================================
   Rendering
========================================================= */
function render() {
  if (!currentUser) return;
  const d = loadData();
  const now = new Date(), cur = ymOf(isoDate(now));
  const balance = d.tx.reduce((s, t) => s + SIGN[t.type] * t.amount, 0);
  const inc = d.tx.filter(t => t.type === 'income' && ymOf(t.date) === cur).reduce((s, t) => s + t.amount, 0);
  const exp = d.tx.filter(t => t.type === 'expense' && ymOf(t.date) === cur).reduce((s, t) => s + t.amount, 0);
  const left = d.budget - exp;

  setMoney($('stBalance'), balance, egp);
  $('stBalance').className = balance < 0 ? 'neg' : '';
  setMoney($('stIncome'), inc, egp);
  setMoney($('stExpense'), exp, egp);
  $('stLeft').textContent = d.budget ? egp(left) : '—';
  $('stLeft').className = d.budget && left < 0 ? 'neg' : '';

  /* budget */
  $('budgetInput').value = d.budget || '';
  $('bgSpent').textContent = egp0(exp) + ' spent';
  $('bgTotal').textContent = 'of ' + egp0(d.budget);
  const pct = d.budget ? Math.min(100, exp / d.budget * 100) : 0;
  $('bgBar').firstElementChild.style.width = pct + '%';
  $('bgBar').classList.toggle('over', d.budget > 0 && exp > d.budget);
  $('bgNote').textContent = !d.budget ? 'Set a monthly budget to track your spending.'
    : exp > d.budget ? `⚠ You are over budget by ${egp0(exp - d.budget)}.`
    : `${Math.round(pct)}% used — ${egp0(left)} left this month.`;

  /* donut */
  const byCat = {}; d.tx.filter(t => t.type === 'expense' && ymOf(t.date) === cur).forEach(t => byCat[t.cat] = (byCat[t.cat] || 0) + t.amount);
  const cats = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]);
  $('donutTotal').textContent = Math.round(exp).toLocaleString('en-US');
  if (!cats.length) {
    $('bigDonut').style.background = '#16303f';
    $('bigLegend').innerHTML = '<li class="muted">No expenses this month yet.</li>';
  } else {
    let acc = 0, stops = [];
    cats.forEach(c => { const p = byCat[c] / exp * 100; stops.push(`${CAT_COLORS[c] || '#888'} ${acc}% ${acc + p}%`); acc += p; });
    $('bigDonut').style.background = `conic-gradient(${stops.join(',')})`;
    $('bigLegend').innerHTML = cats.map(c => `<li><i style="background:${CAT_COLORS[c] || '#888'}"></i>${esc(c)}<span>${Math.round(byCat[c] / exp * 100)}%</span></li>`).join('');
  }

  /* last 6 months */
  const months = [];
  for (let i = 5; i >= 0; i--) { const x = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push(x.getFullYear() + '-' + pad(x.getMonth() + 1)); }
  const totals = months.map(m => d.tx.filter(t => t.type === 'expense' && ymOf(t.date) === m).reduce((s, t) => s + t.amount, 0));
  const max = Math.max(...totals, 1);
  $('monthBars').innerHTML = months.map((m, i) =>
    `<div title="${monthLabel(m)}: ${egp0(totals[i])}"><span>${totals[i] ? Math.round(totals[i] / 1000 * 10) / 10 + 'k' : ''}</span><i style="height:${totals[i] / max * 100}%"></i><span>${new Date(m + '-01T00:00:00').toLocaleDateString('en-GB', {month: 'short'})}</span></div>`).join('');

  /* month filter options */
  const fm = $('fMonth'), keep = fm.value;
  const allM = [...new Set(d.tx.map(t => ymOf(t.date)).concat([cur]))].sort().reverse();
  fm.innerHTML = '<option value="all">All months</option>' + allM.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
  fm.value = allM.includes(keep) || keep === 'all' ? keep : 'all';

  renderRollover(d, now);
  renderTable();
}

/* =========================================================
   Rollover balance: day -> week -> month -> year
========================================================= */
const shortDay = ds => new Date(ds + 'T00:00:00').toLocaleDateString('en-GB', {weekday: 'short', day: 'numeric', month: 'short'});
function rlErr(msg) { const e = $('rlError'); e.textContent = msg; e.className = 'form-error' + (msg ? ' show' : ''); }

function renderRollover(d, now) {
  const r = computeRollover(d, now);
  if (document.activeElement !== $('rlWeekStart')) $('rlWeekStart').value = String(d.weekStart);
  const amtEl = $('rlAmount');
  if (document.activeElement !== amtEl && !amtEl.dataset.dirty) amtEl.value = r ? r.allowance : '';
  $('rlOff').style.display = d.rates.length ? '' : 'none';

  if (!r) {
    ['rlDay', 'rlWeek', 'rlMonth', 'rlYear', 'rlTotal'].forEach(id => { const el = $(id); cancelAnimationFrame(el._raf); el._v = null; el.textContent = '—'; el.className = ''; });
    $('rlDayNote').textContent = 'Set a daily allowance to start — no top-ups needed.';
    ['rlWeekNote', 'rlMonthNote', 'rlYearNote'].forEach(id => $(id).textContent = '');
    $('rlBars').innerHTML = '<div class="muted" style="justify-content:center">Your last 7 days will show up here.</div>';
    return;
  }
  const money = (id, v) => { setMoney($(id), v, egp); $(id).className = v < 0 ? 'neg' : ''; };
  money('rlDay', r.daily); money('rlWeek', r.week); money('rlMonth', r.month); money('rlYear', r.year); money('rlTotal', r.total);
  $('rlDayNote').textContent = r.daily >= 0
    ? `of ${egp0(r.allowance)} · rolls into your week at midnight`
    : `${egp0(-r.daily)} over today · comes out of your week at midnight`;
  $('rlWeekNote').textContent = 'Rolls into the month after ' + shortDay(r.weekRollsOn);
  $('rlMonthNote').textContent = 'Rolls into the year after ' + shortDay(r.monthRollsOn);
  $('rlYearNote').textContent = 'Carries over, year after year';

  const max = Math.max(...r.last7.map(x => Math.abs(x.net)), 1);
  $('rlBars').innerHTML = r.last7.map((x, i) =>
    `<div class="${i === r.last7.length - 1 ? 'today' : ''}" title="${prettyDate(x.date)}: ${egp(x.net, true)}"><span>${x.net === 0 ? '0' : (x.net > 0 ? '+' : '−') + Math.round(Math.abs(x.net))}</span><i class="${x.net < 0 ? 'neg' : ''}" style="height:${Math.abs(x.net) / max * 100}%"></i><span>${new Date(x.date + 'T00:00:00').toLocaleDateString('en-GB', {weekday: 'short'})}</span></div>`).join('');
}

$('rlAmount').addEventListener('input', () => { $('rlAmount').dataset.dirty = '1'; rlErr(''); });
$('rlAmount').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('rlSave').click(); } });
$('rlUseBudget').onclick = () => {
  const d = loadData();
  if (!(d.budget > 0)) return rlErr('Set a monthly budget first — then it can be divided by the days in the month.');
  const n = new Date(), days = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
  $('rlAmount').value = Math.max(1, Math.round(d.budget / days));
  $('rlAmount').dataset.dirty = '1'; rlErr('');
};
$('rlWeekStart').onchange = () => {
  const d = loadData(); d.weekStart = Number($('rlWeekStart').value); saveData(d); render();
  toast('Week now starts on ' + $('rlWeekStart').selectedOptions[0].textContent);
};
$('rlSave').onclick = () => {
  const amount = Math.round(parseFloat($('rlAmount').value) * 100) / 100;
  const today = isoDate(new Date()), from = $('rlFrom').value || today;
  if (!(amount > 0)) return rlErr('Enter a daily allowance greater than zero.');
  if (from > today) return rlErr("The start date can't be in the future.");
  const d = loadData(), last = d.rates[d.rates.length - 1];
  if (last && from < last.from) return rlErr('Pick a date on or after ' + prettyDate(last.from) + ' — earlier days keep their old allowance.');
  d.weekStart = Number($('rlWeekStart').value);
  d.rates = last && last.from === from ? d.rates.slice(0, -1).concat([{from, amount}]) : d.rates.concat([{from, amount}]);
  saveData(d);
  $('rlAmount').dataset.dirty = ''; $('rlFrom').value = today; rlErr('');
  render();
  toast('Daily allowance set to ' + egp0(amount) + ' ✅');
};
$('rlOff').onclick = () => {
  const d = loadData(); if (!d.rates.length) return;
  const prev = d.rates; d.rates = []; saveData(d); $('rlAmount').dataset.dirty = ''; render();
  toast('Rollover turned off', false, {label: 'Undo', run: () => { const c = loadData(); c.rates = prev; saveData(c); render(); toast('Rollover restored ✅'); }});
};

function renderTable() {
  const d = loadData();
  const q = $('fSearch').value.trim().toLowerCase(), ft = $('fType').value, fm = $('fMonth').value;
  const rows = d.tx.filter(t =>
    (ft === 'all' || t.type === ft) && (fm === 'all' || ymOf(t.date) === fm) &&
    (!q || (t.desc + ' ' + t.cat).toLowerCase().includes(q)))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  $('txBody').innerHTML = rows.map(t => {
    const m = TYPE_META[t.type], s = SIGN[t.type] * t.amount;
    return `<tr><td>${prettyDate(t.date)}</td>
      <td><span class="type"><i style="background:${m.color}">${m.icon}</i>${m.label}</span></td>
      <td>${esc(t.cat)}</td><td>${esc(t.desc)}</td>
      <td class="${s < 0 ? 'neg' : 'pos'}">${egp(s, true)}</td>
      <td><button class="del" data-id="${t.id}" title="Delete" aria-label="Delete">🗑</button></td></tr>`;
  }).join('');
  const none = rows.length === 0;
  $('txEmpty').style.display = none ? '' : 'none';
  $('txBody').closest('table').style.display = none ? 'none' : '';
  if (none) {
    const filtered = d.tx.length > 0;
    $('txEmptyMsg').textContent = filtered ? 'No transactions match your filters.' : 'No transactions yet — add your first one on the left.';
    $('sampleBtn').style.display = filtered ? 'none' : '';
  }
}

/* =========================================================
   Landing page: theme, menu, demo box, demo rows, reveal
========================================================= */
const burger = $('burger'), links = $('navLinks');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

const themeBtn = $('themeBtn');
function applyTheme(light) {
  const r = document.documentElement.style;
  if (light) {
    r.setProperty('--bg', '#f3f7f9'); r.setProperty('--bg2', '#e8eff3'); r.setProperty('--card', '#ffffff');
    r.setProperty('--text', '#0b1a25'); r.setProperty('--muted', '#5b6f7c'); r.setProperty('--line', 'rgba(0,0,0,.1)');
    themeBtn.textContent = '☾';
  } else {
    ['--bg', '--bg2', '--card', '--text', '--muted', '--line'].forEach(v => r.removeProperty(v));
    themeBtn.textContent = '☀';
  }
}
let light = lsGet('mt_light', false);
applyTheme(light);
themeBtn.addEventListener('click', () => { light = !light; lsSet('mt_light', light); applyTheme(light); });

/* demo table (sample rows, dates relative to today) */
(function () {
  const rel = n => { const x = new Date(); x.setDate(x.getDate() - n); return prettyDate(isoDate(x)); };
  const rows = [
    [1, '#e5384a', 'N', 'Expense', 'Netflix Subscription', -199],
    [2, '#14c996', '£', 'Income', 'Salary', 12000],
    [3, '#f59e0b', '🛒', 'Expense', 'Grocery', -450],
    [5, '#0ea5a4', '⇄', 'Transfer', 'Bank Transfer', -2000],
    [7, '#e5384a', 'U', 'Expense', 'Uber', -85]
  ];
  $('demoRows').innerHTML = rows.map(r => `<tr><td>${rel(r[0])}</td><td><span class="type"><i style="background:${r[1]}">${r[2]}</i>${r[3]}</span></td><td>${r[4]}</td><td class="${r[5] < 0 ? 'neg' : 'pos'}">${egp(r[5], true)}</td><td><span class="status">Completed</span></td><td class="dots">⋮</td></tr>`).join('');
})();

/* landing rollover demo */
const seg = $('seg'), chips = $('chips'), amt = $('amt'), okTitle = $('okTitle'), okAmt = $('okAmt'), okNote = $('okNote'), payBtn = $('payBtn');
const PERIODS = {
  Daily:   {days: 1,   title: 'Your daily allowance',   ok: 'Daily balance',   note: 'Unspent money rolls into<br>your weekly balance'},
  Weekly:  {days: 7,   title: 'Your weekly balance',    ok: 'Weekly balance',  note: 'Unspent weeks roll into<br>your monthly balance'},
  Monthly: {days: 30,  title: 'Your monthly balance',   ok: 'Monthly balance', note: 'Unspent months roll into<br>your annual balance'},
  Annual:  {days: 365, title: 'Your annual balance',    ok: 'Annual balance',  note: 'Your savings keep<br>growing year after year'}
};
let mode = 'Daily';
function refresh() {
  const p = PERIODS[mode], v = Number(amt.value) || 0;
  okAmt.textContent = egp(v * p.days);
  okTitle.textContent = p.ok;
  okNote.innerHTML = p.note;
  $('boxTitle').textContent = p.title + (p.days > 1 ? ' if you save it all' : '');
  [...chips.children].forEach(b => b.classList.toggle('on', b.dataset.v === String(amt.value)));
}
seg.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  [...seg.children].forEach(x => x.classList.remove('on')); b.classList.add('on');
  mode = b.dataset.mode; refresh();
});
chips.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  amt.value = b.dataset.v; refresh();
});
amt.addEventListener('input', refresh);
payBtn.addEventListener('click', () => {
  if (!(Number(amt.value) > 0)) { amt.focus(); return; }
  openAuth('signup', 'Create a free account to start your ' + egp0(amt.value) + ' a day rollover balance.');
});
refresh();

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* active nav link on scroll */
const secs = ['home', 'features', 'about', 'pricing', 'contact'].map(id => $(id));
addEventListener('scroll', () => {
  if (currentUser) return;
  let cur = 'home';
  secs.forEach(s => { if (s && scrollY >= s.offsetTop - 120) cur = s.id; });
  links.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

