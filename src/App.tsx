import React, { useState, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';

const url: string = 'http://localhost:8080';

function App() {
  const [file, setFile] = useState<any>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.files![0])

    setFile(e.target.files![0]);
  }

  const onFileUpload = () => {
    const dataFile = new FormData();
    dataFile.append('file', file)
    console.log(dataFile)

    axios.post(`${url}/invoice-scanner`, dataFile)
      .then( ({ data }) => {
        console.log(data)
      })
      .catch( err => console.log(err))
  }

  return (
    <div className="App">
      Invoice UI
      <div> 
        <input type="file" onChange={onFileChange} /> 
        <button onClick={onFileUpload}> 
            Upload 
        </button> 
      </div> 
    </div>
  );
}

export default App;
