"use client";

import { encryptAction } from "@/actions/encrypt";
import { SelectDemo } from "@/components/app/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ZodIssue } from "zod";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

const initialState: {
  encrypted: boolean | null;
  id: string | null;
  error: ZodIssue[] | string | null;
} = {
  encrypted: null,
  id: null,
  error: null,
};

export default function EncryptSecretPage() {
  const { pending } = useFormStatus();
  const status = useFormStatus();

  const [state, formAction] = useFormState(encryptAction, initialState);

  if (state.error instanceof Array) {
    state.error.forEach((err) =>
      toast.error(
        (err.path[0] as string)[0].toUpperCase() +
          (err.path[0] as string).slice(1),
        {
          duration: 5000,
          description: err.message,
        }
      )
    );
  }

  if (state.encrypted) {
    return (
      <div className="grow p-10 flex items-center flex-col justify-center gap-5">
        <h1 className="text-5xl font-display text-center">Secret Created</h1>

        <p>Everything is ready, here is the link to your secret.</p>

        <div className="border border-foreground p-2 px-4 rounded-xl flex gap-4 hover:text-foreground/60 hover:border-foreground/60">
          <p className="font-code">https://localhost:3000/s/{state.id}</p>

          <CopyIcon
            strokeWidth={1}
            width={16}
            className="cursor-pointer hover:text-foreground/80 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://localhost:3000/s/${state.id}`
              );
              toast.success("Link Copied");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <form className="w-full p-10" action={formAction}>
      <h1 className="text-5xl font-display my-4 text-center">
        Secure and Share
      </h1>
      <div className="grid w-full gap-4 mt-10">
        <Textarea
          className="placeholder:text-foreground/30 min-h-[200px]"
          placeholder="A very secret secret..."
          id="secret"
          name="secret"
        />

        <div className="flex justify-between gap-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="reads">Reads</Label>
            <Input type="text" id="reads" name="reads" placeholder="999" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="ttl">TTL</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                id="ttl"
                name="ttl"
                placeholder="24"
                defaultValue={1}
              />
              <SelectDemo />
            </div>
          </div>
        </div>

        <Button aria-disabled={pending} type="submit">
          Secure Secret
        </Button>
      </div>
    </form>
  );
}
