import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import AuthLayout from './app/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AuthLayout />
  </StrictMode>
);
