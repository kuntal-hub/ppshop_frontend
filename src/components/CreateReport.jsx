import React, { useState, useEffect } from 'react'
import Input from './Input'
import { useSelector, useDispatch } from 'react-redux'
import MainContainer from './MainContainer'
import { reportService } from "../apiServices/reportService.js"
import { balanceService } from "../apiServices/balanceService.js"
import { setNotification } from '../store/notificaionSlice'
import { updateBalance } from '../store/balanceSlice'
import Slip from './Slip.jsx'

export default function CreateReport({ setShowCreateReport,report, amount, eId, refreshPage }) {
    const dispatch = useDispatch();
    const [fiveh, setFiveh] = useState(0);
    const [twoh, setTwoh] = useState(0);
    const [oneh, setOneh] = useState(0);
    const [fifty, setFifty] = useState(0);
    const [twenty, setTwenty] = useState(0);
    const [ten, setTen] = useState(0);
    const [others, setOthers] = useState(0);
    const [showGenarateSlip,setShowGenarateSlip] = useState(false);
    const balance = useSelector(state => state.balance.balance);
    const [isDisabled, setIsDisabled] = useState(false);
    const payableAmount = amount<0 ? Number.parseInt(String(amount).replace("-","")) : Number.parseInt("-"+amount)
    

    const total = (isNaN(fiveh) ? 0 : fiveh * 500) + (isNaN(twoh) ? 0 : twoh * 200) + (isNaN(oneh) ? 0 : oneh * 100) + (isNaN(fifty) ? 0 : fifty * 50) + (isNaN(twenty) ? 0 : twenty * 20) + (isNaN(ten) ? 0 : ten * 10) + (isNaN(others) ? 0 : others);

    const avalable500 = balance ? (isNaN(fiveh) ? balance.fiveh : fiveh + balance.fiveh) : 0;
    const avalable200 = balance ? (isNaN(twoh) ? balance.twoh : twoh + balance.twoh) : 0;
    const avalable100 = balance ? (isNaN(oneh) ? balance.oneh : oneh + balance.oneh) : 0;
    const avalable50 = balance ? (isNaN(fifty) ? balance.fifty : fifty + balance.fifty) : 0;
    const avalable20 = balance ? (isNaN(twenty) ? balance.twenty : twenty + balance.twenty) : 0;
    const avalable10 = balance ? (isNaN(ten) ? balance.ten : ten + balance.ten) : 0;
    const avalableOthers = balance ? (isNaN(others) ? balance.others : others + balance.others) : 0;

    useEffect(() => {
        if (!balance) {
            balanceService.getBalance()
                .then(res => {
                    if (res.status < 400 && res.data) {
                        dispatch(updateBalance(res.data))
                    } else {
                        dispatch(setNotification({ text: response.message, type: "error" }))
                    }
                })
        }
    },[])

    const createReport = async () => {
        if (total !== payableAmount) {
            dispatch(setNotification({ text: "Total amount is not equal to the payable amount", type: "error" }));
            return;
        }
        if (avalable500 < 0) {
            dispatch(setNotification({ text: "500 notes are not enough", type: "error" }));
            return;
        }
        if (avalable200 < 0) {
            dispatch(setNotification({ text: "200 notes are not enough", type: "error" }));
            return;
        }
        if (avalable100 < 0) {
            dispatch(setNotification({ text: "100 notes are not enough", type: "error" }));
            return;
        }
        if (avalable50 < 0) {
            dispatch(setNotification({ text: "50 notes are not enough", type: "error" }));
            return;
        }
        if (avalable20 < 0) {
            dispatch(setNotification({ text: "20 notes are not enough", type: "error" }));
            return;
        }
        if (avalable10 < 0) {
            dispatch(setNotification({ text: "10 notes are not enough", type: "error" }));
            return;
        }
        if (avalableOthers < 0) {
            dispatch(setNotification({ text: "Others coins are not enough", type: "error" }));
            return;
        }

        setIsDisabled(true)
        const data = {
            fiveh: isNaN(fiveh) || fiveh==="" ? 0 : fiveh,
            twoh: isNaN(twoh) || twoh==="" ? 0 : twoh,
            oneh: isNaN(oneh) || oneh==="" ? 0 : oneh,
            fifty: isNaN(fifty) || fifty==="" ? 0 : fifty,
            twenty: isNaN(twenty) || twenty==="" ? 0 : twenty,
            ten: isNaN(ten) || ten==="" ? 0 : ten,
            others: isNaN(others) || others==="" ? 0 : others,
            eId: eId
        }

        const response = await reportService.createReport(data);

        if (response.status < 400 && response.data) {
            dispatch(setNotification({ text: response.message, type: "success" }))
            dispatch(updateBalance(response.data.balance))
            setShowCreateReport(false);
            refreshPage();
        } else {
            setIsDisabled(false)
            dispatch(setNotification({ text: response.message, type: "error" }))
        }
    }

    return (
        <MainContainer>

            <div className='m-0 text-center p-3 flex flex-nowrap justify-between'>
                <button onClick={()=>setShowGenarateSlip(true)}
                className='text-center block px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-white'>
                    Download Slip
                </button>
                <p className='m-0 p-0 text-center text-2xl block'>
                    <strong>Amount Payable : </strong> {amount}
                </p>
                <button onClick={() => setShowCreateReport(false)} className='material-symbols-outlined text-right block'>
                    close
                </button>
            </div>

            <div className='w-full flex flex-nowrap justify-center'>
                <div className='w-[50%] pt-3'>
                    <p className='w-full text-center text-lg mb-2'>
                        <strong>
                            Payment Details
                        </strong>
                    </p>

                    <div className='w-full flex flex-nowrap justify-center'>
                        <div className="text-center w-[40%] mr-4">
                            <label htmlFor="fivehCount"
                                className='text-black font-semibold block mb-1'
                            >500 :</label>
                            <input type="number"
                                value={fiveh}
                                id="fivehCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={(e) => {
                                    const value = Number.parseInt(e.target.value);
                                    if (isNaN(value)) {
                                        setFiveh(e.target.value.trim())
                                    } else {
                                        setFiveh(value);
                                    }
                                }}
                            /> <br /><br />

                            <label htmlFor="twohCount"
                                className='text-black font-semibold block mb-1'
                            >200 :</label>
                            <input type="number"
                                value={twoh}
                                id="twohCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setTwoh(e.target.value.trim())
                                        } else {
                                            setTwoh(value);
                                        }
                                    }
                                }
                            /><br /><br />

                            <label htmlFor="onehCount"
                                className='text-black font-semibold block mb-1'
                            >100 :</label>
                            <input type="number"
                                value={oneh}
                                id="onehCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setOneh(e.target.value.trim())
                                        } else {
                                            setOneh(value);
                                        }
                                    }
                                }
                            /><br /><br />

                            <label htmlFor="fiftyCount"
                                className='text-black font-semibold block mb-1'
                            >50 :</label>
                            <input type="number"
                                value={fifty}
                                id="fiftyCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setFifty(e.target.value.trim())
                                        } else {
                                            setFifty(value);
                                        }
                                    }
                                }
                            />
                        </div>

                        <div className="text-center w-[40%] ml-4">
                            <label htmlFor="twentyCount"
                                className='text-black font-semibold block mb-1'
                            >20 :</label>
                            <input type="number"
                                value={twenty}
                                id="twentyCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setTwenty(e.target.value.trim())
                                        } else {
                                            setTwenty(value);
                                        }
                                    }
                                }
                            /><br /><br />

                            <label htmlFor="tenCount"
                                className='text-black font-semibold block mb-1'
                            >10 :</label>
                            <input type="number"
                                value={ten}
                                id="tenCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setTen(e.target.value.trim())
                                        } else {
                                            setTen(value);
                                        }
                                    }
                                }
                            /><br /><br />

                            <label htmlFor="othersCount"
                                className='text-black font-semibold block mb-1'
                            >Others :</label>
                            <input type="number"
                                value={others}
                                id="othersCount"
                                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                onChange={
                                    (e) => {
                                        const value = Number.parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            setOthers(e.target.value.trim())
                                        } else {
                                            setOthers(value);
                                        }
                                    }
                                }
                            /><br /><br />

                            <label htmlFor="totalCount"
                                className='text-red-500 font-bold block mb-1'
                            >Total :</label>
                            <input type="number"
                                value={total}
                                id="totalCount"
                                className={`${total !== payableAmount ? "bg-red-300" : "bg-green-200"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <button onClick={createReport} disabled={isDisabled}
                        className='text-center block mx-auto px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-white mt-8'>
                        Create Report
                    </button>
                </div>
                <div className='w-[50%] pt-3'>
                    <p className='w-full text-center text-lg mb-2'>
                        <strong>Available Cash Balance</strong>
                    </p>

                    <div className='w-full flex flex-nowrap justify-center'>
                        <div className='text-center w-[40%] mr-4'>
                            <Input
                                type="text"
                                lable="500"
                                value={avalable500}
                                inputClass={`${avalable500 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /><br /><br />


                            <Input
                                type="text"
                                lable="200"
                                value={avalable200}
                                inputClass={`${avalable200 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /><br /><br />

                            <Input
                                type="text"
                                lable="100"
                                value={avalable100}
                                inputClass={`${avalable100 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /><br /><br />

                            <Input
                                type="text"
                                lable="50"
                                value={avalable50}
                                inputClass={`${avalable50 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            />

                        </div>

                        <div className='text-center w-[40%] ml-4'>

                            <Input
                                type="text"
                                lable="20"
                                value={avalable20}
                                inputClass={`${avalable20 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /><br /><br />

                            <Input
                                type="text"
                                lable="10"
                                value={avalable10}
                                inputClass={`${avalable10 < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /><br /><br />

                            <Input
                                type="text"
                                lable="Others"
                                value={avalableOthers}
                                inputClass={`${avalableOthers < 0 ? "bg-red-300" : "bg-gray-100"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                readOnly={true}
                            /> <br /><br />

                            <Input
                                type="text"
                                lable="Total Balance"
                                labelClass="text-red-500 font-bold block mb-1"
                                inputClass={`${(balance ? balance.total + total : total) < 0 ? "bg-red-300" : "bg-green-200"} text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out`}
                                value={balance ? balance.total + total : 0}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showGenarateSlip && 
                <Slip report={report} setShowGenarateSlip={setShowGenarateSlip}
                notes={{fiveh,twoh,oneh,fifty,twenty,ten,others}}
                />
            }

        </MainContainer>
    )
}
