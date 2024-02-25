import React,{useState,useEffect} from 'react'
import MainContainer from '../components/MainContainer'
import { accountService } from '../apiServices/accountService';


export default function Account() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    accountService.getAccounts()
    .then(res => {
      if(res.status < 400 && res.data){
        setAccounts(res.data);
        console.log(res)
      }
    })
  },[])

  return (
    <MainContainer>
        <div className='w-full h-full'>
            <h1 className='text-center text-2xl font-bold mt-2'>
              Accounts
            </h1>
            
        </div>
    </MainContainer>
  )
}
