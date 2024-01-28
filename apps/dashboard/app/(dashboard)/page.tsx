import { Flex, Stack } from '@green-intelligence/ui';
import { escapeItalicTag } from '../utils';
import { cookies } from 'next/headers';
import { Extension } from './Extension';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const ticket = cookieStore.get('ticket');
  const data = await fetch('http://shserver.top:8080/test/users/getData', {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${ticket?.value}` },
  });
  const res = await data.json();

  return (
    <Stack className="gap-10 grow justify-center items-center">
      <Flex className="justify-center items-center rounded-lg shadow-lg w-96 h-96 bg-emerald-100">
        <div
          dangerouslySetInnerHTML={{ __html: escapeItalicTag(res.result) }}
        />
      </Flex>
      <Stack className="rounded-lg shadow-lg max-w-7xl bg-emerald-100">
        <Extension ticket={ticket?.value} />
      </Stack>
    </Stack>
  );
}
