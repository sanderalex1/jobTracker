import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppThemeProvider } from "./theme";
import { ApplicationProvider } from "./context/ApplicationContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApplicationProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </ApplicationProvider>
  </StrictMode>,
);
