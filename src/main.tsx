import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HanneungApp } from '@/features/hanneung/hanneung-app';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HanneungApp />
  </StrictMode>,
);