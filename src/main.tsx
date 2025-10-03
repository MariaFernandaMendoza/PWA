import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ocultar Splash Screen después de renderizar React
const splash = document.getElementById('splash');
if (splash) {
  splash.style.transition = 'opacity 0.5s';
  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 500);
}

// Registrar Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("✅ Service Worker registrado"))
      .catch((err) => console.log("❌ Error al registrar el SW:", err));
  });
}
