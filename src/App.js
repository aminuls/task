import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./router/Main";
import Error from "./pages/Error/Error";
import Profile from "./pages/Home/Profile";
import Home from "./pages/Home/Home";

function App() {
   const router = createBrowserRouter([
      {
         path: "/",
         element: <Main></Main>,
         errorElement: <Error></Error>,
         children: [
            {
               path: "/",
               element: <Home></Home>,
            },
            {
               path: "/profile/:id",
               element: <Profile></Profile>,
               loader: async ({ params }) => {
                  return fetch(`http://localhost:5000/profile/${params.id}`);
               },
            },
         ],
      },
   ]);
   return (
      <div className="App">
         <RouterProvider router={router}></RouterProvider>
      </div>
   );
}

export default App;
