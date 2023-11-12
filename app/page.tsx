import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-foreground mx-auto w-8/12 p-10">
      {/* Header */}
      <div className="flex w-full justify-between">
        <div className="font-display text-3xl">Secret</div>
        <a
          href="https://github.com/dephraiim/secret"
          className="text-xl text-foreground/60 hover:underline cursor-pointer"
        >
          Github
        </a>
      </div>

      <div className="grow flex justify-center items-center flex-col gap-10">
        <h1 className="text-4xl -mt-20 text-center text-forground cursor-default font-display sm:text-6xl md:text-8xl ">
          Share Secrets Securely
        </h1>
        <Button size="lg" className="text-xl">
          Share
        </Button>
      </div>
    </main>
  );
}
