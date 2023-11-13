import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home({}) {
  return (
    <div className="grow flex justify-center items-center flex-col gap-10">
      <h1 className="text-4xl -mt-20 text-center text-forground cursor-default font-display sm:text-6xl md:text-8xl ">
        Share Secrets Securely
      </h1>
      <Link href="/e">
        <Button size="lg" className="text-xl">
          Share
        </Button>
      </Link>
    </div>
  );
}
