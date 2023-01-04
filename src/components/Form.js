import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Form = ({ register, errors }) => {
   const { data, isLoading } = useQuery({
      queryKey: ["sectors"],
      queryFn: async () => {
         const res = await fetch("https://task-server-pearl.vercel.app/sectors");
         const data = res.json();
         return data;
      },
   });
   if (isLoading) {
      return;
   }

   const groupLabel = Object?.keys(data);
   if (groupLabel.length < 0) {
      console.log(data);
      return console.log("processing");
   }
   return (
      <div className="bg-white px-4 py-5 sm:p-6">
         <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Type your Name
               </label>
               <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  {...register("name", { required: "Name is Required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               />
               {errors.name && <p className="text-red-500 text-base pt-1 pl-1 font-medium">{errors.name?.message}</p>}
            </div>

            <div className="col-span-6">
               <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Sectors
               </label>
               <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  {...register("select", { required: "Please Select an Option" })}
               >
                  <option value="" selected disabled hidden>
                     Select an Option
                  </option>
                  {groupLabel?.map((singleLabel, idx) => {
                     return (
                        <optgroup className="opt" key={idx} label={singleLabel}>
                           {data[singleLabel]?.map((option, idx) => {
                              if (typeof option === "object") {
                                 const optionArray = Object?.keys(option);

                                 return (
                                    <Fragment key={idx}>
                                       <option className="disableOne" value={optionArray[0]} disabled>
                                          {optionArray[0]}
                                       </option>
                                       {option[optionArray[0]].map((anotherOption, idx) => {
                                          if (typeof anotherOption === "object") {
                                             const lastOptionArray = Object?.keys(anotherOption);
                                             return (
                                                <Fragment key={idx}>
                                                   <option className="disableTwo" value={lastOptionArray[0]} disabled>
                                                      &nbsp; &nbsp;{lastOptionArray[0]}
                                                   </option>
                                                   {anotherOption[lastOptionArray[0]].map((lastOption, idx) => {
                                                      return (
                                                         <option key={idx} value={lastOption}>
                                                            &nbsp; &nbsp; &nbsp; &nbsp; {lastOption}
                                                         </option>
                                                      );
                                                   })}
                                                </Fragment>
                                             );
                                          } else {
                                             return (
                                                <option key={idx} value={anotherOption}>
                                                   &nbsp; &nbsp;{anotherOption}
                                                </option>
                                             );
                                          }
                                       })}
                                    </Fragment>
                                 );
                              } else {
                                 return (
                                    <option key={idx} value={option}>
                                       {option}
                                    </option>
                                 );
                              }
                           })}
                        </optgroup>
                     );
                  })}
               </select>
               {errors.select && <p className="text-red-500 text-base pt-1 pl-1 font-medium">{errors.select?.message}</p>}
            </div>
         </div>
         <div className="my-6 space-t-4">
            <div className="flex items-start">
               <div className="flex h-5 items-center">
                  <input id="term" name="term" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" {...register("term", { required: "Must Check the box" })} />
               </div>
               <div className="ml-3 text-sm">
                  <label htmlFor="term" className="font-medium text-gray-700">
                     I agree to the{" "}
                     <Link className="underline text-blue-600" to="/">
                        terms and conditions
                     </Link>
                  </label>
               </div>
            </div>
            {errors.term && <p className="text-red-500 text-base pt-1 pl-1 font-medium">{errors.term?.message}</p>}
         </div>
      </div>
   );
};

export default Form;
