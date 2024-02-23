import './App.css';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from './store/balanceSlice';
import { balanceService } from './apiServices/balanceService';
import Notification from './components/Notification';
import { Outlet } from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    balanceService.getBalance()
    .then(response=>{
      if (response.status < 400 && response.data) {
        dispatch(updateBalance(response.data));
        setLoading(false);
      } else{
        setLoading(false);
      }
    })
  },[])

  return (
    loading ? <div className='w-screen h-screen flex justify-center items-center text-3xl font-bold top-0 left-0 fixed bg-gray-200 bg-opacity-50 z-50'
    >Loading...</div> :
    <>
      <Header />
      <Notification />
      <main className='m-0 p-0'>
        <Outlet />
      </main>
    </>
  )
}

export default App
