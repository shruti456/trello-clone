import { Route, Routes } from "react-router-dom";

import Home from "../ui/Home";
import BoardPage from "../features/board/BoardPage";
import NotFound from "../ui/NotFound";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board/:boardId" element={<BoardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
