export interface IModalInfosProps {
  closeModal: any;
  type: "addVisitor" | "sendReport" | "register" | "edited";
  data?: string | undefined;
}
