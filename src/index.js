import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './Store/auth-context';

// const contentType = "application/json";
const contentType = "text/plain;charset=utf-8";

axios.defaults.headers.post['Content-Type'] = contentType;
ReactDOM.render(
  <AuthContextProvider>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);

