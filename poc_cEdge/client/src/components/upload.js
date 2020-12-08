import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post('http://localhost:3033/uploadfile', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                        path: 'http://localhost:3033/uploads' + res.data.path
                    })
            alert("name: " + res.data.name + "\npath: http://localhost:3033/uploads"+res.data.path);
        }).catch(err => console.log(err))}

    return (
            <div >  
                <div row>
                    <input type="file" ref={el} onChange={handleChange} />  
                </div>

                <br></br>            
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <br></br>
                <div row>
                    <button onClick={uploadFile} class="btn btn-primary">Upload</button>
                </div>
                {/* displaying received image*/}
                {data.path && <img src={data.path} alt={data.name} />}
            </div>
    );
}
export default FileUpload;