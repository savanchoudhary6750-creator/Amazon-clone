import React from "react";

// Routes
import AppRoutes from "./routes/index.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

/**
 * App Component
 * Main application component with routes only
 * All context providers are in main.jsx
 */
function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;