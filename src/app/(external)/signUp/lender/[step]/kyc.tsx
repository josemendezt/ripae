import { getInveriteAccountInfo } from '@/apis/user/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  CardFooter,
  Form,
} from '@/components/ui';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Label } from 'recharts';

async function KYC() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your identity</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Complete the verification process to continue.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Verify your ID</CardTitle>
          <CardDescription>
            To complete the KYC (Know Your Customer) process, you'll
            need to verify your identity by uploading a valid
            government-issued ID.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default KYC;
