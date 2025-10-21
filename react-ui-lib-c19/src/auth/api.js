export function getToken() {
    return localStorage.getItem('token') || '';
    }
    export function setToken(token) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    }
    export function getUser() {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); }
    catch { return null; }
    }
    export function setUser(user) {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    }

    export async function login(email, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
    });
    const json = await res.json().catch(()=> ({}));
    if (!res.ok || !json?.success) throw new Error(json?.message || 'Credenciales inválidas');

    setToken(json.data.token);
    setUser(json.data.user);
    return json.data.user;
}

export async function register(name, email, password) {
    const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    const json = await res.json().catch(()=> ({}));
    if (!res.ok || !json?.success) throw new Error(json?.message || 'No se pudo registrar');

    setToken(json.data.token);
    setUser(json.data.user);
    return json.data.user;
}

export async function authFetch(url, options = {}) {
    const token = getToken();
    const headers = {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
    return fetch(url, { ...options, headers });
}

export function logout() {
    setToken('');
    setUser(null);
    window.location.href = '/';
}
