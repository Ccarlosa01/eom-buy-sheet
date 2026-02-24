// ✅ Set this to your Worker base:
const API_BASE = "https://eom-internal-buy-sheet.anthonycr2001.workers.dev/api";

function $(id){ return document.getElementById(id); }

function saveToken(token){ localStorage.setItem("token", token); }
function getToken(){ return localStorage.getItem("token") || ""; }
function clearToken(){ localStorage.removeItem("token"); localStorage.removeItem("user"); }

function saveUser(user){ localStorage.setItem("user", JSON.stringify(user)); }
function getUser(){ try { return JSON.parse(localStorage.getItem("user")||"null"); } catch { return null; } }

async function apiPost(path, body, auth=true){
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const t = getToken();
    if (t) headers["Authorization"] = "Bearer " + t;
  }
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers,
    body: JSON.stringify(body || {})
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Request failed");
  return data;
}

function fmtMoney(n){
  const x = Number(n);
  if (!isFinite(x)) return "";
  return x.toFixed(2);
}

function normalizeUsername(s){
  return String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
}
