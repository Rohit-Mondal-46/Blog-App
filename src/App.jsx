import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authServices from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom';
import {Header,Footer} from "./components/index"
function App() {
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-white'>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>) : null;
}

export default App
