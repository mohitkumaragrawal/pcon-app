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
    <div className="border-2 flex flex-col sm:flex-row bg-slate-800/30 bg-grid-small-cyan-600/[0.8] bg-blend-multiply gap-2">
      {/* // <Card className="flex flex-col sm:flex-row"> */}
      <div className="h-full relative flex items-center justify-center p-2 flex-1">
        <img
          src={achievement.poster.imageUrl}
          alt="achievement image"
          className="w-full h-full object-cover shadow-lg rounded-xl shadow-slate-400/20 opacity-90 hover:opacity-100 transition-all"
        />
      </div>

      <div className="bg-slate-900/20 flex-1 flex flex-col justify-between ml-4 sm:ml-0">
        <p className="font-bold text-xl mt-4">{achievement.title}</p>

        <Link href={`/blogs/${achievement.blogId}`}>
          <Button variant="outline" className="mb-4 mr-4 mt-4">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
}
