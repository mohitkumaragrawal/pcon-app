"use client";

import { ChangeEvent, useState } from "react";
import MyMarkdown from "../my-markdown";
import { Textarea } from "../ui/textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "./editor";

interface MarkdownEditorProps {
  disabled?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  return (
    <div className="rounded-lg border-2 p-2">
      <Tabs defaultValue="editor">
        <TabsList className="w-full">
          <TabsTrigger value="editor" className="flex-1">
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex-1">
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <Editor {...props} />
        </TabsContent>
        <TabsContent value="preview">
          <MyMarkdown className="rounded-md border-2 p-3 text-lg backdrop-blur-sm">
            {props.value}
          </MyMarkdown>
        </TabsContent>
      </Tabs>
    </div>
  );
}
