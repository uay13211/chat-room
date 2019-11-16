const setUsername = username => {
  return {
    type: "SETUSERNAME",
    data: username
  };
};

export default setUsername;
