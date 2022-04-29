import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
//import './styles/styles.scss';

let app=document.getElementById('app');
ReactDOM.render(<IndecisionApp app={app} />, app);