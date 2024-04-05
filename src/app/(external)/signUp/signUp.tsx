"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChromeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useOptimistic } from "react";
import { signInUpWithEmail } from "./server-actions";
import { signInWithGoogle } from "./client-actions";
import SuccessEmailSent from "./SuccessEmailSent";
import { SubmitButton } from "./submit-button";

export default function SignUpWrapper() {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
}

function SignUp() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  //const flowType = searchParams.get('flow');

  const [linkWasSent, setLinkWasSent] = useState(false);
  const [isLoading, setIsLoading] = useOptimistic(false);

  return (
    <section className="flex items-center justify-center h-[80vh]">
      <div className="mx-auto max-w-[350px] space-y-6 ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up to continue</h1>
        </div>
        <Card className="w-[350px]">
          <CardContent className="space-y-4">
            {linkWasSent ? (
              <SuccessEmailSent />
            ) : (
              <>
                <form
                  action={async (e) => {
                    const shouldCreateUser = true;
                    setIsLoading(true);
                    await signInUpWithEmail(e, shouldCreateUser);
                    setLinkWasSent(true);
                  }}
                >
                  <div className="space-y-2 my-6">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      required
                      name="email"
                      type="email"
                    />
                  </div>
                  <SubmitButton />
                  {/* <div className="mt-2 flex w-full justify-between">
                    <Separator className="my-4 w-2/5" />
                    <span className="px-4 pt-1">Or</span>
                    <Separator className="my-4 w-2/5" />
                  </div> */}
                </form>
                <div className="space-y-4">
                  {/* <Button
                    onClick={signInWithGoogle}
                    className="w-full"
                    variant="outline"
                    disabled={isLoading}
                  >
                    Sign up with Google
                    <ChromeIcon className="w-4 h-4 ml-2" />
                  </Button> */}
                  <Button
                    asChild
                    variant="link"
                    className=" text-muted-foreground text-center mx-auto flex justify-center"
                  >
                    <Link href="/login">Already have an account? Log In</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
