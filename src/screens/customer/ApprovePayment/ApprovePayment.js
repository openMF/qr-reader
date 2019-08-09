import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {DataList} from "../../../components/DataList/DataList.js";
import ErrorDialog from "../../../components/ErrorDialog/ErrorDialog.js";
import Layout from "../../../components/Layout/Layout.js";
import {Button, Card, Icon} from "react-onsenui";
import Loading from "../../../components/Loading/Loading.js";
import {clearPayment} from "../../../store/payment/actions.js";
import {cancelPayment} from "../../../store/payment/thunks.js";
import './ApprovePayment.scss'

class ApprovePayment extends PureComponent {
    state = {
        bankId: ''
    };

    componentDidMount() {
        const {location} = this.props;
        const params = new URLSearchParams(location.search);
        this.setState({bankId: params.get('bankId')});
    }

    componentWillUnmount() {
        this.props.clearPayment()
    }

    render() {
        const {transaction, loading, error} = this.props;
        let dataSource = [];
        const transactionAvailable = !loading && transaction;
        let amount = ``;
        if (transaction) {
            const instructedAmount = transaction.initiation.instructedAmount;
            amount = instructedAmount ? `${instructedAmount.amount} ${instructedAmount.currency}` : ``;
            dataSource = [
                ['Payer Name', transaction.initiation.debtorAccount.name],
                ['Payer Account', `${transaction.initiation.debtorAccount.schemeName} ${transaction.initiation.debtorAccount.identification}`],
                ['Payee Name', transaction.initiation.creditorAccount.name],
                ['Payee Account', `${transaction.initiation.creditorAccount.schemeName} ${transaction.initiation.creditorAccount.identification}`],
                ['Description', transaction.initiation.supplementaryData.interopData.note],
                ['Status:', transaction.status],
                ['Charges', transaction.charges.map(charge => [charge.chargeBearer, `${charge.amount.amount} ${charge.amount.currency}`].join(' '))]
            ]
        }

        return (<Layout>
            {transactionAvailable &&
            <div className="wrapper">
                <div className="text">
                    <h1>Approve payment</h1>
                </div>
                <Card className="amount">{amount}</Card>

                <DataList modifier="noborder" dataSource={dataSource}/>
                <div className="button-group">
                    <Button modifier="large--cta"
                            onClick={() => {
                                this.props.cancelPayment(transaction.consentId, this.state.bankId);
                                this.props.history.push('/customer/accounts')
                            }}
                            style={{backgroundColor: '#aa0000'}}>
                        <Icon icon={'md-close-circle'}/> Reject
                    </Button>
                    <Button modifier="large--cta"
                            onClick={() => this.props.history.push(`/customer/executePayment/${transaction.consentId}?bankId=${this.state.bankId}`)}
                            style={{backgroundColor: '#00aa00'}}>
                        <Icon icon={'md-check-circle'}/> Approve
                    </Button>
                </div>
            </div>}
            <Loading isOpen={loading}/>
            <ErrorDialog
                isOpen={!!error}
                close={this.props.clearError}
                title="Something went wrong"
                message={error ? error.data : null}
            />

        </Layout>)
    }
}

const mapStateToProps = (state) => ({
    transaction: state.payment.transaction
});

const mapDispatchToProps = (dispatch) => ({
    cancelPayment: (consentId, bankId) => dispatch(cancelPayment(consentId, bankId)),
    clearPayment: () => dispatch(clearPayment())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovePayment)
