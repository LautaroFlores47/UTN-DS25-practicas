import { useState } from 'react';
import { login } from '../auth/api';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@demo.com');
    const [password, setPassword] = useState('Admin1234');
    const [msg, setMsg] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setMsg('');
        try {
        const user = await login(email, password);
        setMsg(`Bienvenido ${user.name || user.email}`);
        setTimeout(() => { window.location.href = '/'; }, 600);
        } catch (err) {
        setMsg(err.message || 'Error de login');
        }
    }

    return (
        <div style={{ maxWidth: 380, margin: '0 auto' }}>
        <h2>Login</h2>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{ padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{ padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
            <button type="submit" style={{ padding:10, borderRadius:8 }}>Ingresar</button>
            {msg && <div style={{ color: '#555' }}>{msg}</div>}
            <div style={{ marginTop: 6 }}>
            ¿No tenés cuenta? <a href="/register">Registrate</a>
            </div>
        </form>
        </div>
    );
}
