import type { PropsWithChildren, FC } from 'react';

type Props = PropsWithChildren<{ className?: string }>;

export const Card: FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
