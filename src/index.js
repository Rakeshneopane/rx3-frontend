import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "./styles.css";

import App from "./App";
import AddStudent from "./features/student/AddStudent.jsx";
import StudentDetails from "./features/student/StudentDetails.jsx";
import StudentView from "./features/student/StudentView.jsx";
import ClassView from "./features/class/ClassView.jsx";
import SchoolView from "./features/school/SchoolView.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    hydrateFallBackElement: <p> ...Loading </p>,
    errorElement: <p>Something went wrong.</p>,
    children: [
      {
        index: true,
        element: <StudentView />,
      },
      {
        path: "addStudent",
        element: <AddStudent />,
      },
      {
        path: "student/:id",
        element: <StudentDetails />,
      },
      {
        path: "addStudent/:id/edit",
        element: <AddStudent />,
      },
      {
        path: "classView",
        element: <ClassView />,
      },
      {
        path: "schoolView",
        element: <SchoolView />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
