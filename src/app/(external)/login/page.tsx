'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChromeIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const doLogin = () => {
    router.push('/dashboardInvestor');
  };

  return (
    <section className="flex items-center justify-center h-[85vh]">
      <div className="mx-auto max-w-[350px] space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Log in to continue</h1>
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
                onClick={doLogin}
                className="w-full"
                type="submit"
              >
                Login
              </Button>
              <div className="mt-2 flex w-full justify-between">
                <Separator className="my-4 w-2/5" />
                <span className="px-4 pt-1">Or</span>
                <Separator className="my-4 w-2/5" />
              </div>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Log in with Google
                  <ChromeIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button className="w-full" variant="outline">
                  Log in with LinkedIn
                  <LinkedinIcon className="w-4 h-4 ml-2" />
                </Button>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
