'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import PersonalInfo from '@/app/(external)/signUp/personalInfo';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import Loader from '@/components/ui/loader';
import FinancialInfo from '@/app/(external)/signUp/[step]/financialInfo';

export default function PersonalEditInfo() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') as string;

  const { userStore } = useUserStore();

  return (
    <div className="flex justify-between mx-auto">
      <Tabs defaultValue={tab} className="w-full m-4">
        <TabsList className="bg-secondary text-primary">
          <TabsTrigger
            className="w-72 max-md:text-xs"
            value="personal"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            className="w-72 max-md:text-xs"
            value="employment"
          >
            Employment and Finances
          </TabsTrigger>
        </TabsList>
        {userStore ? (
          <>
            <TabsContent value="personal">
              <PersonalInfo editMode />
            </TabsContent>
            <TabsContent value="employment">
              <FinancialInfo editMode />
            </TabsContent>
          </>
        ) : (
          <Loader />
        )}
      </Tabs>
    </div>
  );
}
