'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChromeIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// This code needs to change later, this is a copy of sign up
export default function SignUpWrapper() {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
}

function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flowType = searchParams.get('flow');
  const DoSignUp = () => {
    switch (flowType) {
      case 'investor':
        return router.push('/signUp/investor/personal');
      case 'borrower':
        return router.push('/signUp/borrower/personal');
      default:
        router.push('/signUp/accountSetUp');
    }
  };

  return (
    <section className="flex items-center justify-center h-[80vh]">
      <div className="mx-auto max-w-[350px] space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up to continue</h1>
        </div>
        <div>
          <Card>
            <CardContent className="space-y-4">
              <div className="space-y-2 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <Button
                onClick={DoSignUp}
                className="w-full"
                type="submit"
              >
                Sign Up
              </Button>
              <div className="mt-2 flex w-full justify-between">
                <Separator className="my-4 w-2/5" />
                <span className="px-4 pt-1">Or</span>
                <Separator className="my-4 w-2/5" />
              </div>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Sign up with Google
                  <ChromeIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button className="w-full" variant="outline">
                  Sign up with LinkedIn
                  <LinkedinIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  asChild
                  variant="link"
                  className=" text-muted-foreground text-center mx-auto flex justify-center"
                >
                  <Link href="/login">
                    Already have an account? Log In
                  </Link>
                </Button>
                <Separator className="my-8" />
                <Button className="w-full" variant="secondary">
                  Continue as Guest
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
