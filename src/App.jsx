
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import BoardPage from './features/board/BoardPage'
import NotFound from './ui/NotFound'
import Home from './ui/Home'

function App() {

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/board/:boardId" element={<BoardPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
