const Message = (state = [], action) => {
  switch (action.type) {
    case "SETMESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export default Message;
