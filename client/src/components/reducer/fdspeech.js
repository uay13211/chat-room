const FdSpeech = (state = [], action) => {
  switch (action.type) {
    case "RECIEVEFDSPEECH":
      return [...state, action.data];
    default:
      return state;
  }
};

export default FdSpeech;
