


import React, {useState,useEffect} from 'react'
import "./style.css"
const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");
  if (lists){return JSON.parse(lists)
  }
    else{
  return[];
}

  };
const App = () => {
  
  
  const[inputdata,setInputdata]=useState("");
    const[items,setItems]=useState(getLocalData());
    const[isEditItem,setIsEditItem]=useState("");
    const[toggleButton,setToggleButton]=useState("false");
    
//add the items function
  const addTask = () => {
    if (!inputdata){
      alert("please fill the data")

    }
    else if(inputdata && toggleButton){setItems(
      items.map((curElem)=>{
        if (curElem.id === isEditItem){
          return{...curElem, name:inputdata};
        }
        return curElem;
      })
    );
    setInputdata("");
    setIsEditItem(null);
    setToggleButton(false);
    }
    else{
      const myNewInputData={
        id:new Date().getTime().toString(),
        name:inputdata,
      }
      setItems([...items ,myNewInputData]);
    setInputdata("");
    }
  };

  const editItem=(index) =>{
    const item_todo_edited=items.find((curElem)=>{
      return curElem.id===index;

    });
    setInputdata(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };


  const deleteItem=(index)=>{
    const updatedItems=items.filter((curElem)=>{
      return curElem.id!==index;
    })
    setItems(updatedItems);
  };

  const removeAll=()=>{
    setItems([]);
  }
  useEffect(()=>{
    setToggleButton(false)
  },[])
  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));
  },[items]);
  return (
  <>
      <div className="main">
        <div className="todo-container">
           <div className ="heading"><h2>Todo List</h2><img src='./images/todo.png' alt='todo'/></div> 
           <div className="input-field" >
            <input id="input-box" type="text" placeholder="Enter the task here" value={inputdata}
             onChange={(event)=>setInputdata(event.target.value)}
            />
            {toggleButton? (
 <img  onClick={addTask} className="edit-btn"src=".\images\pen-to-square-regular.svg" alt='edit'/>):
              (<button onClick={addTask} >Add</button>)}
             
            
            

          </div>
          <ul className="list-items" id="list-container">
            {
              items.map((curElem,index)=>{
                return(
                  <>
                  <div className='todo-task-items' key={index}>
                    <div className='todo-task'> <li className="checked ">{curElem.name}  </li></div>
                 
                  <div className='delete-edit-btn'>
                  <img onClick={()=>deleteItem(curElem.id)} className="delete-img"src="./images/trash-solid.svg" alt='delete'/><img  onClick={()=>editItem(curElem.id)} className="edit-btn"src=".\images\pen-to-square-regular.svg" alt='edit'/>
                  </div>
             
          
            
                  </div>
                                     
            </>

                )     
              })}
              </ul>
            
           
          
          <div className='btn-remove'>
          <button onClick={removeAll}><span>Remove All</span></button>
          </div>
        <div>
          
           
        </div>
      </div>

    </div>
  
  
  </>
  )
}

export default App