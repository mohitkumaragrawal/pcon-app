export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <img
      src={imageUrl}
      alt="profile imge"
      className="h-10 w-10 overflow-hidden rounded-full object-cover"
      referrerPolicy="no-referrer"
    />
  );
}
