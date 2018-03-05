import name from './name';
import './style.css';
var app = document.getElementById('app');
//require('style-loader!css-loader!./style.css');

app.innerText('hello world' + name)
app.style.background = "#666"