import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./store";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//TODO Remove dev-tools from the final product!

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
