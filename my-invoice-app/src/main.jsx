import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ensure this matches the actual file path and extension
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
