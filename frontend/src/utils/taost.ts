import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const showToast = (message: string, type:
  'info' | 'success' | 'error' | 'warning' = 'info'
) => {
  toast(message, {
    autoClose: 2000,
    type
  });
};
