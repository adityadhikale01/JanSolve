// import AllListings from "../../pages/AllListingsPage/AllListings.jsx";
// import NewListing from "../../pages/NewListing/NewListings.jsx";
// import ListingDetails from "../../pages/ListingDetailPage/ListingDetails.jsx";
// import UpdateListing from "../../pages/updateListing/UpdateListing.jsx";

// import { AllListingsLoader } from "../../loaders/AllListingsLoader.jsx";
// import { listingDetailsLoader } from "../../loaders/ListingDetailLoader.jsx";


// import { createListingAction } from "../../actions/createListingAction.jsx";
// import { updateListingAction } from "../../actions/updateListingAction.jsx";
// import ProtectedRoute from "../../auth/ProtectedRoute.jsx";
// import { deleteListingAction } from "../../actions/deleteListingAction.jsx";
// import { bookThePropertyAction } from "../../actions/bookThePropertyAction.jsx";

// import { Children } from "react";
// import { Layout } from "lucide-react";
// export const listingRoutes = [
//   {
//     path: "listings",
//     element: <AllListings />,
//     loader: AllListingsLoader,
//   },
//   {
//     path: "listings/new",
//     element: (
//       <ProtectedRoute>
//         <NewListing  />
//       </ProtectedRoute>
//     ),
//     action: createListingAction,
//   },
//   {

//     path: "listings/:id",
//     id: "listing-details",
//     loader: listingDetailsLoader,
//     children:[
//       {
//         index:true,
//         element: (
//       <ProtectedRoute>
//         <ListingDetails />
//       </ProtectedRoute>
//       ),
//       },
//       {
//         path: "edit",//listings/:id/edit
//         element: (
//           <ProtectedRoute>
//             <UpdateListing /> 
//           </ProtectedRoute>
//         ),
//         action:updateListingAction,
//       },
//       {
//           path:"delete",//listings/:id/delete
//           action: deleteListingAction
//     },
//     {
//       path:"booking",
//       action:bookThePropertyAction

//     }
//     ]
//   },
  
// ];