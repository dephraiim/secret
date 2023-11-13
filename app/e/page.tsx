"use client";

import { encryptAction } from "@/actions/encrypt";
import { SelectDemo } from "@/components/app/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: { encrypted: boolean | null; id: string | null } = {
  encrypted: null,
  id: null,
};

export default function EncryptSecretPage() {
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(encryptAction, initialState);

  if (state.encrypted) {
    return (
      <div>
        Encrypted
        <div>{state.id}</div>
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
                defaultValue={0}
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
