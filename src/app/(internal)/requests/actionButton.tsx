'use client';
import { Button } from '@/components/ui';
import { SquarePen } from 'lucide-react';
import React from 'react';

function ApplyButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="font-bold">
      <SquarePen className="h-5 mr-1" />
      Review
    </Button>
  );
}

export default ApplyButton;
