import React from "react";

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="">
      <div className="">
        <main className="">{children}</main>
      </div>
    </div>
  );
}
