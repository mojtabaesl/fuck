import './global.css';

export const metadata = {
  title: 'Welcome to dashboard',
  description: 'Green Intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
