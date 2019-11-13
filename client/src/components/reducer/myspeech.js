const MySpeech = (state = [], action) => {
  switch (action.type) {
    case "SENDSPEECHTOALL":
      return [...state, action.data];
    default:
      return state;
  }
};

export default MySpeech;
