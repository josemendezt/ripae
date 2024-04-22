import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { format, getYear } from 'date-fns';
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
import { canadianProvinces } from './utils';
import { useEffect, useState } from 'react';
import { updateUserData } from '../../../apis/user/client';
import { SignUpFlow, User } from '@/types/user/type';
import { CalendarIcon, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from '@/types/user/zodSchema';
import { useUserStore } from '@/stores/userStore';
import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function PersonalInfo({ link }: { link: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { userStore } = useUserStore();

  const userData = userStore as User;

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: userData.first_name || '',
      middle_name: userData.middle_name || '',
      last_name: userData.last_name || '',
      address: userData.address || '',
      dob: userData.dob || undefined,
      province: userData.province || '',
      sin: userData.decrypted_sin || '',
      postal_code: userData.postal_code || '',
      city: userData.city || '',
    },
  });

  const submitPersonalInfo = async (
    values: z.infer<typeof personalInfoSchema>
  ) => {
    setIsLoading(true);
    const updatedData = {
      ...values,
      dob: values.dob,
      signup_flow: 'lenderFinancial' as SignUpFlow,
    } as User;
    await updateUserData(updatedData, userData.email);
    router.push(link);
  };

  return (
    <Card
      className={cn(
        'w-full max-w-2xl',
        isLoading && 'pointer-events-none'
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitPersonalInfo)}>
          <CardHeader>
            <CardTitle>Step 1: Personal Information</CardTitle>
            <CardDescription>
              Please fill in the fields below with your information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 pt-2">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your middle name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
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
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value &&
                                  'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value as any}
                            onSelect={(e) => {
                              field.onChange(e);
                              setIsCalendarOpen(false);
                            }}
                            fromYear={1930}
                            toYear={getYear(new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="sin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Social Insurance Number (SIN)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your SIN"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Your SIN will be secured and encrypted
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) =>
                          field.onChange(value)
                        }
                      >
                        <SelectTrigger id="province">
                          <SelectValue placeholder="Select a province" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.keys(canadianProvinces).map(
                              (province) => (
                                <SelectItem
                                  key={province}
                                  value={province}
                                >
                                  {
                                    canadianProvinces[
                                      province as keyof typeof canadianProvinces
                                    ]
                                  }
                                </SelectItem>
                              )
                            )}
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
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your city"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="w-[70%]">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[30%]">
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your postal code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="mx-auto w-full"
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
