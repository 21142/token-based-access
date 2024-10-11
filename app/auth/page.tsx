"use client";

import { Button } from "@/components/ui/Button";

export default function Auth() {
  return (
    <div className="flex flex-col gap-y-6 h-[60vh] items-center justify-center">
      <h1>
        You need to confirm ownership of the token to access that content.
      </h1>
      <Button>Proof ownership</Button>
    </div>
  );
}
