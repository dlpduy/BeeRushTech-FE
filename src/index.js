import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Đặt clientId từ Google OAuth
const clientId = "810739097684-tq9kai0bshuforbl90koui2ej8p0qcn0.apps.googleusercontent.com";

// Render ứng dụng và bao bọc bằng GoogleOAuthProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Đo hiệu suất ứng dụng
reportWebVitals();
