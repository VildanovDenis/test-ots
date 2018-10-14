import React from "react";
import Login from "./Login/Login";
import Info from "./Info/Info";
import NotMatch from "./NotMatch/NotMatch";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authAction } from "../store/actions/auth-action";
import { authUserAction } from "../store/actions/auth-user-action";
import { AuthEnum } from "../store/reducers/AuthEnum";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLogin } = this.props;
    const { user } = this.props;
    return (
      <React.Fragment>
        <Switch>
          {isLogin === AuthEnum.LOGIN ? (
            <Route
              path="/Info"
              render={props => <Info {...props} user={this.props.userInfo} />}
            />
          ) : (
            <Route
              path="/"
              render={props => (
                <Login
                  {...props}
                  onLogin={this.props.auth}
                  isLogin={this.props.isLogin}
                  user={this.props.user}
                />
              )}
            />
          )}
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isAuth,
    userInfo: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth: authAction,
      user: authUserAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);