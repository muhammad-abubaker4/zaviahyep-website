import { createRoot } from "react-dom/client";
/* One variable file covers every weight we use, replacing five static faces. */
import "@fontsource-variable/inter/wght.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
