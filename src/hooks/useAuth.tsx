import { useContext } from "react";
import { AuthenticatedContext } from "../contexts/Auth";

export function useAuth() {
  const user = useContext(AuthenticatedContext);

  return user;
}
