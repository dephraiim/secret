import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select defaultValue="minutes" name="time">
      <SelectTrigger>
        <SelectValue placeholder="minutes" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="minutes">Minutes</SelectItem>
          <SelectItem value="hours">Hours</SelectItem>
          <SelectItem value="days">Days</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
