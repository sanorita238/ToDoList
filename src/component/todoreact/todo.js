import React, { useState,useEffect } from 'react';
import './style.css';

//get the localstorage data back
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        //JSON.parse converts string to array
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    {/*add item function*/ }
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return {...curElem,name:inputdata};
                    }
                    return curElem;
                })
            )


        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            ///...items means joh isse previous data tha usse rkho
            setItems([...items, myNewInputData])
            setInputData("")
        }
    };

    //editing the current item
    const editItem = (index) =>{
        const item_to_edit = items.find((curElem)=>{
            return curElem.id === index;
        })

        setInputData(item_to_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    }
//how to delete item section
    const deleteItem = (index) =>{
        //loop chalaya or joh id match horhi usse chod ke bkki return kia
        const updateItems = items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(updateItems);
    }
//removes all the elements
    const removeAll = () => {

        setItems([]);
    }

    //adding localstorage
    useEffect(() => {
      
    localStorage.setItem("mytodolist",JSON.stringify(items))
    }, [items]);
    

    return (
        <div>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todoimg.png' alt='todologo'></img>
                        <figcaption>Add your list here ✌️</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍ Add Items' className='form-control' value={inputdata} onChange={(event) => setInputData(event.target.value)}>

                        </input>
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i>:<i className="fa fa-plus add-btn" onClick={addItem}></i>}
                        
                    </div>
                    {/*show our items */}
                    <div className='showItems'>
                        {items.map((curElem) => {

                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                    {/*remove all button*/}
                    <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Todo;
