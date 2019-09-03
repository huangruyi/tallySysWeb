import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Admin from './containers'

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');

render(
    <AppContainer>
        <Admin />
    </AppContainer>
    ,
    mountNode
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}