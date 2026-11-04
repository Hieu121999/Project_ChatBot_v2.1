import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Thiết lập service worker với các handlers đã định nghĩa
export const worker = setupWorker(...handlers);