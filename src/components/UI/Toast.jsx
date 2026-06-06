import React from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const TYPE_MAP = {
  success: { Icon: CheckCircle },
  error:   { Icon: XCircle     },
  warning: { Icon: AlertTriangle },
  info:    { Icon: Info        },
};

export default function Toast() {
  const { toasts, removeToast } = useStore();

  return (
    <div
      className="toast-stack"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(toast => {
        const { Icon } = TYPE_MAP[toast.type] || TYPE_MAP.success;
        return (
          <div
            key={toast.id}
            className={`toast toast--${toast.type}`}
            role="alert"
          >
            <div className="toast__icon">
              <Icon size={15} />
            </div>
            <span className="toast__msg">{toast.message}</span>
            <button
              className="toast__close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
