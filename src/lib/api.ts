const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('booknook_token');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export { API_BASE };

