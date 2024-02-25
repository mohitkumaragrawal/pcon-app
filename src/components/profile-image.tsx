import { cn } from "@/lib/utils";

export default function ProfileImage({
  imageUrl,
  className,
}: {
  imageUrl: string;
  className?: string;
}) {
  return (
    <img
      src={imageUrl}
      alt="profile imge"
      className={cn(
        "h-10 w-10 overflow-hidden rounded-full object-cover",
        className,
      )}
      referrerPolicy="no-referrer"
    />
  );
}
