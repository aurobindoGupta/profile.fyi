"use client";

import Products from "./Products/page";

export default function Home() {
  return (
    <main className="flex max-h-full flex-col items-center justify-between">
      <Products />
    </main>
  );
}
