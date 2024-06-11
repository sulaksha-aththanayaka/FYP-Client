import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="m-[3vw] border-blue-950 border-4">
      <h1 className='bg-blue-700 font-bold text-center p-[5px] text-white m-[5px]'>AD-Smart</h1>
      <Link to="/" className='bg-blue-600 p-[5px] text-white m-[5px] hover:bg-blue-800'>Home</Link> | <Link to="/play" className='bg-blue-600 p-[5px] text-white m-[5px] hover:bg-blue-800'>Play</Link> | <Link to="/upload" className='bg-blue-600 p-[5px] text-white m-[5px] hover:bg-blue-800'>Upload</Link> | <Link to="/upload-image" className='bg-blue-600 p-[5px] text-white m-[5px] hover:bg-blue-800'>Upload Image</Link> |<Link to="/secure-upload" className='bg-blue-600 p-[5px] text-white m-[5px] hover:bg-blue-800'>Secure Upload</Link> 
      <br/>
      <br/>
      <Outlet/>
    </div>
  );
}

export default App;
