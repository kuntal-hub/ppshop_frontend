import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authService } from '../apiServices/authService'
import { setNotification } from '../store/notificaionSlice'
import MainContainer from '../components/MainContainer'
import ChengeUsername from '../components/ChengeUsername'
import ChengeEmail from '../components/ChengeEmail'
import ChengePassword from '../components/ChengePassword'
import CreateUserForm from '../components/CreateUserForm'

export default function AdminPanel() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users,setusers] = useState([]);
    const [showCreateUserForm,setshowCreateUserForm] = useState(false);

    useEffect(() => {
      if (!user || user.role !== "admin") {
        return navigate("/");
      }
      authService.getAllUsers()
      .then(response=>{
        if(response.status < 400 && response.data){
          setusers(response.data);
        }
      })
    },[]);

    const Deleteuser = async (username) => {
      const confirmaion = window.confirm("Are you sure you want to delete this user?");
      if(!confirmaion) return;
      const response = await authService.deleteUser({username:username});
      if(response.status < 400 && response.data){
          dispatch(setNotification({text:"User Deleted",type:"success"}));
          setusers(prev => prev.filter(user => user.username !== username));
      } else {
          dispatch(setNotification({text:response.message,type:"error"}));
      }
    }

  return (
    <MainContainer>
        <h1 className='text-3xl font-bold mt-2 mb-4'>Admin Panel</h1>
        <div>
            <ChengeUsername username={user.username} /><hr />
            <ChengeEmail email={user.email} /><hr />
            <ChengePassword /><hr />
        </div>
          <h2 className='text-2xl font-bold mt-4 mb-4'>Users</h2>
        <div className='flex flex-wrap justify-center pb-4'>
          {
            users.map((user,index)=>
              <div key={index} className='m-4 p-6 border-2 bg-white rounded-lg'>
                <h3 className='text-xl font-bold'>{user.username}</h3>
                <p>{user.email}</p>
                <button onClick={() => Deleteuser(user.username)}
                className='mt-4 bg-red-500 text-white py-2 px-4 font-semibold hover:bg-red-600 rounded-lg'
                >
                  Delete User
                </button>
              </div>
            )
          }
        </div>
          <button onClick={() => setshowCreateUserForm(true)}
          className='bg-green-500 text-white py-2 px-4 font-semibold hover:bg-green-600 rounded-lg block mx-auto mb-14'
          >
            Create User
          </button>
          {showCreateUserForm && <CreateUserForm setshowCreateUserForm={setshowCreateUserForm} setusers={setusers} />}
    </MainContainer>
  )
}
