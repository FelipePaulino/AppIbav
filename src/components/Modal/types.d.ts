import { ReactNode } from "react";

export interface IContentProps {
  onBackdropPress: () => void;
  isVisible: boolean;
  children: ReactNode;
}
