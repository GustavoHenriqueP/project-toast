import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { useToast } from '../ToastProvider';

function ToastShelf() {
  const { toasts } = useToast();

  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}
    >
      {toasts.map(({ id, variant, message }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
