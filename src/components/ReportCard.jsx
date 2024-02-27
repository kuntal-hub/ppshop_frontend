import React,{useState} from 'react'
import { entryService } from '../apiServices/entryService';
import { setNotification } from '../store/notificaionSlice';
import { useDispatch } from 'react-redux';
import CreateReport from './CreateReport';
import EditReport from './EditReport';
import ViewReport from './ViewReport';

export default function ReportCard({report,index,setReports,refreshPage}) {
    const date = new Date(report.createdAt);
    const dispatch = useDispatch();
    const [showCreateReport, setShowCreateReport] = useState(false);
    const [showEitReport, setShowEditReport] = useState(false);
    const [showViewReport, setShowViewReport] = useState(false);

    const ShowEditOrCreateForm = ()=>{
        if (report.report.length === 0) {
            setShowCreateReport(true);
        } else {
            setShowEditReport(true);
        }
    }

    const deleteEntry = async ()=>{
        const confirm = window.confirm("Are you sure you want to delete this entry?");
        if (!confirm) return;
        const response = await entryService.deleteEntry({eId:report._id});
        if (response.status < 400 && response.data) {
            setReports(priv=>priv.filter((c,i)=>i!==index));
            dispatch(setNotification({text:response.message, type:"success"}))
        } else {
            dispatch(setNotification({text:response.message, type:"error"}))
        }
    }

return (
    <div className=' w-72 m-4 bg-white text-start p-5 rounded-2xl'>
        <p className='pb-2'><strong>Name :</strong> {report.owner.name}</p>
        <p className='pb-2'><strong>Aadhar :</strong> {report.owner.aadhar}</p>
        <p className='pb-2'><strong>ID :</strong> {report.owner.cId}</p>
        <p className='pb-2'><strong>Phone :</strong> {report.owner.phone}</p>
        <p className='pb-2'><strong>Amount :</strong> {report.amount}</p>
        <p className='pb-2'><strong>Pay From :</strong> {report.from}</p>
        <p className='pb-2'><strong>Date :</strong> {date.toLocaleString()}</p>

        <div className='flex flex-nowrap justify-between mt-3'>

            {report.report.length !== 0 && 
            <button onClick={()=>setShowViewReport(true)}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-blue-600 hover:bg-blue-500'>
                View
            </button>}

            <button onClick={ShowEditOrCreateForm}
            className={`py-2 font-semibold px-3 rounded-xl text-white ${report.report.length !== 0 ? "bg-yellow-600 hover:bg-yellow-500":"bg-green-600 hover:bg-green-500"}`}>
                {report.report.length === 0? "Create Report" : "Edit"}
            </button>
            
            <button onClick={deleteEntry}
            className='py-2 font-semibold px-3 rounded-xl text-white bg-red-600 hover:bg-red-500'>
                Delete
            </button>
        </div>
        {showCreateReport && report.report.length ===0 &&
        <CreateReport setShowCreateReport={setShowCreateReport} report={report} amount={report.amount} eId={report._id} refreshPage={refreshPage} />}
        {showEitReport && report.report.length !==0 &&
        <EditReport setShowEditReport={setShowEditReport} report={report.report[0]} entry={report} amount={report.amount} refreshPage={refreshPage} />}
        {showViewReport && report.report.length !==0 &&
        <ViewReport setShowViewReport={setShowViewReport} report={report} refreshPage={refreshPage} />}
    </div>
  )
}