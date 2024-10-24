import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-md mx-auto h-[100vh] flex items-center '>
      {children}
    </div>
  );
}
