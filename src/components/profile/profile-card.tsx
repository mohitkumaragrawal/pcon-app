import { Session } from "next-auth";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function ProfileCard({ session }: { session: Session }) {
  return (
    <Card className="bg-slate-800/30 backdrop-blur-lg md:min-w-80">
      <CardBody>
        <div className="flex flex-col items-center py-8">
          <div className="text-center flex justify-center">
            <img
              src={session.user.image}
              alt="Profile picture"
              className="w-40 h-40 rounded-full border-2 border-cyan-300/40"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-2xl font-bold mt-8">{session.user.name}</p>
          <p className="opacity-80">{session.user.email}</p>
        </div>
      </CardBody>
    </Card>
  );
}
