import React from 'react';
import { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { Link , useNavigate} from 'react-router-dom';
import ViewImage from './ViewImage';
import './ImgUpload.css'; 

// import { create as ipfsHttpClient } from "ipfs-http-client"

// const client = ipfsHttpClient("https://sepolia.infura.io/v0?projectId=530b24b23c5a481db78b4d8d6ce2df0c")
function ImgUpload() {
  // console.log("Client : ",client);
  // const storage = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMwN0QyNjlGRUE5MDAzOEMyMjkwMmE3Q0UxMmFhNTAwQWRBMDEyNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ2MjE0MDA3NTMsIm5hbWUiOiJTSUgifQ.maoe4zMtHYCrRoob_mDNW3INqxbDeRcAGIksCC_Hxn8" });
    // Creating web3 instance from api token
    const storage = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMwN0QyNjlGRUE5MDAzOEMyMjkwMmE3Q0UxMmFhNTAwQWRBMDEyNTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ2MjE0MDA3NTMsIm5hbWUiOiJTSUgifQ.maoe4zMtHYCrRoob_mDNW3INqxbDeRcAGIksCC_Hxn8" });
    const navigate = useNavigate();


    const [fileName, setFileName] = useState('');
    const [fileDescription, setFileDescription] = useState('');
    const [fileRarity, setFileRarity] = useState('');
    const [fileCID, setFileCID] = useState('');
    const [file, setFile] = useState(null); // Initialize as null
    const [isuploading, setIsUploading] = useState(false);
  
      // Function to convert state variables to JSON
      const convertToJson = () => {
        const jsonData = {
          file_name: fileName,
          file_description: fileDescription,
          file_rarity: fileRarity,
          file_cid: fileCID,
        };
    
        // Create a JSON Blob
        const jsonDataBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    
        // Create a URL for the Blob
        const jsonDataUrl = URL.createObjectURL(jsonDataBlob);
    
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = jsonDataUrl;
        let fname = fileName;
        fname = fname.split('.')[0];
        console.log("Fname : ",fname);
        downloadLink.download = `${fname}.json`;
        downloadLink.click();
      };



  
  return (
    
    <div>       
        <input
          type="file"
          alt="image"
          onChange={async (e) => {
            const selectedFile = e.target.files[0];

            console.log('Selected File:', selectedFile);

            setFileName(selectedFile.name);
            console.log('Web3Storage:', storage);

            try {
              const cid = await storage.put([selectedFile]);
              console.log('CID:', cid);

              setFile(selectedFile);
              setFileCID(cid);
            } catch (error) {
              console.error('Error uploading to Web3 Storage:', error);
            }
          }}
        />

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setFileDescription(e.target.value);

          }}
        />

        <input
          type="text"
          placeholder="Rarity"
          onChange={(e) => {
            setFileRarity(e.target.value);
          }}
        />

        <button onClick={() => {
            if(fileCID){
                setIsUploading(true);
            }
        }}>Submit</button>

        {/* {fileCID && setIsUploading(true)} */}

        {isuploading && (
        <>
          <h1>Values</h1>
          <p>File: {file ? file.name : ''}</p>
          <p>Description: {fileDescription}</p>
          <p>Rarity: {fileRarity}</p>
          <p>CID: {fileCID}</p>
          <button onClick={convertToJson}>Download JSON</button>
        </>
      )}
<button onClick={() => navigate(`/view/${fileCID}/${fileName}`)}>View Image</button>

    {/* <button><Link to="/view">ViewImage</Link></button> */}
        
    </div>
  );
}

export default ImgUpload;
