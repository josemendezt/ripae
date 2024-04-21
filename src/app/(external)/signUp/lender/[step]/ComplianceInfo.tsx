import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {
  Form,
  Label,
  Button,
  RadioGroup,
  RadioGroupItem,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { complianceSchema } from '@/types/user/zodSchema';
import { z } from 'zod';
import { useUserStore } from '@/stores/userStore';
import { SignUpFlow, User } from '@/types/user/type';
import { updateUserData } from '../../../../../apis/user/client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GoalsInfo() {
  const router = useRouter();

  const { userStore } = useUserStore();
  const [isLoading, setIsloading] = useState(false);

  const userData = userStore as User;

  const form = useForm<z.infer<typeof complianceSchema>>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      politically_exposed: userData.politically_exposed?.toString(),
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof complianceSchema>
  ) => {
    setIsloading(true);
    const updatedData = {
      politically_exposed: values.politically_exposed === 'true',
      signup_flow: 'lenderDashboard' as SignUpFlow,
    } as User;

    await updateUserData(updatedData, userData.email);
    router.push('/dashboardLender');
  };

  return (
    <Card
      className={cn(
        'w-full max-w-2xl',
        isLoading && 'pointer-events-none'
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Step 5: Compliance and Regulations</CardTitle>
            <CardDescription>
              Please fill in the fields below with your compliance and
              regulations details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="politically_exposed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are you a politically exposed person or subject
                      to additional financial regulations?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex"
                        {...field}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="r1" />
                          <Label htmlFor="r1">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="r2" />
                          <Label htmlFor="r2">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-32">
            <Button
              variant="outline"
              className="w-32"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                router.replace('/signUp/lender/employment');
              }}
            >
              Back
            </Button>
            <Button
              className="ml-auto w-32"
              type="submit"
              disabled={isLoading}
            >
              Next{' '}
              {isLoading && (
                <Loader2 className="animate-spin  ml-2" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
