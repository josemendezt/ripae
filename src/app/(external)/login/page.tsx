'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
//import { ChromeIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { signInUpWithEmail } from '../../../apis/user/client';
import { Loader2 } from 'lucide-react';
import SuccessEmailSent from '../signUp/SuccessEmailSent';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [linkWasSent, setLinkWasSent] = useState(false);

  const doLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setIsLoading(true);

    const loggedData = await signInUpWithEmail(formData, false);

    if (loggedData.error) {
      setError(
        'Something went wrong, please verify this user is registered'
      );
    } else {
      setLinkWasSent(true);
    }

    setIsLoading(false);
  };

  return (
    <section className="flex items-center justify-center h-[85vh]">
      <div className="mx-auto max-w-[350px] space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log in to continue</h1>
        </div>
        <div>
          <Card>
            <form onSubmit={doLogin}>
              <CardContent className="space-y-4">
                {linkWasSent ? (
                  <SuccessEmailSent />
                ) : (
                  <>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        type="email"
                      />
                      {error && (
                        <div className="text-red-500">{error}</div>
                      )}
                    </div>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      Login{' '}
                      {isLoading && (
                        <Loader2 className="animate-spin  ml-2" />
                      )}
                    </Button>
                    {/* <div className="mt-2 flex w-full justify-between">
                <Separator className="my-4 w-2/5" />
                <span className="px-4 pt-1">Or</span>
                <Separator className="my-4 w-2/5" />
              </div> */}
                    <div className="space-y-4">
                      {/* <Button className="w-full" variant="outline">
                  Log in with Google
                  <ChromeIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button className="w-full" variant="outline">
                  Log in with LinkedIn
                  <LinkedinIcon className="w-4 h-4 ml-2" />
                </Button> */}
                      <Button
                        asChild
                        variant="link"
                        className=" text-muted-foreground text-center mx-auto flex justify-center"
                      >
                        <Link href="/signUp">
                          Don`t have an account? Sign up
                        </Link>
                      </Button>
                      {/* <Separator className="my-8" /> */}
                      {/* <Button className="w-full" variant="secondary">
                  Continue as Guest
                </Button> */}
                    </div>
                  </>
                )}
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
