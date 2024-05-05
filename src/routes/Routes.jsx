import Details from "../pages/details/Details";
import Success from "../pages/success/Success";
import Landing from "../pages/landing/Landing";
export const RoutesConfig = [
  {
    component: Landing,
    path: "/",
    exact: true,
    heading:"Landing",
  },
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
