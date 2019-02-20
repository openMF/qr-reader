import axios from 'axios';
import {Transaction} from "../../models/transaction";
import {SERVER_URL} from "../../config/server";
import {setQrData} from "../qr/actions.js";
import {sendPaymentRequest, setPaymentSuccess, setTransactionsId} from "./actions.js";
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry";

export const startPayment = (history,theme) => (dispatch, getState) => {
    const {user, qr} = getState();
    const clientId = user.rawUser.banks[0].partyIdInfo;
    const {amount, clientRefId, note, merchant} = qr.data;

    const transaction = new Transaction({partyIdentifier: merchant.id, partyIdType: merchant.idType}, clientRefId, amount, note, clientId);
    console.log('Transaction', transaction, clientId);

    axios.post(`${SERVER_URL}`, {...transaction}, {
        headers: {'X-Tenant-Identifier': 'tn01'}
    })
        .then(response => {
            if (response.status === 200) {
                dispatch(setTransactionsId(response.data.transactionId));
                history.push(`/${ theme }/customer/paymentComplete`);
            }
        })
        .catch(() => {
        });
};

export const createPayment = (history, amount, description, theme) => (dispatch) => {
    dispatch(sendPaymentRequest(amount, description));
    history.push && history.push(`/${ theme }/merchant/paymentRequest`);
};

export const fetchPaymentSuccess = (history, qrData, theme) => (dispatch, getState) => {
    dispatch(setQrData(qrData));
    axios.get(`${SERVER_URL}/client/${qrData.clientRefId}`).then(
        response => {
            if(response.data.transferState === 'COMMITTED'){
                dispatch(setPaymentSuccess(
                    response.data.transactionId,
                    response.data.originalRequestData.payer.partyIdInfo.partyIdentifier
                ));
                history.push(`/${theme}/merchant/paymentComplete`);
            }
        }
    ).catch(() => {
    });
};
