interface TextProps {
  size: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  children: React.ReactNode;
  as: keyof JSX.IntrinsicElements;
}

export const Text = ({ as = 'p', children, size, ...rest }: TextProps) => {
  const Tag = as;
  return (
    <Tag className={`text-${size}`} {...rest}>
      {children}
    </Tag>
  );
};
