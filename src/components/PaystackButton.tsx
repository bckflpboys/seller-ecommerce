'use client';

import { useEffect, useState } from 'react';
import { PaystackButton as PaystackButtonOriginal } from 'react-paystack';
import { Button } from '@/components/ui/button';

interface PaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  validateBeforePay?: () => boolean;
}

const PaystackButton = ({ amount, email, onSuccess, onClose, validateBeforePay }: PaystackButtonProps) => {
  const [isClient, setIsClient] = useState(false);
  const [showPaystack, setShowPaystack] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reference = (new Date()).getTime().toString();
  
  const componentProps = {
    reference,
    email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: `Pay R${amount}`,
    currency: 'ZAR',
    label: 'Soil Solution Order',
    onSuccess: (response: any) => {
      const ref = response?.reference || response?.trxref || reference;
      onSuccess(ref);
      setShowPaystack(false);
    },
    onClose: () => {
      onClose();
      setShowPaystack(false);
    }
  };

  const handlePayClick = () => {
    if (!validateBeforePay || validateBeforePay()) {
      setShowPaystack(true);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full">
      {!showPaystack ? (
        <button
          onClick={handlePayClick}
          className="w-full bg-sage hover:bg-sage-dark text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Pay R{amount}
        </button>
      ) : (
        <PaystackButtonOriginal 
          {...componentProps}
          className="w-full bg-sage hover:bg-sage-dark text-white font-semibold py-3 rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default PaystackButton;
