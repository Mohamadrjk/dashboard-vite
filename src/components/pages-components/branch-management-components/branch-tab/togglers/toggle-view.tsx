import React, { useState } from "react";

export type IToggleViewProps = "Grid" | "List";

function ToggleView() {
  const [view, setView] = useState<IToggleViewProps>();
  return <div></div>;
}

export default ToggleView;
