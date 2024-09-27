import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { initUsers, getAvgRating } from './data/repository';

// intialising default admin user
initUsers();
//update movie ratings based on reviews left on local storage
getAvgRating();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

