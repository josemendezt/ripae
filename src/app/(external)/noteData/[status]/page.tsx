'use client';
import { Button } from '@/components/ui';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import SuccessLoan from './successLoan';
import PendingLoan from './PendingLoan';
import RejectedLoan from './rejectedLoan';
import SuccessRequest from '../successRequest';

function NoteData() {
  const { status } = useParams<{ status: string }>();

  const getLoanComponent = () => {
    switch (status) {
      case 'success':
        return <SuccessLoan />;
      case 'pending':
        return <PendingLoan />;
      case 'request':
        return <SuccessRequest />;
      default:
        return <RejectedLoan />;
    }
  };

  return <>{getLoanComponent()}</>;
}

export default NoteData;
