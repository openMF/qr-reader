import React, { PureComponent } from 'react'
import {withRouter} from "react-router-dom";
import Layout from "../../components/Layout/Layout.js";
import {connect} from 'react-redux';
import {forwardToLogin} from "../../store/users/thunks";

class Login extends PureComponent {

    componentDidMount() {
        this.props.forwardToLogin()
    }

    render() {
        return (<Layout>
            <h1>Login</h1>
        </Layout>)
    }
}

const mapStateToProps = (state) => ({});

const matchDispatchToProps = (dispatch) => ({
    forwardToLogin: () => dispatch(forwardToLogin())
});

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));
