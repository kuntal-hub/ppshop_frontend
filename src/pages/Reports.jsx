import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {reportService} from "../apiServices/reportService.js"
import MainContainer from "../components/MainContainer.jsx"
import { setNotification } from '../store/notificaionSlice.js'
import ReportCard from '../components/ReportCard.jsx'
import InfiniteScroll from 'react-infinite-scroll-component';
import DeleteAllEntry from '../components/DeleteAllEntry.jsx'

export default function Reports() {
  const [resData, setResData] = useState(null)
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [reports, setReports] = useState([]);
  const [showDeleteAllComponent, setShowDeleteAllComponent] = useState(false);

  const refreshPage = async ()=>{
    reportService.getAllReports({page:1, limit:20})
    .then(response=>{
      if (response.status < 400 && response.data) {
        setResData(response.data);
        setReports(response.data.docs);
        setPage(1);
      } else {
        dispatch(setNotification({text:response.message, type:"error"}))
      }
    })
  }

  useEffect(() => {
    reportService.getAllReports({page:page, limit:20})
    .then(response=>{
      if (response.status < 400 && response.data) {
        setResData(response.data);
        if (page ===1) {
          setReports(response.data.docs);
        } else {
          setReports(priv=>priv.concat(response.data.docs));
        }
      } else {
        dispatch(setNotification({text:response.message, type:"error"}))
      }
    })
  },[page])

  return (
    <MainContainer>
      <div className='w-full h-full'>
      { resData && <div className='w-full h-full'>
        <div className='flex flex-nowrap justify-between w-full'>
            <button onClick={()=>setShowDeleteAllComponent(!showDeleteAllComponent)}
            className='bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg mt-2 ml-3'>
              Delete All
            </button>
            <h1 className=' text-2xl font-bold mt-2'>
              All Reports 
            </h1>
            <button className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mt-2 mr-3'>
              Download 
            </button>
        </div>
          <InfiniteScroll
          dataLength={reports.length}
          next={()=>setPage(page+1)}
          hasMore={resData.hasNextPage}
          loader={<h4 className='w-full text-center'>Loading...</h4>}
          endMessage={
            <p className='w-full text-center'>No More Data</p>
          }
          >
            <div className='flex flex-wrap justify-center px-6 py-2'>
                {
                  reports.map((report, index)=>(
                    <ReportCard key={index} report={report} index={index} setReports={setReports} refreshPage={refreshPage} />
                  ))
                }
            </div>
          </InfiniteScroll>
      </div>}
                {showDeleteAllComponent && <DeleteAllEntry setShowDeleteAllComponent={setShowDeleteAllComponent} refreshPage={refreshPage} />}
      </div>
    </MainContainer>
  )
}

