import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
//import './styles/styles.css';

let app=document.getElementById('app');
ReactDOM.render(<IndecisionApp app={app} />, app);