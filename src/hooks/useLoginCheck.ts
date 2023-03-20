import axios from "axios";

// Checks if user is logged in
async function useLoginCheck() {
  let loggedIn = false;

  await axios
    .get(`/authenticate`, {
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
