import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import DefaultSettings from "../DefaultSettings/DefaultSettings";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import PropertyPage from "../PropertyPage/PropertyPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterPage from "../RegisterPage/RegisterPage";
import "./App.css";
import { theme } from "./theme";

function App() {
  console.log("app comp is rendering");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Router>
          <div>
            <Header />
            <Switch>
              <Redirect exact from="/" to="/property-page" />
              <ProtectedRoute exact path="/property-page">
                <PropertyPage userId={user.id} />
              </ProtectedRoute>
              <ProtectedRoute exact path="/default-settings/:id">
                <DefaultSettings />
              </ProtectedRoute>
              <Route exact path="/login">
                {user.id ? <Redirect to="/property-page" /> : <LoginPage />}
              </Route>

              <Route exact path="/registration">
                {user.id ? <Redirect to="/property-page" /> : <RegisterPage />}
              </Route>
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
