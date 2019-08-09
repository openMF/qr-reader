import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./App.css";
import ExecutePayment from "./screens/customer/ExecutePayment/ExecutePayment.js";

import Login from "./screens/login";
import ApprovePayment from "./screens/customer/ApprovePayment/ApprovePayment";
import PaymentComplete from "./components/PaymentComplete/PaymentComplete";
import CustomerInitiatedPayment from "./screens/customer/CreatePaymentRequest/CreatePaymentRequest";
// import './green-gold.scss';
import './gold-red.scss';
// import './dark.scss';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { setBank } from "./store/bank/actions.js";
import Accounts from "./screens/customer/Accounts/Accounts";
import Account from "./screens/customer/Account/Account";
import BankList from "./screens/customer/BankList/BankList";
import ConnectedBanks from "./screens/customer/ConnectedBanks/ConnectedBanks";
import AuthorizeBank from "./screens/customer/AuthorizeBank/AuthorizeBank";
import { tryLogin, logout } from "./store/users/thunks";

const NavRootW = props => {
  const theme = "lion";
  props.setTheme(theme);
  return (
    <div className={`App ${theme}`}>
      <div>
        <div>
          <Switch>
            <Route path={`/login`} component={Login} />

            <Route
              exact
              path={`/`}
              render={() =>
                !props.role ? (
                  <Redirect to={`/login`} />
                ) : (
                  <Redirect to={`/customer/accounts`} />
                )
              }
            />
            <ProtectedRoute
              exact
              path={`/customer/banks`}
              component={ConnectedBanks}
            />
            <Route
              exact
              path={`/customer/banks/authorize`}
              component={AuthorizeBank}
            />
            <ProtectedRoute
              exact
              path={`/customer/accounts`}
              component={Accounts}
            />
            <ProtectedRoute
              exact
              path={`/customer/accounts/new`}
              component={BankList}
            />
            <ProtectedRoute
              path={`/customer/accounts/:accountId`}
              component={Account}
            />
            <ProtectedRoute
              path={`/customer/createPaymentRequest/:accountId`}
              component={CustomerInitiatedPayment}
            />
            <ProtectedRoute
              path={`/customer/approvePayment/:consentId`}
              component={ApprovePayment}
            />
            <ProtectedRoute
                path={`/customer/paymentComplete/:transactionId`}
                component={PaymentComplete}
            />
            <ProtectedRoute
                path={`/customer/executePayment/:consentId`}
                component={ExecutePayment}
            />
            <ProtectedRoute
              path={`/`}
              render={() => <Redirect to={`/login`} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const NavRoot = withRouter(
  connect(
    state => ({ role: state.user.role }),
    dispatch => ({ setTheme: theme => dispatch(setBank(theme)) })
  )(NavRootW)
);

class App extends Component {
  componentDidMount() {
    if (!this.props.role) {
      this.props.tryLogin();
    }

    axios.interceptors.request.use(config => {
      const credentials = localStorage.getItem("lionfintech_cred");
      if (credentials) {
        config.headers["Authorization"] = `Basic ${credentials}`;
      }
      return config;
    });

    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.status === 401) {
          this.props.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  render() {
    return this.props.initialized ? (
      <Route path={`/`} render={props => <NavRoot {...props} />} />
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.user.role,
  initialized: state.user.initialized
});

const mapDispatchToProps = dispatch => ({
  tryLogin: () => dispatch(tryLogin()),
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
