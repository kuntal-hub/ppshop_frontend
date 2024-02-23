import React,{useState,useEffect} from 'react';
import MainContainer from '../components/MainContainer';
import CustomerForm from '../components/CustomerCreateForm';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import {customerService} from "../apiServices/customerService.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomerCard from '../components/CustomerCard.jsx';

export default function CInfo() {
  const [customers, setCustomers] = useState([]);
  const [resData, setResData] = useState(null)
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [searchBy, setSearchBy] = useState('cId');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);


  useEffect(()=>{
    customerService.getAllCustomers({page:page, limit:20})
    .then(response=>{
      if (response.status < 400 && response.data) {
        setResData(response.data);
        if (page ===1) {
          setCustomers(response.data.docs);
        } else {
          setCustomers(priv=>priv.concat(response.data.docs));
        }
      } else {
        dispatch(setNotification({text:response.message, type:"error"}))
      }
    })
  },[page])

  useEffect(()=>{
    let timeout;
    if (search.trim() !== "") {
      timeout = setTimeout(async()=>{
        const response = await customerService.sesrchCustomer({searchBy, search, page:1, limit:20});
        if (response.status < 400 && response.data) {
          setResData(response.data);
          setCustomers(response.data.docs);
        } else {
          dispatch(setNotification({text:response.message, type:"error"}))
        }
      }, 800);

      return ()=>clearTimeout(timeout);
    }
  },[search,searchBy])

  return (
    <MainContainer>
      <div className='w-full flex flex-nowrap justify-between py-1 px-3'>
        <div className='flex justify-end flex-nowrap h-full w-[70%]'>
          <label htmlFor="infoSearch" className='material-symbols-outlined p-2 rounded-l-lg bg-white block'>
            search
          </label>
          <input type="search" name="search" id="infoSearch"
          placeholder='Search...'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className='p-2 block rounded-r-lg w-[50%]'
          />
          <label htmlFor="searchBy" className='p-2 rounded-l-lg bg-white block ml-2 border-r-2'>Search By</label>
          <select name="searchBy" id="searchBy" className='p-2 block rounded-r-lg outline-none'
          value={searchBy}
          onChange={(e)=>setSearchBy(e.target.value)}
          >
            <option value="cId">ID</option>
            <option value="name">NAME</option>
            <option value="aadhar">AADHAR</option>
            <option value="phone">PHONE</option>
          </select>
        </div>
        <div className='flex flex-nowrap w-[30%] justify-end'>
        <button onClick={()=>setPage(1)}
         className='bg-blue-600 py-2 px-3 text-white font-bold rounded-lg hover:bg-blue-500 mr-3'>
          Refresh
        </button>
        <button onClick={()=>setShowForm(true)}
         className='bg-green-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-green-500'>
          Create
        </button>
        </div>
      </div>

{ resData && <div className='w-full h-full'>
          <InfiniteScroll
          dataLength={customers.length}
          next={()=>setPage(page+1)}
          hasMore={resData.hasNextPage}
          loader={<h4 className='w-full text-center'>Loading...</h4>}
          endMessage={
            <p className='w-full text-center'>No More Data</p>
          }
          >
            <div className='flex flex-wrap justify-center px-6 py-2'>
                {
                  customers.map((customer, index)=>(
                    <CustomerCard key={index} customer={customer} index={index} setCustomers={setCustomers} />
                  ))
                }
            </div>
          </InfiniteScroll>
      </div>}



      {showForm && <CustomerForm setShowForm={setShowForm} setCustomers={setCustomers} />}
    </MainContainer>
  )
}
