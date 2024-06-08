import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Upload from './components/Upload';
import SecureUpload from './components/SecureUpload';
import AdDisplayer from './components/AdDisplayer';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="upload" element={<Upload />} />
      <Route path="secure-upload" element={<SecureUpload />} />
      <Route path="play" element={<AdDisplayer/>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);


