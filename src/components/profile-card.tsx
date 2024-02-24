type Profile = {
  SocialMediaHandle: {
    id: string;
    type: string;
    handle: string;
    userId: string;
  }[];
  UserRoles: {
    id: string;
    userId: string;
    role: string;
  }[];
} & {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  username: string;
  gender: string;
};

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {}
