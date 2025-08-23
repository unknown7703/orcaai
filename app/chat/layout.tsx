import type { ReactNode } from 'react';

export default function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col h-full w-full">
      {children}
    </section>
  );
}
