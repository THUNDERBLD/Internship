"use client";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
    const count = 0;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api');
          setData(response.config); // Assuming the response config is what you need
          console.log(response.config)
        } catch (err) {
          setError(err);
          console.error('Error fetching data:', err);
        }
      };
  
      fetchData();
    }, []);
  
    if (error) return <div className="bg-white w-full">Error: {error.message}</div>;
    if (!data) return <div className="bg-white w-full">Loading...</div>;
    
    const catID = localStorage.getItem('catID'); // Retrieve from local storage
    console.log(catID);

  return (
    <div className="bg-slate-950 h-screen w-full">
      <div>
        <h1 className="text-white">Received Data:</h1>
        <pre className="text-white w-[90%]">{catID}</pre>
      </div>
    </div>

  );
}