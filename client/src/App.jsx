import React from "react";

// Routes
import AppRoutes from "./app/routes/index.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

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