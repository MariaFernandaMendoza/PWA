import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <button aria-label="Menú" type="button">☰</button>
        <h1>MiPWA</h1>
        <button aria-label="Buscar" type="button">🔍</button>
      </header>
      
      <main className="main-content">
        <h2>¡Bienvenido a Mi PWA!</h2>
        <p>Esta es una aplicación web progresiva</p>
        
        <div className="content-grid">
          <div className="card">
            <h3>🚀 Rápida</h3>
            <p>Carga instantánea y experiencia fluida en todos los dispositivos</p>
          </div>
          <div className="card">
            <h3>📱 Responsiva</h3>
            <p>Se adapta perfectamente a móviles, tablets y desktop</p>
          </div>
          <div className="card">
            <h3>⚡ Moderna</h3>
            <p>Built with React, TypeScript y mejores prácticas PWA</p>
          </div>
        </div>
      </main>
      
      <footer>
        <p>© 2025 MiPWA - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;