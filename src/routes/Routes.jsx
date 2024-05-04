import Details from "../pages/details/Details";
import Success from "../pages/success/Success";

export const RoutesConfig = [
  {
    component: Success,
    path: "/success",
    exact: true,
    heading:"Success",
  },
  {
    component: Details,
    path: "/details",
    exact: true,
    heading:"Details",
  },
];
