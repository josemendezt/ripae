import { Button } from '@/components/ui';
import { CircleUserRound, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type Props = { icon: React.ReactNode; text: string; value?: string };

export default function GetDataSubmitButton({
  icon,
  text,
  value,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        className=" h-10 text-lg mt-4"
        type="submit"
        value={value}
        name="action"
        disabled={pending}
      >
        {icon}
        {text}
        {pending && <Loader2 className="animate-spin  ml-2 mt-4" />}
      </Button>
    </div>
  );
}
