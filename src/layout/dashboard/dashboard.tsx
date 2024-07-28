import { ReactNode } from "react";
import Navbar from "./libs/navbar";

interface IDashboard {
  children: ReactNode;
}

export default function Dashboard({ children }: IDashboard) {
  return (
    <div>
      <Navbar />
      <div className="pt-2 px-2"> {children}</div>
    </div>
  );
}
