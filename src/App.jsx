import { useState } from "react";
import { RoutesConfig } from "./routes/Routes";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Details from "./pages/details/Details";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {RoutesConfig &&
          RoutesConfig.length > 0 &&
          RoutesConfig.map((comp) => {
            const { path, component: Component, children } = comp;
            return (
              <Route
                exact
                key={path}
                path={path}
                element={
                  <Layout heading={comp.heading}>
                    <Component children={children} />
                  </Layout>
                }
              />
            );
          })}
      </Routes>
    </Router>
  );
}

export default App;
