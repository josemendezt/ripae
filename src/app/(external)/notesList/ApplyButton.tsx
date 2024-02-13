'use client';
import { Button } from '@/components/ui';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function ApplyButton() {
  return (
    <Link href="/dashboardBorrower">
      <Button className="w-[90%] mb-4 font-bold">
        <SquarePen className="h-5 mr-1" />
        Apply
      </Button>
    </Link>
  );
}

export default ApplyButton;
