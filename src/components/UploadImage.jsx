import React, { useState } from 'react'
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'

const UploadImage = () => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImageFile = async () => { // There was a type parameter
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", 'images_preset');

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            // let resourceType = type === 'image' ? 'image' : 'video';
            let resourceType = 'image';
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

            const mediaType = "image"

            const videoUrl = await uploadImageFile();

            // Get selected gender value
            const gender = document.querySelector('input[name="gender"]:checked').value;

            // Get selected age categories
            const ageCategories = Array.from(document.querySelectorAll('input[name="age"]:checked')).map(checkbox => checkbox.value);

            // Get selected brand value
            const brands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(checkbox => checkbox.value);


            // Send backend api requests
            await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/images`, {videoUrl, mediaType, gender, ageCategories, brands});

            setImage(null);

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
                <label htmlFor='image' className='bg-blue-500 text-white p-[5px] m-[10px]'>Image File:</label>
                <br/>
                <input type='file' accept='image/' id='image' onChange={(e) => setImage((prev) => e.target.files[0])} className='m-[10px]'/>
            </div>

            <br/>

            <br/>
            
            <div className='flex justify-evenly'>
                <div className='bg-gray-400 p-[20px] text-lg'>
                    <h1>Age Category</h1>
                    <input type="checkbox" value="0-2" name="age"/>
                    <label>0-2</label><br/>
                    <input type="checkbox" value="4-6" name="age"/>
                    <label>4-6</label><br/>
                    <input type="checkbox" value="8-12" name="age"/>
                    <label>8-12</label><br/>
                    <input type="checkbox" value="15-20" name="age"/>
                    <label>15-20</label><br/>
                    <input type="checkbox" value="25-32" name="age"/>
                    <label>25-32</label><br/>
                    <input type="checkbox" value="38-43" name="age"/>
                    <label>38-43</label><br/>
                    <input type="checkbox" value="48-53" name="age"/>
                    <label>48-53</label><br/>
                    <input type="checkbox" value="60-100" name="age"/>
                    <label>60-100</label><br/>
                </div>
                
                <div  className='bg-gray-400 p-[20px] text-lg'>
                    <h1>Gender</h1>
                    <input type="radio" value="male" name="gender"/>
                    <label>Male</label><br/>
                    <input type="radio"value="female" name="gender"/>
                    <label>Female</label><br/>
                </div>

                <div className='bg-gray-400 p-[20px] text-lg'>
                    <h1>Brands</h1>
                    <input type="checkbox" value="adidas" name="brand"/>
                    <label>Adidas</label><br/>
                    <input type="checkbox" value="levis" name="brand"/>
                    <label>Levis</label><br/>
                    <input type="checkbox" value="moose" name="brand"/>
                    <label>Moose</label><br/>
                    <input type="checkbox" value="nike" name="brand"/>
                    <label>Nike</label><br/>
                    <input type="checkbox" value="ralph lauren" name="brand"/>
                    <label>Ralph Lauren</label><br/>
                    <input type="checkbox" value="carnage" name="brand"/>
                    <label>Carnage</label><br/>
                    <input type="checkbox" value="puma" name="brand"/>
                    <label>Puma</label><br/>
                    <input type="checkbox" value="lacoste" name="brand"/>
                    <label>Lacoste</label><br/>
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

export default UploadImage