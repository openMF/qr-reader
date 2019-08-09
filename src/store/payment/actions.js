export const CLEAR_PAYMENT_REQUEST = 'CLEAR_PAYMENT_REQUEST';

export const clearPaymentRequest = () => ({
    type: CLEAR_PAYMENT_REQUEST, payload: {}
});

export const PREPARE_PAYMENT_REQUESTED = 'PREPARE_PAYMENT_REQUESTED';
export const PREPARE_PAYMENT_FAILED = 'PREPARE_PAYMENT_FAILED';
export const PREPARE_PAYMENT_SUCCEEDED = 'PREPARE_PAYMENT_SUCCEEDED';

export const preparePaymentRequested = () => ({
    type: PREPARE_PAYMENT_REQUESTED
});

export const preparePaymentFailed = (error) => ({
    type: PREPARE_PAYMENT_FAILED,
    error
});

export const preparePaymentSucceeded = (payload) => ({
    type: PREPARE_PAYMENT_SUCCEEDED,
    payload
});

export const CANCEL_PAYMENT_REQUESTED = 'CANCEL_PAYMENT_REQUESTED';
export const CANCEL_PAYMENT_FAILED = 'CANCEL_PAYMENT_FAILED';
export const CANCEL_PAYMENT_SUCCEEDED = 'CANCEL_PAYMENT_SUCCEEDED';

export const cancelPaymentRequested = () => ({
    type: CANCEL_PAYMENT_REQUESTED
});

export const cancelPaymentFailed = (error) => ({
    type: CANCEL_PAYMENT_FAILED,
    error
});

export const cancelPaymentSucceeded = (payload) => ({
    type: CANCEL_PAYMENT_SUCCEEDED,
    payload
});

export const EXECUTE_PAYMENT_REQUESTED = 'EXECUTE_PAYMENT_REQUESTED';
export const EXECUTE_PAYMENT_FAILED = 'EXECUTE_PAYMENT_FAILED';
export const EXECUTE_PAYMENT_SUCCEEDED = 'EXECUTE_PAYMENT_SUCCEEDED';

export const executePaymentRequested = () => ({
    type: EXECUTE_PAYMENT_REQUESTED
});

export const executePaymentFailed = (error) => ({
    type: EXECUTE_PAYMENT_FAILED,
    error
});

export const executePaymentSucceeded = (payload) => ({
    type: EXECUTE_PAYMENT_SUCCEEDED,
    payload
});

export const GET_TRANSACTION_DETAILS_REQUESTED = 'GET_TRANSACTION_DETAILS_REQUESTED';
export const GET_TRANSACTION_DETAILS_FAILED = 'GET_TRANSACTION_DETAILS_FAILED';
export const GET_TRANSACTION_DETAILS_SUCCEEDED = 'GET_TRANSACTION_DETAILS_SUCCEEDED';

export const getTransactionDetailsRequested = () => ({
    type: GET_TRANSACTION_DETAILS_REQUESTED
});

export const getTransactionDetailsFailed = (error) => ({
    type: GET_TRANSACTION_DETAILS_FAILED,
    error
});

export const getTransactionDetailsSucceeded = (payload) => ({
    type: GET_TRANSACTION_DETAILS_SUCCEEDED,
    payload
});

export const CLEAR_PAYMENT_ERROR = 'CLEAR_PAYMENT_ERROR';
export const CLEAR_PAYMENT = 'CLEAR_PAYMENT';

export const clearPaymentError = () => ({
    type: CLEAR_PAYMENT_ERROR
});

export const clearPayment = () => ({
    type: CLEAR_PAYMENT
});

export const STOP_TRANASCTION_POLLING = 'STOP_TRANASCTION_POLLING';

export const stopTranscationPolling = () => ({
    type: STOP_TRANASCTION_POLLING
});
