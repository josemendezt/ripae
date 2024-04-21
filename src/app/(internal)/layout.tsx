import '../globals.css';
import QueryProviderWrapper from './QueryProviderWrapper';
import ToasterWrapper from './ToasterWrapper';
import AuthHeader from './auth-header-wrapper';
import Sidebar from './sidebar';
export const metadata = {
  title: 'Welcome to Ripae!',
  description: 'Best peer to peer platform',
};

export default function IntLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <div className="flex">
        <Sidebar />
        <QueryProviderWrapper>{children}</QueryProviderWrapper>
        <ToasterWrapper />
      </div>
    </>
  );
}
