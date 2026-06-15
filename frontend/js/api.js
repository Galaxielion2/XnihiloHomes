const API_BASE_URL = "";

async function apiRequest(path, options = {}) {
  const response = await fetch(API_BASE_URL + path, options);
  let data = null;
  try { data = await response.json(); } catch (_) { data = {}; }
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

function apiGet(path) { return apiRequest(path); }
function apiPost(path, data) { return apiRequest(path, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)}); }
function apiPut(path, data) { return apiRequest(path, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)}); }
function apiDelete(path) { return apiRequest(path, {method:"DELETE"}); }
