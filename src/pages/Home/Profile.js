import React, { Fragment, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";

const Profile = () => {
   const [isOpen, setIsOpen] = useState(false);
   const user = useLoaderData()[0];
   const navigate = useNavigate();

   console.log(user);

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm();

   const handleFormSubmission = (data) => {
      console.log(data);
      console.log(data.name);
      console.log(data.select);
      console.log(data.term);
      const usersData = {
         name: data.name,
         sectors: data.select,
         terms_accept: data.term,
      };
      fetch(`https://task-server-pearl.vercel.app/user/update/${user._id}`, {
         method: "PATCH",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(usersData),
      })
         .then((res) => res.json())
         .then((result) => {
            if (result.acknowledged) {
               console.log(result);
               reset();
               setIsOpen(false);
               navigate(0);
            }
         });
   };
   return (
      <>
         <div className="mt-10 w-screen mx-auto flex justify-center">
            <div className="md:grid md:grid-cols-8 md:gap-6 container">
               <div className="mt-5 md:col-span-8 md:mt-0">
                  <div className="overflow-hidden shadow sm:rounded-md">
                     <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                           <div className="col-span-12 text-center">
                              <div>
                                 <h2 className="text-3xl">
                                    Hi, <span className="font-bold">{user?.name}</span>
                                 </h2>
                                 <h2 className="text-5xl my-2">Welcome to Our Website</h2>
                              </div>
                           </div>
                           <div className="col-span-12 flex justify-center">
                              <div>
                                 <h2>
                                    Your Sector is: <span>{user?.sectors}</span>
                                 </h2>
                                 {user?.terms_accept && <h2 className="text-lg">You agreed to the terms & conditions</h2>}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                        <button
                           type="button"
                           className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                           onClick={() => setIsOpen(true)}
                        >
                           Edit
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
               <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
               </Transition.Child>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                           <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                              Edit your Info
                           </Dialog.Title>

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
                           {/* <Form setIsOpen={setIsOpen} refreshPage={refreshPage}></Form> */}

                           {/* <div className="mt-4">
                              <button
                                 type="button"
                                 className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                 onClick={() => setIsOpen(false)}
                              >
                                 Got it, thanks!
                              </button>
                           </div> */}
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};

export default Profile;
