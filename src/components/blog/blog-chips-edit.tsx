"use client";

import { Chip } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";

interface Props {
  allowedChips: string[];
  chips: string[];
  onChipsChange: (chips: string[]) => void;
}

export default function BlogChipsEdit({
  allowedChips,
  chips: chipsProp,
  onChipsChange,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  let chips = chipsProp ?? [];
  const autocompleteChips = allowedChips.filter(
    (chip) => !chips?.includes(chip),
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips?.length === 0 && (
        <p className="text-sm text-muted-foreground">No tags</p>
      )}
      <div className="flex space-x-2">
        {chips?.map((chip) => (
          <Chip
            key={chip}
            onClose={() => {
              onChipsChange(chips?.filter((c) => c !== chip));
            }}
            variant="bordered"
          >
            {chip}
          </Chip>
        ))}
      </div>
      <Autocomplete
        label="Add Tags"
        inputValue={inputValue}
        onInputChange={(e) => setInputValue(e)}
        onSelectionChange={(e) => {
          if (autocompleteChips.includes(e as string))
            onChipsChange([...chips, e as string]);

          setInputValue("");
        }}
        variant="bordered"
        classNames={{
          endContentWrapper: "bg-transparent",
          popoverContent: "bg-slate-900 border-2 border-slate-900/70",
        }}
      >
        {autocompleteChips.map((chip) => (
          <AutocompleteItem key={chip}>{chip}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
