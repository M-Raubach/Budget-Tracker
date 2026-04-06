const API_BASE = "http://localhost:3000/api";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`GET failed: ${path}`);
  }
  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `POST failed: ${path}`);
  }
  return data;
}

export function loginUser(credentials) {
  return apiPost("/auth/login", credentials);
}

export function getDashboardSummary(userId) {
  return apiGet(`/dashboard/summary?userId=${userId}`);
}

export function createTransaction(payload) {
  return apiPost("/transactions", payload);
}

export function getMonthlyReport(userId, month) {
  return apiGet(`/reports/monthly?userId=${userId}&month=${month}`);
}
