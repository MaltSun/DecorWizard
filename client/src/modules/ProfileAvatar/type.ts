export interface ProfileAvatarProps {
  userId: string;
  name: string | null;
  avatar: string | null;
  onUpdate: () => void;
}
