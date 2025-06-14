import Toastify from 'toastify-js';

export const showToast = (message: string, type: 'success' | 'error' = 'success', duration = 5000) => {
  Toastify({
    text: message,
    duration,
    gravity: "bottom",
    position: "right",
    className: `toastify-${type}`,
    stopOnFocus: true,
  }).showToast();
};