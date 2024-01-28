import { Flex } from '@green-intelligence/ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Flex className="h-full">{children}</Flex>;
}
