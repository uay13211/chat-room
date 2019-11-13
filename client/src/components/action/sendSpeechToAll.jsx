const sendSpeechToAll = data => {
  return {
    type: "SENDSPEECHTOALL",
    data: data
  };
};

export default sendSpeechToAll;
