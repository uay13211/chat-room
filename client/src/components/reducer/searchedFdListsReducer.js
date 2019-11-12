const SearchedFdLists = (state = [], action) => {
  switch(action.type){
    case "SETSEARCHEDFDLISTS":
      return action.data;
    default:
      return state;
  }
}

export default SearchedFdLists;
