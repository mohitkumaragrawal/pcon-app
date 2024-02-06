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
    <div className="flex gap-3">
      {/* < src={achievement.poster.imageUrl} /> */}

      <p>{achievement.title}</p>
    </div>
  );
}
