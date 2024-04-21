import React, { useEffect, useState } from 'react';
import { useToast } from './use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import Loader from './loader';

export default function ErrorToast({
  msg,
  toastClick,
}: {
  msg: string;
  toastClick: () => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    toast({
      variant: 'destructive',
      title: 'Something went wrong.',
      description: msg,
      open,
      duration: 20000,
      action: (
        <ToastAction
          className="border w-36 rounded py-2"
          altText="Try again"
          onClick={() => {
            setOpen(false);
            toastClick();
          }}
        >
          Try again
        </ToastAction>
      ),
    });
  }, [open, msg, toastClick]);

  return <Loader />;
}
