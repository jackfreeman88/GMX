import { useState } from "react";
import { REACT_APP_API_BASE_URL } from "../config/server.config";
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';

function Video() {
    const [file, setFile] = useState('');
    const [type, setType] = useState('');
    const handleFileChange = (e) => {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        // const res = Rest.axiosRequest(API.storeFile, formData, 'POST', true)
        // console.log(res);
        // setFile(e.target.files[0])
        // setType(e.target.files[0]['type'])
    }
    return ( 
        <>
            <input type='file' onChange={handleFileChange}/>
            <video width="520" height="440">
                <source src={file} type={type}/>
            </video>
        </>
     );
}

export default Video;