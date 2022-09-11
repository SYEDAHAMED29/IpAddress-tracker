import React, {useState, useEffect} from "react";
import arrow from "./images/icon-arrow.svg";
import axios from "axios";
import {MapContainer, TileLayer, Marker} from "react-leaflet";

import "./index.css";

const Hero = () => {
   const [input, setInput] = useState("");
   const [content, setContent] = useState([]);

   async function getData() {
      const {data} = await axios.get(`https://ipapi.co/${input}/json/`);

      setContent(data);
   }
   useEffect(() => {
      getData();
   }, []);

   return (
      <>
         <div className="hero">
            <div className="hero-first-container">
               <h1 className="hero-heading">IP Address Tracker</h1>
               <input
                  className="hero-input"
                  type="text"
                  placeholder="Search any IP Address or domain"
                  onChange={(e) => setInput(e.target.value)}
                  // onKeyPress={(e) => {
                  //    if ((e.key = "Enter")) {
                  //       getData();
                  //       console.log("I got clicked");
                  //    }
                  // }}
               />
               <button onClick={getData}>
                  <img className="btn-img" src={arrow} alt="" />
               </button>
            </div>
         </div>

         <div className="hero-second-container">
            <div className="ip-address hero-content">
               <p>IP ADDRESS </p>

               <h3>{content.ip}</h3>
            </div>
            <div className="location hero-content">
               <p>LOCATION</p>
               {content.city ? (
                  <h3>
                     {content.city}, {content.region}
                  </h3>
               ) : (
                  ""
               )}
            </div>
            <div className="timezone hero-content">
               <p>TIMEZONE</p>
               {content.utc_offset ? <h3>UTC: {content.utc_offset}</h3> : ""}
            </div>
            <div className="isp hero-content">
               <p>ISP</p>
               <h3>{content.org}</h3>
            </div>
         </div>

         <div className="map-container">
            <MapContainer
               center={[content.latitude || 0, content.longitude || 0]}
               zoom={13}
               scrollWheelZoom={true}
            >
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={[content.latitude || 0, content.longitude || 0]} />
            </MapContainer>
            {/* <MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <Marker position={[51.505, -0.09]} />
            </MapContainer> */}
         </div>

         {/* <Mapping latitude={content.latitude} longitude={content.longitude} /> */}
      </>
   );
};

export default Hero;
