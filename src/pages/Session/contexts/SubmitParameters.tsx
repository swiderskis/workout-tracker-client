import { createContext } from "react";
import { SessionDetails } from "../../../interfaces/SessionInformation";

export const SubmitParameters = createContext({
  value: "",
  onSubmit: async (session: SessionDetails) => {
    return { isError: false, errorText: "" };
  },
});
