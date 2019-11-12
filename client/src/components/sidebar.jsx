import React, {useEffect} from 'react';
import "./css/sidebar.css";
import pp from "./pp.jpg";
import FdListsItem from "./fdListsItem";
import setAllFdLists from "./action/setAllFdLists";
import setSearchedFdLists from "./action/setSearchedFdLists";
import {useSelector, useDispatch} from "react-redux";

export function Sidebar(){
  const allFdLists = useSelector((state)=>state.AllFdLists);
  const searchedFdLists = useSelector((state)=>state.SearchedFdLists);
  const dispatch = useDispatch();

  useEffect(()=>{
    fetch('https://www.balldontlie.io/api/v1/players')
    .then(res => res.json())
    .then(jsonData => {
                        dispatch(setAllFdLists(jsonData.data));
                        dispatch(setSearchedFdLists(jsonData.data));
                        })
    .catch(err => console.log(err));

  }, []);

  function search(e){
    let searchWord = e.target.value.toLowerCase();
    let filterLists = allFdLists.filter(allFd => allFd.first_name.toLowerCase().includes(searchWord));
    dispatch(setSearchedFdLists(filterLists));
  }

    return(
      <div className="sidebar">
        <div className="top-section">
          <div className="icon-left"><img src={pp}></img></div>
          <div className="icon-right">
            <i className="fas fa-sync-alt fa-lg"></i>
            <i className="fas fa-comment-dots fa-lg"></i>
            <i className="fas fa-ellipsis-v fa-lg"></i>
          </div>
        </div>
        <div className='mid-section'>
          <div className="search-group">
            <i className="fas fa-search"></i>
            <input type="text" onChange={search}/>
          </div>
        </div>
        <div className="bottom-section">
          {searchedFdLists.map(filteredFdList => (<FdListsItem key={filteredFdList.id} data={filteredFdList}/>))}
        </div>
      </div>
    )
};
