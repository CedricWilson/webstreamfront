import * as React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

import DirectoryPage from "./directory_page/directory_page";
import TestPage from "./test/test_page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/:path?",
      element: <DirectoryPage />,
    },
    ,
    {
      path: "/test",
      element: <TestPage />,
    },
  ]);

  return (
    <>
      <div className="fullscreen-background">
        <RouterProvider router={router}>
          <ScrollRestoration
            getKey={(location, matches) => {
              return "hi";
            }}
          />
        </RouterProvider>
      </div>
    </>
  );
}

export default App;
