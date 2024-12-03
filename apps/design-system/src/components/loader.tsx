import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="fixed bg-neutral-white w-full h-full top-0 left-0 flex justify-center items-center">
      Loading...
    </div>
  );
};

export default Loader;
