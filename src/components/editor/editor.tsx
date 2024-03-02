"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FaMarkdown } from "react-icons/fa";
import Link from "next/link";
import { SiLatex } from "react-icons/si";
import {
  BoldIcon,
  Heading,
  ImageIcon,
  ItalicIcon,
  QuoteIcon,
} from "lucide-react";
import ImageDialog from "../image-dialog";
import { uploadImageForm } from "@/actions/uploadImageForm";

interface EditorProps {
  disabled?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
function ActionButton(props: ActionButtonProps) {
  return (
    <div
      className="cursor-pointer rounded-md p-3 transition-all hover:bg-black/[0.3]"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default function Editor(props: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);

  const focusTextarea = () => {
    const textarea = editorRef.current;
    if (!textarea) return;
    textarea.focus();

    // dirty way to trigger onChange
    props.onChange({ target: textarea } as ChangeEvent<HTMLTextAreaElement>);
  };

  const handleImageUpload = async (image: File) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const form = new FormData();
    form.append("image", image);

    const img = await uploadImageForm(form);

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    const toInsert = `![${img.title}](${img.imageUrl})`;

    textarea.value =
      textarea.value.substring(0, selectionStart) +
      toInsert +
      textarea.value.substring(selectionEnd);

    setOpen(false);
    focusTextarea();
  };

  const lineBegin = (text: string, position: number) => {
    // return the position of the beginning of the line from the current position
    let i = position;
    while (i > 0 && text[i] !== "\n") i--;
    return i;
  };

  const toggleLine = (prefix: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    const begins = lineBegin(textarea.value, selectionStart);

    if (textarea.value.substring(begins, begins + prefix.length) === prefix) {
      textarea.value =
        textarea.value.substring(0, begins) +
        textarea.value.substring(begins + prefix.length);

      textarea.setSelectionRange(
        selectionStart - prefix.length,
        selectionEnd - prefix.length,
      );
    } else {
      textarea.value =
        textarea.value.substring(0, begins) +
        prefix +
        textarea.value.substring(begins);

      textarea.setSelectionRange(
        selectionStart + prefix.length,
        selectionEnd + prefix.length,
      );
    }

    focusTextarea();
  };

  const surroundWith = (chars: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const textBefore = textarea.value.substring(0, textarea.selectionStart);
    const textAfter = textarea.value.substring(textarea.selectionEnd);

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (selectionStart === selectionEnd) {
      textarea.value =
        textarea.value.substring(0, selectionStart) +
        chars +
        chars +
        textarea.value.substring(textarea.selectionEnd);
    } else {
      textarea.value =
        textBefore +
        chars +
        textarea.value.substring(
          textarea.selectionStart,
          textarea.selectionEnd,
        ) +
        chars +
        textAfter;
    }

    // selected the text again
    textarea.setSelectionRange(
      selectionStart + chars.length,
      selectionEnd + chars.length,
    );

    focusTextarea();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-3 overflow-auto rounded-md border-2 bg-slate-900/[0.6]">
        <ActionButton onClick={() => surroundWith("**")}>
          <BoldIcon />
        </ActionButton>
        <ActionButton onClick={() => surroundWith("_")}>
          <ItalicIcon />
        </ActionButton>
        <ImageDialog
          onSubmit={handleImageUpload}
          open={open}
          onOpenChange={setOpen}
        >
          <ActionButton>
            <ImageIcon />
          </ActionButton>
        </ImageDialog>
        <ActionButton onClick={() => toggleLine("### ")}>
          <Heading />
        </ActionButton>
        <ActionButton onClick={() => toggleLine("> ")}>
          <QuoteIcon />
        </ActionButton>
      </div>

      <Textarea
        placeholder="Content goes here..."
        className="bg-slate-900/30 px-4 py-4 text-lg backdrop-blur-sm"
        rows={12}
        disabled={props.disabled}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        onBlur={props.onBlur}
        ref={editorRef}
      />
      <div className="flex flex-wrap gap-3">
        <Link href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax">
          <Button type="button" variant="link">
            <FaMarkdown className="mr-2" />
            Markdown
          </Button>
        </Link>

        <Link href="https://ashki23.github.io/markdown-latex.html">
          <Button type="button" variant="link">
            <SiLatex className="mr-2" />
            LaTeX
          </Button>
        </Link>
      </div>
    </div>
  );
}
