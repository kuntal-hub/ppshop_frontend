import './App.css';
import Header from './components/Header';
import Notification from './components/Notification';
import { Outlet } from 'react-router-dom';

function App() {

  return (
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
