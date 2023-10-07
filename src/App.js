// import { useState } from 'react';
import ImgUpload from './ImgUpload';
import { BrowserRouter as Router, Route, Routes , Link, BrowserRouter} from 'react-router-dom';
import ViewImage from './ViewImage';
// import { Web3Storage } from 'web3.storage';
// import { upload } from '@testing-library/user-event/dist/upload';
function App() {



  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Image Upload on IPFS</h1>
        {/* <ImgUpload/> */}
      </header>
      <BrowserRouter>
      {/* <ImgUpload/> */}
      <Routes>
      <Route path='/' element = {<ImgUpload/>}/>
        <Route path='/view/:cid/:filename' element = {<ViewImage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
