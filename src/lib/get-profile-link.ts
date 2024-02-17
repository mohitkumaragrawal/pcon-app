export default function getProfileLink(id: string, username?: string) {
  if (username) return `/profile/${username}`;
  return `/profile/_${id}`;
}
