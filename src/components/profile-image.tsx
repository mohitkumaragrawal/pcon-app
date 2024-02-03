export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <img
      src={imageUrl}
      alt="profile imge"
      className="w-10 h-10 rounded-full overflow-hidden"
      referrerPolicy="no-referrer"
    />
  );
}
