import React from 'react'
import Input from './Input'
import { reportService } from '../apiServices/reportService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';

export default function ViewReport({ setShowViewReport, report, refreshPage }) {
    const dispatch = useDispatch();
    const inputClass = "bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out";

    const deleteReport = async () => {
        const response = await reportService.deleteReport({ rId: report.report[0]._id })

        if (response.status < 400 && response.data) {
            dispatch(setNotification({ text: response.message, type: "success" }));
            setShowViewReport(false);
            refreshPage();
        } else {
            dispatch(setNotification({ text: response.message, type: "error" }))
        }
    }

    return (
        <div className='h-screen w-screen fixed top-0 left-0 grid place-content-center half_transparent'>
            <div className='bg-white p-8 rounded-lg md:min-w-[50vw] lg:min-w-[40vw] h-[90vh] overflow-auto text-center'>
                <Input
                    type='text'
                    lable='Name'
                    value={report.owner.name}
                    inputClass={inputClass}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='Aadhar'
                    inputClass={inputClass}
                    value={report.owner.aadhar}
                    readOnly={true}
                />


                <Input
                    type='text'
                    lable='ID'
                    inputClass={inputClass}
                    value={report.owner.cId}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='Phone'
                    inputClass={inputClass}
                    value={report.owner.phone}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='Amount'
                    inputClass={inputClass}
                    value={report.amount}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='Date'
                    inputClass={inputClass}
                    value={new Date(report.createdAt).toLocaleString()}
                    readOnly={true}
                /> <br /> <br />
                <hr /><br />


                <Input
                    type='text'
                    lable='500 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.fiveh}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='200 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.twoh}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='100 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.oneh}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='50 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.fifty}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='20 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.twenty}
                    readOnly={true}
                />

                <Input
                    type='text'
                    lable='10 Rupees Notes Count'
                    inputClass={inputClass}
                    value={report.report[0]?.ten}
                    readOnly={true}
                />


                <Input
                    type='text'
                    lable='Other Coins Amount'
                    inputClass={inputClass}
                    value={report.report[0]?.others}
                    readOnly={true}
                /> <br /> <br />

                <div className='flex flex-nowrap justify-between'>
                    <button onClick={() => setShowViewReport(false)}
                        className='bg-blue-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-blue-500'>
                        close
                    </button>

                    <button onClick={deleteReport}
                        className='bg-red-600 py-2 px-4 text-white font-bold rounded-lg hover:bg-red-500'>
                        Delete Report
                    </button>
                </div>

            </div>
            <button onClick={() => setShowViewReport(false)}
                className='material-symbols-outlined text-white font-bold fixed top-4 right-4'>
                close
            </button>
        </div>
    )
}
