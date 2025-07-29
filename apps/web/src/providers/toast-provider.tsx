import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastData {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToastContextProps {
  showToast: (data: ToastData) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (data: ToastData) => {
    setToasts((prevToasts) => [...prevToasts, data]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const currentToast = toasts[0];
      toast[currentToast.type ?? 'success'](currentToast.message);
      setToasts((prevToasts) => prevToasts.slice(1));
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
