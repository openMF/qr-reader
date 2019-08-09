import axios from 'axios';
import UUID from "uuid/v1.js";
import {API_URL} from "../../config/server";
import toCamel from "../../utils/toCamelHelper.js";
import {
    executePaymentFailed,
    executePaymentRequested,
    executePaymentSucceeded,
    getTransactionDetailsFailed,
    getTransactionDetailsRequested,
    getTransactionDetailsSucceeded,
    preparePaymentFailed,
    preparePaymentRequested,
    preparePaymentSucceeded,
} from "./actions.js";

const baseUrl = `${API_URL}/pisp/v1`;

// export const fetchPaymentSuccess = (history, qrData) => (dispatch, getState) => {
//     dispatch(setQrData(qrData));
//     const {bank} = getState();
//     axios.get(`${getServerUrl(bank)}/client/${qrData.clientRefId}`).then(
//         response => {
//             if (response.data.transferState === 'COMMITTED') {
//                 const payerId = response.data.originalRequestData ? response.data.originalRequestData.payer.partyIdInfo.partyIdentifier : bank === "lion" ? "27710203999" : "27710101999";
//                 dispatch(setPaymentSuccess(
//                     response.data.transactionId,
//                     payerId
//                 ));
//                 history.push(`/merchant/paymentComplete`);
//             }
//         }
//     ).catch(() => {
//     });
// };

export const preparePayment = (bankId, amount, currency, payeeId, payerAccountId, note, history) => (dispatch, getState) => {
    dispatch(preparePaymentRequested());
    axios.post(`${baseUrl}/preparePayment`, {
            "Data": {
                "Initiation": {
                    "InstructionIdentification": UUID(),
                    "EndToEndIdentification": UUID(),
                    "InstructedAmount": {
                        "Amount": amount,
                        "Currency": currency
                    },
                    "CreditorAccount": {
                        "SchemeName": "UK.OBIE.Paym",
                        "Identification": payeeId,
                        "Name": "unknown"
                    },
                    "DebtorAccount": {
                        "SchemeName": "UK.OBIE.BBAN",
                        "Identification": payerAccountId
                    },
                    "SupplementaryData": {
                        "interopData": {
                            "amountType": "RECEIVE",
                            "note": note,
                            "transactionType": {
                                "scenario": "TRANSFER",
                                "initiator": "PAYER",
                                "initiatorType": "CONSUMER"
                            }
                        }
                    }
                }
            },
            "Risk": {}
        },
        {
            headers: {
                "x-tpp-bankid": bankId
            }
        }
    ).then(response => {
        const payment = toCamel(response.data).data;
        const consentId = payment.consentId;
        dispatch(preparePaymentSucceeded(toCamel(payment)));
        history.push(`/customer/approvePayment/${consentId}?bankId=${bankId}`);
    }).catch(error => dispatch(preparePaymentFailed(error)))
};

export const executePayment = (consentId, bankId) => async dispatch => {
    dispatch(executePaymentRequested);
    axios.post(`${baseUrl}/executePayment/${consentId}`, undefined, {headers: {"x-tpp-bankid": bankId}})
        .then((response) => {
            dispatch(executePaymentSucceeded(toCamel(response.data).data));
        }).catch(error => dispatch(executePaymentFailed(error)));
};

export const cancelPayment = (consentId, bankId) => async dispatch => {
    dispatch(executePaymentRequested);
    axios.post(`${baseUrl}/cancelPayment/${consentId}`, undefined, {headers: {"x-tpp-bankid": bankId}})
        .then((response) => {
            dispatch(executePaymentSucceeded(toCamel(response.data).data));
        }).catch(error => dispatch(executePaymentFailed(error)));
};

export const getTransactionDetail = (transactionId, bankId) => async dispatch => {
    dispatch(getTransactionDetailsRequested());
    axios.get(`${baseUrl}/payment/${transactionId}`, {headers: {"x-tpp-bankid": bankId}})
        .then((response) => {
            console.log(response);
            console.log(toCamel(response.data));
            dispatch(getTransactionDetailsSucceeded(toCamel(response.data).data));
        }).catch(error => dispatch(getTransactionDetailsFailed(error)));
};
