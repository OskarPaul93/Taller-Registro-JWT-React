import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>

      <form>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="button">
          Iniciar sesión
        </button>
      </form>

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