import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";

const Home = () => {
   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm();

   const navigate = useNavigate();

   const handleFormSubmission = (data) => {
      console.log(data);
      console.log(data.name);
      console.log(data.select);
      console.log(data.term);
      const user = {
         name: data.name,
         sectors: data.select,
         terms_accept: data.term,
      };
      fetch("http://localhost:5000/user", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.acknowledged) {
               console.log(result);
               reset();
               if (result.insertedId) {
                  navigate(`profile/${result.insertedId}`);
               }
            }
         });
   };

   return (
      <div className="mt-10 formPage sm:mt-0 container">
         <div className="md:grid md:grid-cols-6 md:gap-6">
            <div className="md:col-span-3">
               <div className="px-4 text-center md:text-start">
                  <h3 className="text-6xl font-medium text-slate-50 mb-7">Personal Information</h3>
                  <p className="mt-1 text-2xl text-slate-300">Please enter your name and pick the Sectors you are currently involved in.</p>
               </div>
            </div>
            <div className="mt-5 md:col-span-3 md:mt-0">
               <form onSubmit={handleSubmit(handleFormSubmission)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                     <Form register={register} errors={errors}></Form>

                     <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                           type="submit"
                           className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                           Save
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Home;
