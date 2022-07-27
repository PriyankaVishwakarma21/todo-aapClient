import './App.css';
import { useState, useEffect } from 'react';
import Items from './compontes/item';
import axios from 'axios';
function App() {
  const [completed, setCompleted] = useState(false);
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/get-todo")
      .then((res) => {
        console.log(res.data);
        setTodo(res.data)
        console.log("datda",res.data)
        
      })
      .catch((err) => { console.log(err) });
  },[]);

  const addUpdate = () => {
    if (isUpdating === "") {

      axios.post("http://localhost:5000/save-todo", { text, completed })

        .then((res) => {
          console.log(res.data);
          setText("");
          setTodo([...todo,{text:text}]);
          console.log("avgvdc",text)
          setCompleted(false);
        })
        .catch((err) => { console.log(err) });
    } else {
      axios.post("http://localhost:5000/update-todo", {_id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
        const newData = todo.map((item) => {
            if (isUpdating === "Update") {
              console.log(item.text);
                const updatedItem = {
                    ...item,text
                };
                return updatedItem;
            }
            return item;
        });
    //  setText(newData); 
         setTodo([...todo,newData]);
         setTodo([...todo,{text:text}]);
        setText("");
          setUpdating(false);
        })
        .catch((err) => { console.log(err) });
    }
  }
  
  const deleteTodo = (_id) => {
    console.log(_id);
    axios.post("http://localhost:5000/delete-todo", { _id })
      .then((res) => {
        console.log(res.data);
        setTodo(todo.filter((mode) =>{ return mode._id!==_id}));
      })
      .catch((err) => { console.log(err) });
  }
  const deleteTodosByIds=()=>{
    // let arrayIds = [];
    // todo.forEach(d=>{
    //   arrayIds.push(d._id);
    // })
    // console.log(arrayIds);
    axios.post("http://localhost:5000/delete-todos")
    .then((res)=>{
      // console.log(res.data);
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  const updateTodo = (_id, text) => {
    setUpdating(_id);
     setText(text);
  }
  const isChecked = (_id, completed) => {
    axios.post("http://localhost:5000/single-check", { _id, completed: !completed })
      .then((res) => {
        console.log(res.data);
      const newList = todo.map((item) => {
          if (item._id === _id) {
              const updatedItem = {
                ...item,completed:!completed
              };
              return updatedItem;
          }
          return item ;
      });
      setTodo(newList);
      setCompleted(completed);
      })
      .catch((err) => { console.log(err) });
  }
// all checks
// const handleAllCheck=(e)=>{
//   axios.post("http://localhost:5000/multi-check" )
//   .then((res) => {
//     console.log(res.data);
//   console.log('All Check Successfully....');
//   })
//   .catch((err) => { console.log(err) });
// }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <input type="text" placeholder="write something" value={text} onChange={(e) => setText(e.target.value)} />
          <div className="Add" onClick={addUpdate}>{isUpdating ? "Update" : "Add"}</div>
        </div>

    {/*  All checkis pending */}
        {/* <div className="list">
          <input type="checkbox" name="allSelect" onChange={ handleAllCheck} /> 
          <label className='btn btn-btn-success'>Check All</label>
        </div> */}
       
        <div className="deleteall mt-5">
          <button className='btn btn-danger btn-sm-2' onClick={deleteTodosByIds}>Delete All</button>
        </div>
        <div className="list">
          {todo.map(item => <Items key={item._id} updatechecked={() => { isChecked(item._id, item.completed) }}
           text={item.text} checked = {item.completed}
            remove={() => deleteTodo(item._id)} update={() => updateTodo(item._id, item.text)} />)}

        </div>
      </div>
    </div>
  );
}

export default App;
