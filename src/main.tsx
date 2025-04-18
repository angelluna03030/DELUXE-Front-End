import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
