import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import IndexApp from './containers'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');

render(
    <AppContainer>
        <LocaleProvider locale={zh_CN}><IndexApp /></LocaleProvider>
    </AppContainer>
    ,
    mountNode
);

if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
}



