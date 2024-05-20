import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { format, getYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoanRequest() {
  const [expirationOpen, setExpirationOpen] = useState(false);
  const [payDateOpen, setPayDateOpen] = useState(false);
  const form = useForm();

  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Loan Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="Enter amount" />
            </div>
            <div className="flex flex-col space-y-1">
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payback on</FormLabel>
                    <FormControl>
                      <Popover
                        open={payDateOpen}
                        onOpenChange={setPayDateOpen}
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
                            disabled={{ before: new Date() }}
                            captionLayout="dropdown-buttons"
                            selected={field.value as any}
                            onSelect={(e) => {
                              field.onChange(e);
                              setPayDateOpen(false);
                            }}
                            // fromYear={1930}
                            // toYear={getYear(new Date())}

                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>
                      If this is not specified the loan request will
                      expire after 30 days
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">
                    Healthcare
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                className="min-h-[100px]"
                id="purpose"
                placeholder="Describe the purpose of the loan"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="gratitude">Gratitude</Label>
              <Input
                id="gratitude"
                placeholder="Enter gratitude message (optional)"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <FormField
                control={form.control}
                name="expiration_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date (optional)</FormLabel>
                    <FormControl>
                      <Popover
                        open={expirationOpen}
                        onOpenChange={setExpirationOpen}
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
                            disabled={{ before: new Date() }}
                            captionLayout="dropdown-buttons"
                            selected={field.value as any}
                            onSelect={(e) => {
                              field.onChange(e);
                              setExpirationOpen(false);
                            }}
                            // fromYear={1930}
                            // toYear={getYear(new Date())}

                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>
                      If this is not specified the loan request will
                      expire after 30 days
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
