import { Session } from "next-auth";

export function hasRole(session: Session, role: string): boolean {
  const roles = session?.user?.roles ?? [];
  if (roles.includes(role)) {
    return true;
  } else {
    return false;
  }
}
