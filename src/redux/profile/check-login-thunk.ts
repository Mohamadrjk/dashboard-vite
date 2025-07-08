// import { onCheckHasToken } from "./profileSlice"; // Redux action
// import { AppDispatch } from "../store"; // Update the path if necessary
// import Cookies from "universal-cookie";
// import { NextRouter } from "next/router";

// export const checkLogin = (router: NextRouter) => {
//   return async (dispatch: AppDispatch) => {
//     // Dispatch the action to check if the token exists
//     dispatch(onCheckHasToken());

//     // Perform navigation logic if necessary
//     const token = new Cookies().get("token");

//     if (!token) {
//       const protectedPaths = ["/basket", "/profile"];
//       const currentPath = router.pathname;

//       // Redirect to home if the current path is protected and the user is not authenticated
//       if (protectedPaths.some((path) => currentPath.includes(path))) {
//         console.log("Redirecting from:", currentPath);
//         router.push("/");
//       }
//     }
//   };
// };
