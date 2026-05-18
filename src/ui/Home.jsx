import { NavLink } from "react-router-dom";
import Board from "../features/board/Board";
import Header from "./header";

export default function Home() {
  return (
    <div>
      <Header/>
      {/* <NavLink to="/board" >Boards</NavLink> */}
      <Board/>
    </div>
  )
}
