
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.Config';


function Registrar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('USER');

  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);

  const registrarUsuario = async (e) => {
    e.preventDefault();

    setMensajeExito('');
    setMensajeError('');
    setCargando(true);

    const usuario = {
      username: username,
      password: password,
      rol: rol
    };

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/auth/registrar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        }
      );

      const texto = await respuesta.text();
      let datos = {};

      try {
        datos = texto ? JSON.parse(texto) : {};
      } catch {
        datos = {};
      }

      if (respuesta.status === 201) {
        setMensajeExito('¡Usuario registrado correctamente! Redirigiendo al Login...');

        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } else {
        setMensajeError(
          datos.mensaje ||
          datos.message ||
          datos.error ||
          texto ||
          `Error al registrar. Código: ${respuesta.status}`
        );
      }

    } catch (error) {
      setMensajeError(
        'No se pudo conectar con el servidor. Verifica que el backend esté funcionando.'
      );

      console.error('Error al registrar usuario:', error);

    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-container">

      <h1>Crear Cuenta</h1>

      <p>Completa los datos para registrarte en el sistema.</p>

      <form onSubmit={registrarUsuario}>

        <div>
          <label>Nombre de usuario</label>

          <input
            type="text"
            name="username"
            placeholder="Ingresa tu nombre de usuario"
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

        <div>
          <label>Rol en el sistema</label>

          <select
            name="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>

      </form>

      {mensajeExito && (
        <p className="mensaje-exito">
          {mensajeExito}
        </p>
      )}

      {mensajeError && (
        <p className="mensaje-error">
          {mensajeError}
        </p>
      )}

      <p>
        ¿Ya tienes una cuenta?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </button>
      </p>

    </div>
  );
}

export default Registrar;
