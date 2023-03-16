import axios from "axios";

async function useLoginCheck() {
  let loggedIn = false;

  await axios
    .get(`/authorise`, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((res) => {
      loggedIn = true;
    })
    .catch((err) => {
      loggedIn = false;
    });

  return loggedIn;
}

export default useLoginCheck;
