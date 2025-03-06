'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface PaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  validateBeforePay?: () => boolean;
}

const PaystackButton = ({ amount, email, onSuccess, onClose, validateBeforePay }: PaystackButtonProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load Paystack script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayClick = () => {
    if (!validateBeforePay || validateBeforePay()) {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_4db21e3677324abaf9e79eadd4bb56d03dd2bcbe',
        email,
        amount: amount * 100,
        currency: 'ZAR',
        ref: new Date().getTime().toString(),
        onClose,
        callback: (response: any) => {
          const ref = response?.reference || response?.trxref;
          onSuccess(ref);
        },
      });
      handler.openIframe();
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={handlePayClick}
      className="w-full bg-sage hover:bg-sage-dark text-white font-semibold py-3 rounded-lg shadow-md"
    >
      Pay R{amount}
    </button>
  );
};

export default PaystackButton;
