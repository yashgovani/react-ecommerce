import { toast } from "react-toastify";

const timer = 2000;

const ToastPosition = {
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
  BOTTOM_RIGHT: "bottom-right",
};

const successToast = (message) => {
  toast.success(message, {
    position: ToastPosition.BOTTOM_RIGHT,
    autoClose: timer,
  });
};

export { successToast };
