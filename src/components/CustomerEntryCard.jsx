import React, { useState } from 'react'
import CreateReport from './CreateReport';
import EditReport from './EditReport';

export default function CustomerEntryCard({ entry, refreshPage }) {
    const date = new Date(entry.createdAt);
    const [showCreateReport, setShowCreateReport] = useState(false)
    const [showEitReport, setShowEditReport] = useState(false);
    return (
        <div className=' w-72 m-4 bg-white text-start p-5 rounded-2xl'>
            <p className='pb-2'><strong>Amount :</strong> {entry.amount}</p>
            <p className='pb-2'><strong>Pay From :</strong> {entry.from}</p>
            <p className='pb-2'><strong>Remarks :</strong> {entry.remarks}</p>
            <p className='pb-2'><strong>Date :</strong> {date.toLocaleString()}</p>

            <p className='text-center font-bold pb-3'>Details :</p>

            {
                entry.report.length === 0 &&
                <>
                    <p className='text-center font-semibold text-red-500'>
                        Entery Report Not Created!
                    </p>
                    <button onClick={() => setShowCreateReport(true)}
                        className='py-2 font-semibold px-3 rounded-xl text-white bg-green-600 hover:bg-green-500 block mx-auto my-4'>
                        Create Report
                    </button>
                </>
            }

            {
                entry.report.length !== 0 &&
                <>
                    <p className=''><strong>500 :</strong> {entry.report[0].fiveh}</p>
                    <p className=''><strong>200 :</strong> {entry.report[0].twoh}</p>
                    <p className=''><strong>100 :</strong> {entry.report[0].oneh}</p>
                    <p className=''><strong>50 :</strong> {entry.report[0].fifty}</p>
                    <p className=''><strong>20 :</strong> {entry.report[0].twenty}</p>
                    <p className=''><strong>10 :</strong> {entry.report[0].ten}</p>
                    <p className=''><strong>Others :</strong> {entry.report[0].others}</p>
                    <button onClick={()=>setShowEditReport(true)}
                    className='py-2 font-semibold px-3 rounded-xl text-white bg-green-600 hover:bg-green-500 block mx-auto my-4'>
                        Update Report
                    </button>
                </>
            }


            {
                showCreateReport &&
                <CreateReport
                    eId={entry._id}
                    setShowCreateReport={setShowCreateReport}
                    amount={entry.amount}
                    refreshPage={refreshPage} />
            }
            {
                showEitReport &&
                <EditReport
                    setShowEditReport={setShowEditReport}
                    report={entry.report[0]}
                    amount={entry.amount}
                    refreshPage={refreshPage} />
            }

        </div>
    )
}
