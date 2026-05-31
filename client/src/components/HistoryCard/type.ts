export interface HistoryCardProps {
  imageSrc: string;
  title: string;
  prompt: string;
  onClick?: () => void;
  onDelete: () => void;
}
