import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { accountService } from '../apiServices/accountService';
import CreateAndEditAccount from '../components/CreateAndEditAccount';
import AccountBalanceCard from '../components/AccountBalanceCard';


export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    accountService.getAccounts()
      .then(res => {
        if (res.status < 400 && res.data) {
          setAccounts(res.data);
          setLoading(false);  
        }
      })
  }, [])

  return (
    <MainContainer>
      {loading ?
        <div className='w-full h-full grid place-content-center text-3xl font-bold text-black'>
          Loading...
        </div> :
        <div className='w-full h-full'>
          <h1 className='text-center text-2xl font-bold mt-2'>
            Accounts
          </h1>
          {accounts.length > 0 ?
          <>
            <div className='w-full flex flex-wrap justify-center px-6 mt-6'>
              {accounts.map((account) => {
                return (
                  <AccountBalanceCard key={account._id} account={account} setAccounts={setAccounts} />
                )
              })}
            </div> 
            <button onClick={() => setShowCreateAccount(true)}
            className='block mx-auto mt-10 py-3 px-6 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-500'>
              Create Account
            </button>
              </>
                  :
            <button onClick={() => setShowCreateAccount(true)}
            className='block mx-auto mt-60 py-3 px-6 font-semibold text-white rounded-lg bg-green-600 hover:bg-green-500'>
              Create Account
            </button>
          }
          {showCreateAccount && <CreateAndEditAccount setShowCreateAccount={setShowCreateAccount} setAccounts={setAccounts} />}
        </div>}
    </MainContainer>
  )
}
