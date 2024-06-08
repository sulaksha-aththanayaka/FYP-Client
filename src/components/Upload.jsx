import React, { useState } from 'react'
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'

const Upload = () => {

    // const [img, setImg] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = async () => { // There was a type parameter
        const data = new FormData();
        // data.append("file", type === 'image' ? img : video);
        // data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');
        data.append("file", video);
        data.append("upload_preset", 'videos_preset');

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            // let resourceType = type === 'image' ? 'image' : 'video';
            let resourceType = 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const {secure_url} = res.data;
            console.log(secure_url);
            return secure_url;

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Upload image file
            // const imgUrl = await uploadFile('image');

            // Upload video file
            // const videoUrl = await uploadFile('video');
            const videoUrl = await uploadFile();

            // Get selected gender value
            const gender = document.querySelector('input[name="gender"]:checked').value;

            // Get selected age categories
            const ageCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);


            // Send backend api requests
            // await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, {imgUrl, videoUrl});
            await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, {videoUrl, gender, ageCategories});

            // Reset states
            // setImg(null);
            setVideo(null);

            console.log("File uploaded successfully");
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='video' className='bg-blue-500 text-white p-[5px] m-[10px]'>Video File:</label>
                <br/>
                <input type='file' accept='video/' id='video' onChange={(e) => setVideo((prev) => e.target.files[0])} className='m-[10px]'/>
            </div>

            <br/>

            {/* <div>
                <label htmlFor='img'>Image:</label>
                <br/>
                <input type='file' accept='image/' id='img' onChange={(e) => setImg((prev) => e.target.files[0])}/>
            </div> */}

            <br/>
            
            <div className='flex justify-evenly'>
                <div className='bg-gray-400 p-[20px] text-lg'>
                    <h1>Age Category</h1>
                    <input type="checkbox" value="18-25"/>
                    <label>18-25</label><br/>
                    <input type="checkbox" value="26-32"/>
                    <label>26-32</label><br/>
                    <input type="checkbox" value="33-39"/>
                    <label>33-39</label><br/><br/>
                </div>
                
                <div  className='bg-gray-400 p-[20px] text-lg'>
                    <h1>Gender</h1>
                    <input type="radio" value="male" name="gender"/>
                    <label>Male</label><br/>
                    <input type="radio"value="female" name="gender"/>
                    <label>Female</label><br/>
                </div>

                
            </div>
            

            <button type='submit' className='bg-blue-600 hover:bg-blue-800 p-[10px] m-[10px] text-white rounded-lg'>Upload</button>
        </form>


        {
            loading &&  <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        }
    </div>
    
  )
}

export default Upload