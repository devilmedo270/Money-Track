/* =========================================================
   Rollover balance engine
   Daily allowance  ->  weekly  ->  monthly  ->  annual

   - Every day you receive your daily allowance (no top-ups, nothing is
     written automatically: everything is derived from your transactions).
   - What you don't spend today rolls into your WEEK at midnight.
   - When the week ends (or the month ends, whichever is first) the week rolls into the MONTH.
   - When the month ends the month rolls into the YEAR (annual balance carries on year after year).
   - Overspending makes a day negative, so it is taken from the balances above it.
   ========================================================= */

const pad = n => String(n).padStart(2, '0');
const isoDate = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const parse = s => new Date(s + 'T00:00:00');
const nextDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
const toCents = v => Math.round((Number(v) || 0) * 100);
const fromCents = c => c / 100;

/**
 * @param {{tx:Array, rates:Array<{from:string,amount:number}>, weekStart:number}} d
 * @param {Date} now
 * @returns {null | {daily,week,month,year,total,allowance,start,last7,weekRollsOn,monthRollsOn}}
 */
export function computeRollover(d, now = new Date()) {
  const rates = (d.rates || []).filter(r => r && r.from && r.amount > 0)
    .slice().sort((a, b) => a.from.localeCompare(b.from));
  if (!rates.length) return null;

  const today = parse(isoDate(now));
  const start = parse(rates[0].from);
  if (start > today) return null;                       // starts in the future

  const weekStart = Number.isInteger(d.weekStart) ? d.weekStart : 6;
  const weekEnd = (weekStart + 6) % 7;

  const spent = {};                                     // cents spent per day (expenses only)
  (d.tx || []).forEach(t => { if (t.type === 'expense') spent[t.date] = (spent[t.date] || 0) + toCents(t.amount); });

  let ri = 0;
  const rateOn = ds => { while (ri + 1 < rates.length && rates[ri + 1].from <= ds) ri++; return toCents(rates[ri].amount); };

  let week = 0, month = 0, year = 0;
  const nets = [];                                      // {date, net} in cents, completed days + today

  for (let day = start; day < today; day = nextDay(day)) {
    const ds = isoDate(day);
    const net = rateOn(ds) - (spent[ds] || 0);
    nets.push({date: ds, net});
    week += net;
    const monthEnds = nextDay(day).getDate() === 1;
    if (day.getDay() === weekEnd || monthEnds) { month += week; week = 0; }
    if (monthEnds) { year += month; month = 0; }
  }

  const todayStr = isoDate(today);
  const allowance = rateOn(todayStr);
  const daily = allowance - (spent[todayStr] || 0);
  nets.push({date: todayStr, net: daily});

  /* when will the week / month next roll up? */
  let weekRollsOn = null, monthRollsOn = null;
  for (let day = today, i = 0; i < 40 && (!weekRollsOn || !monthRollsOn); day = nextDay(day), i++) {
    const monthEnds = nextDay(day).getDate() === 1;
    if (!weekRollsOn && (day.getDay() === weekEnd || monthEnds)) weekRollsOn = isoDate(day);
    if (!monthRollsOn && monthEnds) monthRollsOn = isoDate(day);
  }

  return {
    daily: fromCents(daily),
    week: fromCents(week),
    month: fromCents(month),
    year: fromCents(year),
    total: fromCents(daily + week + month + year),
    allowance: fromCents(allowance),
    start: rates[0].from,
    last7: nets.slice(-7).map(n => ({date: n.date, net: fromCents(n.net)})),
    weekRollsOn,
    monthRollsOn
  };
}
