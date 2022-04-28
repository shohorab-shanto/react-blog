import Home from './components/pages/Home';
import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import AddEditBlog from './components/pages/AddEditBlog';
import About from './components/pages/About';
import NotFound from './components/pages/Notfound';
import Blog from './components/pages/Blog';
import Header from './components/Header';
// react tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    
    <BrowserRouter>
      <div className="App">
      <Header/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/addblog" element={<AddEditBlog/>}></Route>
          <Route path="/editblog/:id" element={<AddEditBlog/>}></Route>
          <Route path="/singleblog/:id" element={<Blog/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
    
    
  );
}

export default App;
