'use client';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
  SelectGroup,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import {
  PaymentFrequency,
  SignUpFlow,
  User,
} from '@/types/user/type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { employmentSchema } from '@/types/user/zodSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/stores/userStore';
import { z } from 'zod';
import { updateUserData } from '../../client-actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FinancialInfo() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const { user } = useUserStore();

  const userData = user as User;

  const form = useForm<z.infer<typeof employmentSchema>>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      payment_frequency: userData.payment_frequency || undefined,
      income: (userData.income || '') as string,
      expenses: (userData.expenses || '') as string,
      job: (userData.job || '') as string,
      job_time: (userData.job_time || '') as string,
    },
  });

  const EnumPf = z.enum([
    PaymentFrequency.MONTHLY,
    PaymentFrequency.SEMIMONTHLY,
    PaymentFrequency.WEEKLY,
    PaymentFrequency.BIWEEKLY,
  ]);
  type EnumPf = z.infer<typeof EnumPf>;

  const handleSubmit = async (
    values: z.infer<typeof employmentSchema>
  ) => {
    setIsloading(true);
    const updatedData = {
      ...values,
      signup_flow: 'lenderCompliance' as SignUpFlow,
    } as User;
    await updateUserData(updatedData, userData.email);
    router.push('/signUp/lender/compliance');
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
            <CardTitle>
              Step 2: Employment and financial Information
            </CardTitle>
            <CardDescription>
              Please fill in the fields below with your financial and
              employment information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="payment_frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Frequency</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) =>
                          field.onChange(EnumPf.parse(value))
                        }
                      >
                        <SelectTrigger id="payment_frequency">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              value={PaymentFrequency.MONTHLY}
                            >
                              {PaymentFrequency.MONTHLY}
                            </SelectItem>
                            <SelectItem
                              value={PaymentFrequency.SEMIMONTHLY}
                            >
                              {PaymentFrequency.SEMIMONTHLY}
                            </SelectItem>
                            <SelectItem
                              value={PaymentFrequency.BIWEEKLY}
                            >
                              {PaymentFrequency.BIWEEKLY}
                            </SelectItem>
                            <SelectItem
                              value={PaymentFrequency.WEEKLY}
                            >
                              {PaymentFrequency.WEEKLY}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount Per Payment (After Tax)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the amount you receive"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Monthly Obligations (Amount)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the amount for your monthly obligations such as rent, debts, etc."
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your occupation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="job_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      How much time do you have in your current job?
                      (In months)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your time in your current"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-16">
            <Button
              variant="outline"
              className="w-32"
              onClick={(e) => {
                e.preventDefault();
                router.replace('/signUp/lender/personal');
              }}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              className="ml-auto w-32"
              type="submit"
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
