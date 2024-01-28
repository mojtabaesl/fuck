import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'flex-col' | 'flex-row' | 'flex-col-reverse' | 'flex-row-reverse';
}

export const Flex = ({
  direction = 'flex-row',
  children,
  className,
}: FlexProps) => {
  return <div className={clsx('flex', direction, className)}>{children}</div>;
};
