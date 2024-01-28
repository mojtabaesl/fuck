import { clsx } from 'clsx';
import { Loading } from '../Loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading: boolean;
}

export const Button = ({
  isLoading,
  children,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'bg-emerald-600 text-white hover:bg-emerald-600/90',
        'h-10 px-4 py-2',
        className
      )}
      {...rest}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};
