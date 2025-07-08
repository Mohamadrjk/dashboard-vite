"use client";
import { useState } from "react";
import { useTooltip, TooltipProvider } from "./TooltipProvider";

/**
 * 🚀 How It Works
TooltipProvider.tsx

Manages tooltip state globally.
Provides showTooltip(id, content, state) to trigger the tooltip manually.
TooltipOverlay.tsx

Positions the tooltip dynamically based on the hovered/targeted element.
Renders tooltip only when needed (performance-friendly).
Usage (Page.tsx)

Hover-based tooltip using onMouseEnter / onMouseLeave.
Button-controlled tooltip via showTooltip(id, content, state).


Why This is Awesome?
✅ Full control – Works with both hover & click-based triggers.
✅ Automatic position detection – The tooltip flips to the opposite side dynamically.
✅ Lightweight & Performant – No unnecessary re-renders.
✅ Global Tooltip Management – No need to manually place tooltip components all over.
✅ TypeScript safety – No runtime errors, easy to maintain.
 * @returns 
 */

// const Page = () => {
//   const { showTooltip } = useTooltip();
//   const [tooltipVisible, setTooltipVisible] = useState(false);

//   return (
//     <TooltipProvider>
//       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
//         {/* Hover-based tooltip */}
//         <button
//           id="myButton"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onMouseEnter={() => showTooltip("myButton", "Hovered Tooltip!", true)}
//           onMouseLeave={() => showTooltip("myButton", "", false)}
//         >
//           Hover Me
//         </button>

//         {/* Programmatically triggered tooltip */}
//         <button
//           onClick={() => {
//             showTooltip("myButton", "Triggered by Button!", !tooltipVisible);
//             setTooltipVisible(!tooltipVisible);
//           }}
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Toggle Tooltip
//         </button>
//       </div>
//     </TooltipProvider>
//   );
// };

// export default Page;

/**
 * "use client";
import { useState } from "react";
import { useTooltip, TooltipProvider } from "@/components/TooltipProvider";

const Page = () => {
  const { showTooltip } = useTooltip();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        {/* Hover-based tooltip */
// }
//         <button
//           id="myButton"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onMouseEnter={() => showTooltip("myButton", "Hovered Tooltip!", true)}
//           onMouseLeave={() => showTooltip("myButton", "", false)}
//         >
//           Hover Me
//         </button>

//         {/* Button to toggle tooltip */}
//         <button
//           onClick={() => {
//             showTooltip("myButton", "Triggered by Button!", !tooltipVisible);
//             setTooltipVisible(!tooltipVisible);
//           }}
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Toggle Tooltip
//         </button>
//       </div>
//     </TooltipProvider>
//   );
// };

// export default Page;

//  * @returns
//  */
