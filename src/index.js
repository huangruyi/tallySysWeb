import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './containers';

// 备注：如果有index.html <div id="root"></div>
// 会报错：Target container is not a DOM element
// 其实id 和 getElementById 是对应起来的
// 出现错误的原因是在加载index.js的时候DOM还没有建立完毕，所以找不到id为root的div
// 可以如下：用代码创建div,也可以省略index.html页面
let div = document.createElement('div');
div.setAttribute('id', 'root');
document.body.appendChild(div);

const mountNode = document.getElementById('root');

// class APP extends React.Component  {
//     render() {
//         return (<h1>Hello React</h1>)
//     }
// }


if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept(); // 在你的代码中插入热替换代码
}

ReactDOM.render(<Admin/>, document.getElementById('root'));