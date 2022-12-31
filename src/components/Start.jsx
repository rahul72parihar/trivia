import React from "react";

export default function Start(props){
    return (
    <div className="startDiv">
        <h1>REACT QUIX APP</h1>
        {/* <form>
            <input type="number" placeholder="Number of Question"></input>
            <input type="number" placeholder="Number of Question"></input>

        </form> */}
        <button onClick={props.startfunc}>Start</button>
    </div>
)}