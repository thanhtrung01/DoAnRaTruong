import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ModalCard from "../components/Card/ModalCard";
import HomePage from "../pages/HomePage/Home";
import ErrorPage from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "card-details",
        element: <ModalCard />,
      },
    ],
  },
]);
