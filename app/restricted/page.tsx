"use client";

export default function Restricted() {
  return (
    <div className="w-full h-full">
      <div className="-z-10 background--custom absolute inset-0 w-full h-full" />
      <div className="flex h-[60vh] items-center justify-center">
        <h1>This content is available only for owners of the token.</h1>
      </div>
    </div>
  );
}
