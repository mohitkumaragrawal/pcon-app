import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

/* eslint-disable @next/next/no-img-element */
interface AchievementCardProps {
  achievement: {
    title: string;
    blogId: string;
    createdAt: Date;
    updatedAt: Date;
    poster: {
      imageUrl: string;
    };
  };
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="flex flex-col gap-2 border-2 bg-slate-800/30 bg-blend-multiply bg-grid-small-cyan-600/[0.8] sm:flex-row">
      {/* // <Card className="flex flex-col sm:flex-row"> */}
      <div className="relative flex h-full flex-1 items-center justify-center p-2">
        <img
          src={achievement.poster.imageUrl}
          alt="achievement image"
          className="h-full w-full rounded-xl object-cover opacity-90 shadow-lg shadow-slate-400/20 transition-all hover:opacity-100"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between bg-slate-900/20 sm:ml-0">
        <p className="mt-4 text-xl font-bold">{achievement.title}</p>

        <Link href={`/blogs/${achievement.blogId}`}>
          <Button variant="outline" className="mb-4 mr-4 mt-4">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
}
