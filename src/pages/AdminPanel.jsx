import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authService } from '../apiServices/authService'
import { setNotification } from '../store/notificaionSlice'
import MainContainer from '../components/MainContainer'

export default function AdminPanel() {
    const user = useSelector(state => state.auth.user);
  return (
    <MainContainer>
        <h1 className='text-3xl font-bold mt-2'>Admin Panel</h1>
        <div>
            
        </div>
    </MainContainer>
  )
}
