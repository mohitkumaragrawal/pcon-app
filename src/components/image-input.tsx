/* eslint-disable @next/next/no-img-element */
"use client";
import { DragEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

interface ImageInputProps {
  file: File;
  onFileChange: (e: File) => void;
}

export default function ImageInput(props: ImageInputProps) {
  // const [file, setFile] = useState<File>(null);

  const imgRef = useRef<HTMLImageElement>();
  const filePickerRef = useRef<HTMLInputElement>();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setIsDragOver(false);

    props.onFileChange(ev.dataTransfer.files[0]);
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (ev) => {
    if (isDragOver) setIsDragOver(false);
  };

  useEffect(() => {
    if (!props.file) return;
    const src = URL.createObjectURL(props.file);

    if (imgRef.current) {
      imgRef.current.src = src;
    }
  }, [props.file]);

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative mx-auto my-4 grid h-[40vw] max-h-[60vh] place-content-center rounded border bg-slate-700/20",
          isDragOver ? "bg-slate-700/50" : "",
        )}
      >
        {props.file && (
          <Button
            className="absolute right-3 top-3 z-10"
            variant="destructive"
            type="button"
            onClick={(e) => props.onFileChange(null)}
          >
            <Trash />
          </Button>
        )}
        {props.file && (
          <img
            ref={imgRef}
            alt="Preview Image"
            className="absolute bottom-0 left-1/2 top-0 h-full w-full -translate-x-1/2 object-contain bg-grid-ring"
          />
        )}
        {!props.file && (
          <p>{isDragOver ? "DROP IT!" : "Drag and drop your image here!"}</p>
        )}
      </div>
      <Button
        variant="secondary"
        className="w-full"
        type="button"
        onClick={(e) => {
          filePickerRef?.current?.click();
        }}
      >
        Chooose Image
      </Button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={filePickerRef}
        onChange={(e) => {
          if (e.target.files.length > 0) props.onFileChange(e.target.files[0]);
        }}
      />
    </div>
  );
}
