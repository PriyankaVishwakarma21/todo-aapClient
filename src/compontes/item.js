import React from "react";
//import ToDo from "../../../models/ToDoModel";

export default function Items({updatechecked,text,remove,update ,checked}){
  
    return(
        <div className="item">
            <input type="checkbox" className="completed" onChange={updatechecked} checked={checked}
            />
            <div className="text">{text}</div>
            <div className="icons">
            <i className="ri-pencil-fill" onClick={update}></i>
            <i className="ri-delete-bin-7-fill" onClick={remove}></i>
            </div>
        </div>
    )
}