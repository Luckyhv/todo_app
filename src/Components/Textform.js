import React, { useEffect } from 'react'
import './Textform.css';
import { useState } from 'react';
// import {IoClose } from 'react-icons/io5';

export default function Textform(props) {
    const getitemss=()=>{
        let list=localStorage.getItem('list');
        if(list){
            return JSON.parse(localStorage.getItem('list'));
        }
        else{
            return [];
        }
    }
    const [text, setText] = useState("");
    function handlechange(event) {
        setText(event.target.value);
    }
    const [item, setItem] = useState(getitemss);
    function clickbtn() {
        if (text !== "") {
            setItem([...item, text]);
            setText("");
        }
    }
    const deleteitem = (id) => {
        const updatedItems = item.filter((element, ind) => {
            return ind !== id;
        })
        setItem(updatedItems);
    }

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(item));
    },[item])

    return (
        <>
        <div className="container">
            <div className='mid'><h2>Todo List</h2>
                <form id="addForm">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 col-sm-7">
                            <input type="text"
                                className="form-control" id="item" autocomplete="off" value={text} placeholder="Enter Task" onChange={handlechange} />
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5">
                            <button type="button" className="btn btn-primary add" onClick={clickbtn} >Add</button>
                        </div>
                        <div>
                            <h2 style={{ margin: "15px 0px" }}>Tasks</h2>
                            {item.map((element, ind) => {
                                return (
                                    <div className="eachItem " key={ind}>
                                        <h4>{element}</h4>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteitem(ind)}></i>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
