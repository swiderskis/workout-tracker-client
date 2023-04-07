import Session from "../components/Session";
import { SubmitParameters } from "../contexts/SubmitParameters";

function AddSession() {
  return (
    <SubmitParameters.Provider
      value={{ value: "Log session", onSubmit: () => {} }}
    >
      <Session />
    </SubmitParameters.Provider>
  );
}

export default AddSession;
