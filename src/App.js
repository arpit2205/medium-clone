import React from "react";

import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";

// Home routes
import Dashboard from "./components/home/Dashboard";
import WriteArticle from "./components/home/WriteArticle";
import MyArticles from "./components/home/MyArticles";
import ViewArticle from "./components/home/ViewArticle";
import EditArticle from "./components/home/EditArticle";

import { AuthProvider } from "./contexts/AuthContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FirebaseProvider>
          <Switch>
            {/* Home routes */}
            <Route exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/write" component={WriteArticle} />
            <PrivateRoute exact path="/write" component={WriteArticle} />
            <PrivateRoute exact path="/my-articles" component={MyArticles} />
            <PrivateRoute
              exact
              path="/article/:articleID"
              component={ViewArticle}
            />
            <PrivateRoute
              exact
              path="/edit-article/:articleID"
              component={EditArticle}
            />

            {/* Authentication routes */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </FirebaseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
