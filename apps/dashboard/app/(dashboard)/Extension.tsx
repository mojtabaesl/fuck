'use client';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ExtensionProps {
  ticket?: string;
}

export const Extension = ({ ticket }: ExtensionProps) => {
  const [data, setData] = useState<string>('');
  const headRef = useRef(false);
  const langRef = useRef(false);

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
          const parsedData = JSON.parse(event.data);
          let content = parsedData.content;

          if (headRef.current && !langRef.current) {
            content = content + '\n';
            langRef.current = content;
          }
          if (content.includes('```')) {
            if (!headRef.current) {
              content = content.replace(
                /(.*)```(.*)/,
                (_: unknown, b: string, c: string) => `${b}\n\n\`\`\`${c}`
              );
              headRef.current = true;
            } else {
              content = content.replace(
                /(.*)```(.*)/,
                (_: unknown, b: string, c: string) => `${b}\n\n\`\`\`\n\n${c}`
              );
              headRef.current = false;
            }
          }

          setData((data) => data + content);
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
      <Markdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={oneLight}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {data}
      </Markdown>
    </div>
  );
};
