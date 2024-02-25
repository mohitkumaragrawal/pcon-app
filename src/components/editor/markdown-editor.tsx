"use client";

import { ChangeEvent, useState } from "react";
import MyMarkdown from "../my-markdown";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface MarkdownEditorProps {
  disabled?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div className="flex flex-row-reverse">
        <Button
          variant="secondary"
          onClick={(e) => setPreview((p) => !p)}
          type="button"
          className="mb-3"
        >
          {preview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>
      {preview && (
        <MyMarkdown className="rounded-md border-2 p-3 text-lg backdrop-blur-sm">
          {props.value}
        </MyMarkdown>
      )}
      {!preview && (
        <Textarea
          placeholder="Content goes here..."
          className="bg-slate-900/30 px-4 py-4 text-lg backdrop-blur-sm"
          rows={6}
          disabled={props.disabled}
          name={props.name}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          onBlur={props.onBlur}
        />
      )}
    </>
  );
}