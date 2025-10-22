import { useState } from 'react';
import { register } from '../auth/api';

export default function RegisterPage() {
    const [name, setName] = useState('Usuario');
    const [email, setEmail] = useState('user@demo.com');
    const [password, setPassword] = useState('User123456');
    const [msg, setMsg] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setMsg('');
        try {
        const user = await register(name, email, password);
        setMsg(`¡Registro OK! Hola ${user.name}`);
        setTimeout(() => { window.location.href = '/catalog'; }, 600);
        } catch (err) {
        setMsg(err.message || 'Error de registro');
        }
    }

    return (
        <div style={{ maxWidth: 380, margin: '40px auto' }}>
        <h2>Registro</h2>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <input type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} required style={{ padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{ padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
            <input type="password" placeholder="Password (min 8, 1 mayúscula y 1 número)" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{ padding:10, borderRadius:8, border:'1px solid #ccc' }}/>
            <button type="submit" style={{ padding:10, borderRadius:8 }}>Crear cuenta</button>
            {msg && <div style={{ color: '#555' }}>{msg}</div>}
            <div style={{ marginTop: 6 }}>
            ¿Ya tenés cuenta? <a href="/">Iniciá sesión</a>
            </div>
        </form>
        </div>
    );
}
