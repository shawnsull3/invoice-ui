import React, { useState, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';

const url: string = 'http://localhost:8080';

function App() {
  const [file, setFile] = useState<any>(null);
  const [pdfText, setPdfText] = useState<string[]>([]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files![0]);
  }

  const onFileUpload = () => {
    const dataFile = new FormData();
    dataFile.append('file', file)

    axios.post(`${url}/invoice-scanner`, dataFile)
      .then( ({ data }) => {
        console.log(data)
        setPdfText(data);
      })
      .catch( err => console.log(err))
  }

  return (
    <div className="App">
      <h1>Invoice UI</h1>
      <div> 
        <input type="file" onChange={onFileChange} /> 
        <button onClick={onFileUpload}> 
            Upload 
        </button> 
      </div>
      {pdfText.length > 0 && 
        <div style={{textAlign: "left", marginLeft: "10px"}}>
          <h3>Text in Document:</h3>
          {pdfText.map((textGrouping, index) => (
            <p key={index}>{textGrouping}</p>
          ))}
        </div>
      } 
    </div>
  );
}

export default App;
