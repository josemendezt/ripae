import React from 'react';
import { Card, CardContent } from './card';
import { Blocks } from 'lucide-react';
import Link from 'next/link';

function EmptyPlaceholder({
  message,
  link,
  linkMsg,
}: {
  message: string;
  link?: string;
  linkMsg?: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col justify-center items-center">
        <Blocks className="h-80 w-80 max-w-full text-primary" />
        <div className="text-xl mb-1 w-[800px] max-w-[70%] text-center">
          {message}
          {link && linkMsg && (
            <Link
              className="ml-1 cursor:pointer text-primary hover:underline font-semibold"
              href={link}
            >
              {linkMsg}
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EmptyPlaceholder;
