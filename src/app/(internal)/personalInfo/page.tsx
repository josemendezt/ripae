'use client';
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Sidebar from '../sidebar';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import PersonalInfo from '@/app/(external)/signUp/personalInfo';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import Loader from '@/components/ui/loader';
import FinancialInfo from '@/app/(external)/signUp/lender/[step]/financialInfo';
import ComplianceInfo from '@/app/(external)/signUp/lender/[step]/ComplianceInfo';

export default function PersonalEditInfo() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') as string;

  const { userStore } = useUserStore();

  return (
    <div className="flex justify-between mx-auto">
      <Tabs defaultValue={tab} className="w-full m-4">
        <TabsList className="bg-secondary text-primary">
          <TabsTrigger
            className="w-60 max-md:w-20 max-md:text-xs"
            value="personal"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            className="w-60 max-md:w-40 max-md:text-xs"
            value="employment"
          >
            Employment and Finances
          </TabsTrigger>
          <TabsTrigger
            className="w-60 max-md:w-20  max-md:text-xs"
            value="compliance"
          >
            Compliance
          </TabsTrigger>
          {/* <TabsTrigger
            className="w-60 max-md:w-36  max-md:text-xs"
            value="verification"
          >
            ID and Bank Verification
          </TabsTrigger> */}
        </TabsList>
        {userStore ? (
          <>
            <TabsContent value="personal">
              <PersonalInfo editMode />
            </TabsContent>
            <TabsContent value="employment">
              <FinancialInfo editMode />
            </TabsContent>
            <TabsContent value="compliance">
              <ComplianceInfo editMode />
            </TabsContent>
          </>
        ) : (
          <Loader />
        )}
        {/* <TabsContent value="verification">
          You will be able to se
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
