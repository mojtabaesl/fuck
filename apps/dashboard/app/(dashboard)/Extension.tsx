'use client';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

interface ExtensionProps {
  ticket?: string;
}

export const Extension = ({ ticket }: ExtensionProps) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource('http://shserver.top:8080/test/users/getCode', {
        method: 'POST',
        body: JSON.stringify({ message: 'Write me a chrome extension code' }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ticket}`,
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log('Connection made ', res);
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            console.log('Client side error ', res);
          }
        },
        onmessage(event) {
          console.log(event.data);
          const parsedData = JSON.parse(event.data);
          setData((data) => [...data, parsedData.content]);
        },
        onclose() {
          console.log('Connection closed by the server');
        },
        onerror(err) {
          console.log('There was an error from server', err);
        },
      });
    };
    fetchData();
  }, [ticket]);
  return (
    <div>
      <Markdown>{data.join('')}</Markdown>
    </div>
  );
};
