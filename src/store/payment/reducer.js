import {
    CANCEL_PAYMENT_FAILED,
    CANCEL_PAYMENT_REQUESTED,
    CANCEL_PAYMENT_SUCCEEDED,
    CLEAR_PAYMENT,
    CLEAR_PAYMENT_ERROR,
    CLEAR_PAYMENT_REQUEST,
    EXECUTE_PAYMENT_FAILED,
    EXECUTE_PAYMENT_REQUESTED,
    EXECUTE_PAYMENT_SUCCEEDED,
    GET_TRANSACTION_DETAILS_FAILED,
    GET_TRANSACTION_DETAILS_REQUESTED,
    GET_TRANSACTION_DETAILS_SUCCEEDED,
    PREPARE_PAYMENT_FAILED,
    PREPARE_PAYMENT_REQUESTED,
    PREPARE_PAYMENT_SUCCEEDED,
    STOP_TRANASCTION_POLLING,
} from "./actions";

const initialState = {
    loading: false,
    error: null,
    transaction: null,
    isPolling: false,
    requestCount: 0
};

export const payment = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_PAYMENT:
        case CLEAR_PAYMENT_ERROR:
        case CLEAR_PAYMENT_REQUEST:
            return initialState;
        case PREPARE_PAYMENT_REQUESTED:
        case GET_TRANSACTION_DETAILS_REQUESTED:
        case EXECUTE_PAYMENT_REQUESTED:
        case CANCEL_PAYMENT_REQUESTED:
            return {...state, loading: true, error: null, transaction: null};
        case PREPARE_PAYMENT_FAILED:
        case GET_TRANSACTION_DETAILS_FAILED:
        case EXECUTE_PAYMENT_FAILED:
        case CANCEL_PAYMENT_FAILED:
            return {...state, loading: false, error: action.error, transaction: null};
        case GET_TRANSACTION_DETAILS_SUCCEEDED:
            return {...state, isPolling: true, requestCount: state.requestCount++};
        case PREPARE_PAYMENT_SUCCEEDED:
        case EXECUTE_PAYMENT_SUCCEEDED:
        case CANCEL_PAYMENT_SUCCEEDED:
            return {...state, loading: false, error: null, transaction: action.payload};
        case STOP_TRANASCTION_POLLING:
            return {...state, isPolling: false};
        default:
            return state;
    }
};
