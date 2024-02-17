import { Session } from "next-auth";

export function hasRole(session: Session, role: string): boolean {
  const roles = session?.user?.roles ?? [];
  if (roles.includes(role)) {
    return true;
  } else {
    return false;
  }
}

export function hasRoleInArray(userRoles: string[] | null, role: string): boolean {
  const roles = userRoles ?? [];
  if (roles.includes(role)) {
    return true;
  } else {
    return false;
  }
}
