import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {ProgressCircular, Icon} from "react-onsenui";
import {authorizeBank} from "../../../store/bank/thunks";
import Layout from "../../../components/Layout/Layout";
import {login} from "../../../store/users/thunks.js";

class AuthorizeBank extends Component {
    componentDidMount() {
        const {authorizeBank, history, location} = this.props;
        const params = new URLSearchParams(location.search);
        try {
            const responseState = JSON.parse(atob(params.get('state')));
            console.log('response', responseState);
            if (responseState.bankid) {
                authorizeBank(responseState.bankid, params.get('code'))
                    .then(() =>
                        setTimeout(() => history.push(`/customer/executePayment/${responseState.consentId}?bankId=${responseState.bankid}`), 2500)
                    ).catch(() => {});
            }

        } catch (e) {
            authorizeBank(params.get('state'), params.get('code'))
                .then(() =>
                    setTimeout(() => history.push("/customer/accounts"), 2500)
                );
        }

    }

    render() {
        const {error, loading} = this.props;
        return (
            <Layout>
                {error ? (
                    <div style={{color: "#fe3824"}}>
                        Something went wrong, please try again later.
                    </div>
                ) : loading ? (
                    <React.Fragment>
                        <ProgressCircular indeterminate/>
                        <h3>Please wait, while we authorize your account.</h3>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Icon size={32} className="fa-check-circle" style={{color: '#44db5e'}}/>
                        <h3>Authorization was successful.</h3>
                    </React.Fragment>
                )}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.bank.loading,
    error: state.bank.error
});

const mapDispatchToProps = dispatch => ({
    authorizeBank: (bankId, code) => dispatch(authorizeBank(bankId, code)),
    login: (credentials, history) => dispatch(login(credentials, dispatch))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AuthorizeBank)
);
