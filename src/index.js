import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import Router from './containers/router'
import configureStore from './configureStore'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');
const store = configureStore();
//React-Redux 提供Provider组件，可以让容器组件拿到state。
render(
    <AppContainer>
        <Provider store={store}>
            <Router />
        </Provider>
    </AppContainer>
    ,
    mountNode
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}
export default store;