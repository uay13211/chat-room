const Username = (state = "", action) => {
  switch (action.type) {
    case "SETUSERNAME":
      return action.data;
    default:
      return state;
  }
};

export default Username;
