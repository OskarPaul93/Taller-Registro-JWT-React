import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.Config';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setMensajeError('');
    setCargando(true);

    const usuario = {
      username: username,
      password: password
    };

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        }
      );

      const datos = await respuesta.json();

      if (respuesta.ok) {

        localStorage.setItem('token', datos.token);
        localStorage.setItem('username', datos.username);
        localStorage.setItem('rol', datos.rol);
        localStorage.setItem('id', datos.id);

        navigate('/');

      } else {
        setMensajeError(
          datos.error || datos.mensaje || 'Credenciales incorrectas'
        );
      }

    } catch (error) {
      setMensajeError(
        'No se pudo conectar con el servidor.'
      );

      console.error('Error al iniciar sesión:', error);

    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">

      <h1>Iniciar Sesión</h1>

      <form onSubmit={iniciarSesion}>

        <div>
          <label>Nombre de usuario</label>

          <input
            type="text"
            name="username"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>

          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

      </form>

      {mensajeError && (
        <p className="mensaje-error">
          {mensajeError}
        </p>
      )}

      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/registrar">
          Regístrate aquí
        </Link>
      </p>

    </div>
  );
}

export default Login;
