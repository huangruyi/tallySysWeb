import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

let div = document.createElement('div');
div.setAttribute('id', 'root');
document.body.appendChild(div);

class APP extends React.Component  {
    render() {
        return (<h1>Hello React</h1>)
    }
}


if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept(); // 在你的代码中插入热替换代码
}

ReactDOM.render(<APP/>, document.getElementById('root'));