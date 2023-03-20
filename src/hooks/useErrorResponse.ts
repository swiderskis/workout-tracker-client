// Used to handle setting error text if API call returns an error
function useErrorResponse(err: any) {
  if (!err.response || err.response.status >= 500)
    return "A server error has occurred, please try again later";

  return err.response.data;
}

export default useErrorResponse;
