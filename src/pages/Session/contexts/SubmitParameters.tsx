import { createContext } from "react";

export const SubmitParameters = createContext({
  value: "",
  onSubmit: () => {},
});
