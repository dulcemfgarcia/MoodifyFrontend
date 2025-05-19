import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './views/data/UserContext';
import App from './App';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a6b96c2add9851253ec9d28a0bfc8ad8@o4509324702121984.ingest.us.sentry.io/4509324748849152",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
  </React.StrictMode>
);


