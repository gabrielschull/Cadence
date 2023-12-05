import {parse} from "papaparse"
import { useState } from "react";
import { useDispatch } from "react-redux";
import React, { useCallback } from 'react';
import { setClients } from "../../Redux/ClientsSlice";


function DropFile() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [fileDropped, setFileDropped] = useState(false)

  return (
    
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", width: "200px", height: "150px", textAlign: "center", border: "5px solid black", borderRadius: "10px"}}className = "CSV-drop"
      onDragOver={(event) => {
        event.preventDefault();
        console.log('dragging over')
      }}
      onDrop={(event => {
        event.preventDefault();
        console.log('dropped following:', event.dataTransfer.files)
        setFileDropped(true);
        Array.from(event.dataTransfer.files).map( async file => {
            let text = await file.text()
            let result = parse(text, {header: true})
            console.log('parsed csv:', result.data)
            setData(result.data)
            dispatch(setClients(result.data))
        })
      })}>
        {fileDropped ? "Ask me a question below!" : "Drop File Here!"}
        </div>
  );
}

export default DropFile;