import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Providers from "./contexts";
import ContextProviderComposer from "./contexts/contextProviderComposer";
import { Provider } from "react-redux";
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <ContextProviderComposer contextProviders={Providers}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProviderComposer>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
