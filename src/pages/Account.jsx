import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { accountService } from '../apiServices/accountService';
import CreateAndEditAccount from '../components/CreateAndEditAccount';
import AccountBalanceCard from '../components/AccountBalanceCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccounts } from '../store/accountSlice';
import { useNavigate } from 'react-router-dom';
import {balanceService} from "../apiServices/balanceService.js";
import { updateBalance } from '../store/balanceSlice';
import { setNotification } from '../store/notificaionSlice.js';

export default function Account() {
  // const allAccounts = useSelector(state=>state.accounts.accounts);
  const [loading, setLoading] = useState(true);
  const balance = useSelector(state => state.balance.balance);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  let totalOpeningBalance = 0;
  let totalClosingBalance = 0;
  let totalTurnover = 0;

  if (accounts && accounts.length > 0) {
    accounts.forEach(account => {
      totalOpeningBalance += account.firstEntry ? account.firstEntry.ob : account.balance;
      totalClosingBalance += account.balance;
      totalTurnover += account.totalTurnover;
    });
  }

  useEffect(() => {
    async function fetchData() {
      
        const response = await accountService.getAccounts();
        if (response.status < 400 && response.data) {
          setAccounts(response.data);
          dispatch(updateAccounts(response.data));
        } else {
          dispatch(setNotification({ text: response.message, type: "error" }))
        }
      
      if (!balance) {
        const response = await balanceService.getBalance();
        if (response.status < 400 && response.data) {
          dispatch(updateBalance(response.data));
        } else {
          dispatch(setNotification({ text: response.message, type: "error" }))
        }
      }
      setLoading(false);
    }

    if (user && user.role === "admin") {
      fetchData();
    } else {
      navigate("/");
    }
  }, [])

  return (
    <MainContainer>
      {loading ?
        <div className='w-full h-full grid place-content-center text-3xl font-bold text-black'>
          Loading...
        </div> :
        <div className='w-full h-auto overflow-auto mb-5'>
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
                      className='py-2 font-semibold px-3 cursor-not-allowed rounded-xl text-white bg-red-400 '>
                      Delete
                    </button>

                    <button onClick={() => navigate(`/account/download/cash`)}
                      className='py-2 font-semibold px-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500'>
                      View
                    </button>

                    <button disabled={true}
                      className='py-2 font-semibold px-3 cursor-not-allowed rounded-xl text-white bg-green-400'>
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
        {
          !loading && <div className='w-[1440px] h-[165px] mx-auto px-5 pb-10'>
                <table className=' max-w-[1400px]'>
                    <thead>
                      <tr>
                        <th></th>
                        {accounts.map((account, i) => {
                          return (
                            <th key={i} className='text-center'>{account.name}</th>
                          )
                        })}
                        <th>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-center'>Opening Balance</td>
                        {accounts.map((account, i) => {
                          return (
                            <td key={i} className='text-center'>{account.firstEntry? account.firstEntry.ob : account.balance}</td>
                          )
                        })}
                        <td className='text-center'>{totalOpeningBalance}</td>
                      </tr>
                      <tr>
                        <td>
                          Closing Balance
                        </td>
                        {accounts.map((account, i) => {
                          return (
                            <td key={i} className='text-center'>{account.balance}</td>
                          )
                        })}
                        <td className='text-center'>{totalClosingBalance}</td>
                      </tr>
                      <tr>
                        <td>
                          Turnover
                        </td>
                        {accounts.map((account, i) => {
                          return (
                            <td key={i} className='text-center'>{account.totalTurnover}</td>
                          )
                        })}
                        <td className='text-center'>{totalTurnover}</td>
                      </tr>

                    </tbody>
                </table>
          </div>
        }
    </MainContainer>
  )
}
