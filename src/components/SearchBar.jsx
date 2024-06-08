import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import axios from 'axios'
import { spawn } from 'child_process';

export const SearchBar = ({setUrl}) => {
    const [input, setInput] = useState("");

    const [results, setResults] = useState([]);

  

    const handleSubmit = async () => {
      // const childPython = spawn('python', ['detect.py']);

      // childPython.stdout.on('data', (data) => {
      //     console.log("stdout:", data);
      // });

      const response = await axios.post('http://localhost:5000/api/run-python');
      const { gender, age } = response.data;
  
      console.log(gender);
      

      console.log(gender);
      console.log(age);
        try {
          const response = await axios.get('http://localhost:5000/api/fetch-videos', {
            params: {
              gender: gender.toLowerCase()
            }
          });
          const results = response.data;
          console.log(results);
          if (results.length > 0) {
            setUrl(results[0].videoUrl);
           
          } else {
            console.log("No results found");
          }
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

      useEffect(() => {
        handleSubmit();
      }, []);

   

  return (
    <div className="pt-2 relative mx-auto text-gray-600">
        {/* <input value={input} onChange={(e) => setInput(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search" name="search" placeholder="Search" />
        <div>
            <button onClick={handleSubmit} type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                <FaSearch />
            </button>
        </div> */}
        <h1>HHHHH</h1>
  </div>
  )
}


