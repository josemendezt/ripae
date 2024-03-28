'use client';

import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Sign Up {pending && <Loader2 className="animate-spin  ml-2" />}
    </Button>
  );
}
