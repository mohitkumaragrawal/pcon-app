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

  const imgRef = useRef();
  const filePickerRef = useRef();
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
          "h-[40vw] max-h-[60vh] border mx-auto rounded my-4 bg-slate-700/20 grid place-content-center relative",
          isDragOver ? "bg-slate-700/50" : ""
        )}
      >
        {props.file && (
          <Button
            className="absolute right-3 top-3"
            variant="destructive"
            onClick={(e) => props.onFileChange(null)}
          >
            <Trash />
          </Button>
        )}
        {props.file && (
          <img
            ref={imgRef}
            alt="Preview Image"
            className="absolute bg-black bottom-0 top-0 h-full object-cover left-1/2 -translate-x-1/2"
          />
        )}
        {!props.file && (
          <p>{isDragOver ? "DROP IT!" : "Drag and drop your image here!"}</p>
        )}
      </div>
      <Button
        variant="secondary"
        className="w-full"
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
