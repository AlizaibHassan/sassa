import React from 'react';
import clsx from 'clsx';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;  // Optional className prop
  innerClassName?: string;  // Optional className for the inner div
}

function ContentWrapper({ children, className, innerClassName }: ContentWrapperProps) {
  return (
    <div className={clsx('w-2/3 mx-auto py-10 flex flex-col items-center', className)}>
      <div className={clsx('flex-grow w-full', innerClassName)}>
        {children}
      </div>
    </div>
  );
}

export default ContentWrapper;
