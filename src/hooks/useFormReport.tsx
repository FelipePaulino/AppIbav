import { useContext } from "react";
import { FormReportContext } from "../contexts/FormReport";

export const useFormReport = () => {
  const context = useContext(FormReportContext);

  if (context === undefined) {
    throw new Error("useFormReport precisa ser usado dentro do FormProvider");
  }

  return context;
};
