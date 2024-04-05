import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import React from "react";

function successMsg() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <CheckCircleIcon className="text-green-500 w-12 h-12" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/tight">
          Congratulations!
        </h1>
        <p className="max-w-[600px] text-gray-500">
          Your loan proposals were created successfully, now borrowers can apply
          to your loans. If you have any question, please contact us at
          info@ripae.ca
        </p>
      </div>

      <Button className="w-[80%] mt-4" asChild>
        <Link href="/dashboardLender">Go Home</Link>
      </Button>
    </div>
  );
}

export default successMsg;
