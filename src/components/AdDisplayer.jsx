import React, { useState, useEffect } from 'react'
import { SearchBar } from './SearchBar'
import VideoPlayer from './VideoPlayer';


function AdDisplayer() {

  const [urlLink, setUrl] = useState('');

  useEffect(() => {
    console.log('URL changed:', urlLink);
    
    // You can perform additional actions here if needed
  }, [urlLink]); // Dependency array with url as dependency

  return (
    <div className='flex flex-col item-center'>
        <SearchBar setUrl={setUrl}/>
        <VideoPlayer urlLink={urlLink}/>
    </div>
  )
}

export default AdDisplayer

