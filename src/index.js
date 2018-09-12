import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/app';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
