import { useState } from "react";
import { RoutesConfig } from "./routes/Routes";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {store} from "./redux/store"
import { Provider } from "react-redux";
import Layout from "./components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
