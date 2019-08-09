import {openBankAuthUrl} from "../../utils/externalUrlHelper.js";
import {clearPaymentRequest} from "../payment/actions.js";
import {clearQrData} from "../qr/actions.js";
import {
    loginCompleted,
    loginStarted,
    logoutUser,
    initApp
} from "./actions";

export const tryLogin = () => dispatch => {
    dispatch(initApp());
    const credentials = localStorage.getItem("lionfintech_cred");
    if (credentials) {
        dispatch(
            loginCompleted({
                username: credentials.username,
                firstName: "John",
                lastName: "Smith",
                role: "customer"
            })
        );
    }
};

export const forwardToLogin = () => {
    openBankAuthUrl();
};

export const login = (credentials) => dispatch => {
        dispatch(loginStarted());
        localStorage.setItem("lionfintech_cred", credentials);
        dispatch(
            loginCompleted({
                username: credentials.username,
                firstName: "John",
                lastName: "Smith",
                role: "customer"
            })
        );
    }
;

export const logout = history => dispatch => {
    localStorage.removeItem("lionfintech_cred");
    dispatch(logoutUser());
    dispatch(clearPaymentRequest());
    dispatch(clearQrData());
    history.push(`/`);
};
