import React from 'react';
import { useParams } from 'react-router-dom';

function ViewImage() {
    const { cid, filename } = useParams();

    // Use `cid` in your component logic
    console.log("View CID : ", cid);
    console.log("Name : ", filename);
    console.log(`URL : https://ipfs.io/ipfs/${cid}`)
  return (
    <div>
      <h1>View Image</h1>
      <p>CID: {cid}</p>

      {/* Render the image using the CID */}
      {cid && (
        <img
          src={`https://ipfs.io/ipfs/${cid}/${filename}`}
          alt="View Image"
          style={{ maxWidth: '100%' }}
        />
      )}
    </div>
  );
}

export default ViewImage;
