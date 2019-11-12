const AllFdLists = (state = [], action) => {
  switch(action.type){
    case "SETAllFDLISTS":
      return action.data;
    default:
      return state;
  }
}

export default AllFdLists;
