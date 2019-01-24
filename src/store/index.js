import {combineReducers} from "redux";
import {payment} from "./payment/reducer";
import {user} from './users/reducer';
import qr from './qr/reducer';

export const rootReducer = combineReducers({user, payment, qr});