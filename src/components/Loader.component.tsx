import React, { memo, ReactNode } from 'react';
import CustomImage from './CustomImage.component';
import { useGlobalContext } from '../context/Global.context';

interface LoaderProps {}
const Loader: React.FC<LoaderProps> = ({}) => {
  const { isLoading } = useGlobalContext();
  if (!isLoading) return null;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black flex flex-col items-center justify-center">
      <CustomImage name="bouncingCircles" className="w-40 h-40" />
    </div>
  );
};
export default memo(Loader);
