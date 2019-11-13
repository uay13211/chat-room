const receiveFdSpeech = data => {
  return {
    type: "RECIEVEFDSPEECH",
    data: data
  };
};

export default receiveFdSpeech;
