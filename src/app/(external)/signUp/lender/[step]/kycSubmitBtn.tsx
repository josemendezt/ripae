import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function KycSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <div className="text-center mx-auto">
      <Button type="submit" disabled={pending} className="w-11/12">
        Validate your ID
        {pending && <Loader2 className="animate-spin  ml-2" />}
      </Button>
    </div>
  );
}
