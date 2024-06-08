import React, { useState, useEffect } from 'react'

function VideoPlayer({urlLink}) {

  // const test = urlLink;

  useEffect(() => {
    document.querySelector("video").load();
  }, [urlLink]);

  return (
    <div className='flex flex-col item-center'>
        <div className='flex flex-col justify-center my-5'>
            <video width="320" height="240" controls>
                <source src={urlLink} type="video/mp4"/>
                {/* {console.log(urlLink)} */}
                {/* <source src="movie.ogg" type="video/ogg"/> */}
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
  )
}

export default VideoPlayer