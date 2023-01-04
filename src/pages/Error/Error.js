import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
   return (
      <div className="h-screen w-full flex justify-center items-center" style={{ backgroundImage: "url('../../images/error.jpg')", backgroundSize: "100% 100%" }}>
         <div className="bg-black p-10 rounded-md">
            <h2 className="text-2xl text-white">
               Go to{" "}
               <Link to="/">
                  <button className="px-2 pb-1 border-2 rounded-md text-xl">Home</button>
               </Link>
            </h2>
         </div>
      </div>
   );
};

export default Error;
