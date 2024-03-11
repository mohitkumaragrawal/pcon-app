import Container from "@/components/container";
import GlitchHeading from "@/components/glitch-heading";
import { UsersDataTable } from "./_components/users-data-table";

export default function UsersPage() {
  return (
    <Container>
      <GlitchHeading className="text-3xl">Users</GlitchHeading>

      <UsersDataTable />
    </Container>
  );
}
