import { Flex, FlexProps } from '../Flex';

export interface StackProps extends FlexProps {}

export const Stack = ({ children, ...rest }: StackProps) => {
  return (
    <Flex direction="flex-col" {...rest}>
      {children}
    </Flex>
  );
};
