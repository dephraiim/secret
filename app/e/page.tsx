import { SelectDemo } from "@/components/app/Select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function page() {
  return (
    <div className="w-full p-10">
      <h1 className="text-5xl font-display my-4 text-center">
        Secure and Share
      </h1>
      <div className="grid w-full gap-4 mt-10">
        <Textarea
          className="placeholder:text-foreground/30 min-h-[200px]"
          placeholder="A very secret secret..."
        />

        <div className="flex justify-between gap-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="reads">Reads</Label>
            <Input type="text" id="reads" placeholder="999" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="reads">TTL</Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="24" />
              <SelectDemo />
            </div>
          </div>
        </div>

        <Button>Secure Secret</Button>
      </div>
    </div>
  );
}
