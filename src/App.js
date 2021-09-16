import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from "uuid";
function App() {
  const [open,setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("")
  const [status, setStatus] = useState("");
  const [indexed, setIndexed] = useState("");
  const [array, setArray] = useState([])
  const handleClick = ()=> {
    setOpen(true)
  }
  const handleCancel = ()=>{
    setOpen(false);
    setStatus("add");
    setInput("")
  }
  useEffect(() => {
    if(localStorage.getItem("data") !== null){
      setArray(JSON.parse(localStorage.getItem("data")))
    } 
  }, [])
  const clearArray = ()=>{
    setArray([])
    localStorage.setItem("data", JSON.stringify([]))
  }
  const handleSubmit = ()=> {
    const date = new Date()
    const data = {
      id:uuidV4(),
      item: input,
      desc:desc,
      time: date.toString().split("T")[0]
    }
    array.push(data);
    setArray(array)
    setOpen(false)
    setInput("")
    setDesc("")
    localStorage.setItem("data", JSON.stringify(array));
  }

  const editTodo = (index)=>{
    setIndexed(index)
    setStatus("editing")
    const found = array.find((ele, i) => i === index );
    setOpen(true);
    setInput(found.item);
    setDesc(found.desc)
  }
  const handleUpdate = ()=>{
     array[indexed].item = input;
     array[indexed].desc = desc
     setArray(array)
     localStorage.setItem("data", JSON.stringify(array))
     setOpen(false);
     setStatus("add");
     setInput("")
     setDesc("")
  }
  const deleteTodo = (index)=>{
       const filtered = array.filter(x=> x.id !== index);
       setArray(filtered)
       localStorage.setItem("data", JSON.stringify(filtered))
  }
  return (
    <div className="App">
      <h1>Todo List </h1>
      <div className="container">
        <div>
        <button className="btn" onClick={handleClick}> +</button>
        </div>
       
        {
          open &&
 
          <div className="design">
            <input type="text" style={{marginBottom:"15px"}}  placeholder="Enter Todo Title" value={input} onChange={(e)=> setInput(e.target.value)}/>
            <textarea cols="10" rows="2" onChange={(e)=> setDesc(e.target.value)} value={desc} placeholder="Enter Description"/>
            <button style={{color:"blue", border:"1px solid blue"}} onClick={status === "editing" ? handleUpdate : handleSubmit}>{status === "editing" ? "Update" : "Add"}</button> 
            <button style={{color:"red", border:"1px solid red"}} onClick={handleCancel}>X</button>
          </div>
        }
        

        <div>
          
          {
            array && array.length > 0 ?
            array.map((item, index)=>(
              <div className="list" key={index}>
                <h2>{item.item}</h2>
                <span>{item.desc} </span>
                <button className = "edit" onClick={()=> editTodo(index)}>edit</button> 
                <button className="delete" onClick={()=> deleteTodo(item.id)}>delete</button>
              </div>
            )):""
            
          }
          <button className="clearAll" onClick={clearArray}>clear</button>
        </div>
      </div>
     
    </div>
  );
}

export default App;
