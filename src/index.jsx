import React from 'react';
import ReactDOM from 'react-dom';
import IndexView from './Views/IndexView';
import { Provider } from 'react-redux'
import store from "./Reducers/store.js";

ReactDOM.render(
    <Provider store={store}>
        <IndexView />
    </Provider>
    , document.getElementById('app'));