import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import "./i18n";
import App from "./App";

// Анимацияи ягонаи классикӣ — fade-up, нарм, як маротиба
AOS.init({
  duration: 650,
  easing: "ease-out-cubic",
  once: true,
  offset: 80,
  delay: 0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
