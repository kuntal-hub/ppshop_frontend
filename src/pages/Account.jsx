import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { accountService } from '../apiServices/accountService';
import CreateAndEditAccount from '../components/CreateAndEditAccount';
import AccountBalanceCard from '../components/AccountBalanceCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccounts } from '../store/accountSlice';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const balance = useSelector(state => state.balance.balance);
  const dispatch = useDispatch();
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    accountService.getAccounts()
      .then(res => {
        if (res.status < 400 && res.data) {
          setAccounts(res.data);
          dispatch(updateAccounts(res.data));
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

                <div className='w-72 m-4 bg-white text-start p-5 rounded-2xl'>
                  <p className='text-center font-bold text-xl'>cash</p>
                  <br />
                  <p><strong>Balance : </strong> {balance ? balance.total : 0}</p>
                  <br />
                  <div className='flex flex-nowrap justify-between'>
                    <button disabled={true}
                      className='py-2 font-semibold px-3 rounded-xl text-white bg-red-400 '>
                      Delete
                    </button>

                    <button onClick={() => navigate(`/account/download/cash`)}
                      className='py-2 font-semibold px-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500'>
                      View
                    </button>

                    <button disabled={true}
                      className='py-2 font-semibold px-3 rounded-xl text-white bg-green-400'>
                      Edit
                    </button>

                  </div>
                </div>

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
