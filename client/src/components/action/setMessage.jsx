const setMessage = data => {
  return {
    type: "SETMESSAGE",
    payload: data
  };
};

export default setMessage;
