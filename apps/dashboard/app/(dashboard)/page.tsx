import { Flex, Stack } from '@green-intelligence/ui';
import { escapeItalicTag } from '../utils';
import { cookies } from 'next/headers';
import { Extension } from './Extension';
// import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const ticket = cookieStore.get('ticket');
  const data = await fetch('http://shserver.top:8080/test/users/getData', {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${ticket?.value}` },
  });
  const res = await data.json();

  return (
    <Stack className="gap-10 grow items-center pt-10">
      <Flex className="justify-center items-center rounded-lg shadow-lg w-96 h-20 bg-emerald-50">
        <div
          dangerouslySetInnerHTML={{ __html: escapeItalicTag(res.result) }}
        />
      </Flex>
      <div className="rounded-lg w-[1000px]">
        <Extension ticket={ticket?.value} />
      </div>
    </Stack>
  );
}
