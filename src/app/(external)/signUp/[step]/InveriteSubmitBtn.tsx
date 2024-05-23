import { Button } from '@/components/ui';
import { CircleUserRound, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type Props = { icon: React.ReactNode; text: string; value?: string };

export default function InveriteSubmitBtn({
  icon,
  text,
  value,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <div className="text-center mx-auto bg-secondary w-full h-80 ">
      <Button
        type="submit"
        variant="secondary"
        name="action"
        value={value}
        disabled={pending}
        className="w-full h-80 flex flex-col text-xl font-semibold underline"
      >
        {icon}
        {text}
        {pending && (
          <Loader2 className="animate-spin  ml-2 mt-4" size="36" />
        )}
      </Button>
    </div>
  );
}
