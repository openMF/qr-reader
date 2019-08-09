import axios from "axios";
import {login} from "../users/thunks.js";
import {
  getBankListRequested,
  getBankListFailed,
  getBankListSucceeded,
  addNewBankRequested,
  addNewBankFailed,
  authorizeBankRequested,
  authorizeBankFailed,
  authorizeBankSucceeded,
  registerNewBankRequested,
  registerNewBankFailed,
  registerNewBankSucceeded,
  getConnectedBanksRequested,
  getConnectedBanksFailed,
  getConnectedBanksSucceeded
} from "./actions";
import { getConsentIdForBankRegistration } from "../account/thunks";
import { API_URL } from "../../config/server";
import toCamel from "../../utils/toCamelHelper";
import { openBankAuthUrl } from "../../utils/externalUrlHelper";

const baseUrl = `${API_URL}/banks/v1`;

export const getBankList = () => dispatch => {
  dispatch(getBankListRequested());

  axios
    .get(`${baseUrl}/supported`)
    .then(res => {
      const banks = toCamel(res.data).bankInfo;
      dispatch(getBankListSucceeded(banks));
    })
    .catch(error => dispatch(getBankListFailed(error.response)));
};

export const addNewBank = bank => async dispatch => {
  dispatch(addNewBankRequested());
  const consentId = await getConsentIdForBankRegistration(bank.bankId);
  if (!consentId) {
    dispatch(addNewBankFailed());
  } else {
    openBankAuthUrl(bank, consentId);
  }
};

export const registerNewBank = consentId => async dispatch => {
  dispatch(registerNewBankRequested());

  try {
    await axios.post(`${API_URL}/consents/${consentId}`);
    dispatch(registerNewBankSucceeded());
  } catch (error) {
    dispatch(registerNewBankFailed(error.response));
    throw error;
  }
};

export const authorizeBank = (bankId, code) => async dispatch => {
  dispatch(authorizeBankRequested());

  try {
    const cred = await axios.get(`${API_URL}/token/v1/code/${code}`, { headers: { "x-tpp-bankid": bankId } });
    const {userName, password} = cred.data;
    dispatch(login(btoa(`${userName}:${password}`)));
    dispatch(authorizeBankSucceeded());
  } catch (error) {
    dispatch(authorizeBankFailed(error.response));
    throw error;
  }
};

export const getConnectedBanks = () => async dispatch => {
  dispatch(getConnectedBanksRequested());

  return axios
    .get(`${API_URL}/user/v1/banks`)
    .then(res => {
      const banks = toCamel(res.data).bankInfo;
      dispatch(getConnectedBanksSucceeded(banks));
      return banks;
    })
    .catch(error => {
      dispatch(getConnectedBanksFailed(error.response));
      return null;
    });
};
