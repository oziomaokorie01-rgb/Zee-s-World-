import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Don't worry if this file is blank, just keep the import

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
      <App />
        </React.StrictMode>
        );
        