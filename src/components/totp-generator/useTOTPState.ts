import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { generateTOTP } from './generateOTP';

export function useTOTPState() {
  const [key, setKey] = useState(
    () => new URLSearchParams(location.search).get('key') || '',
  );
  const [totp, _setTotp] = useState('');
  const totpRef = useRef('');
  const [timeLeft, setTimeLeft] = useState(30);
  const { toast } = useToast();

  const setTotp = useCallback((str: string) => {
    totpRef.current = str;
    _setTotp(str);
  }, []);

  useEffect(() => {
    if (!key) {
      setTotp('');
      return;
    }
    setTotp(generateTOTP(key));
    setTimeLeft(30);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setTotp(generateTOTP(key));
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [key, setTotp]);

  const copyToClipboard = useCallback(() => {
    if (totp && totp !== 'Invalid key') {
      navigator.clipboard.writeText(totp).then(
        () => {
          toast({
            description: 'TOTP copied to clipboard',
          });
        },
        (err) => {
          console.error('Could not copy text: ', err);
          toast({
            variant: 'destructive',
            description: 'Failed to copy TOTP',
          });
        },
      );
    }
  }, [toast, totp]);

  return {
    copyToClipboard,
    key,
    setKey,
    totp,
    timeLeft,
  };
}
