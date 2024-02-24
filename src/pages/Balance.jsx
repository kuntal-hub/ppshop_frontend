import React,{useState,useEffect} from 'react';
import MainContainer from '../components/MainContainer';
import {balanceService} from "../apiServices/balanceService.js";
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance } from '../store/balanceSlice';
import { setNotification } from '../store/notificaionSlice';

export default function Balance() {
    const [fiveh, setFiveh] = useState(0);
    const [twoh, setTwoh] = useState(0);
    const [oneh, setOneh] = useState(0);
    const [fifty, setFifty] = useState(0);
    const [twenty, setTwenty] = useState(0);
    const [ten, setTen] = useState(0);
    const [others, setOthers] = useState(0);
    const balance = useSelector(state=>state.balance.balance);
    const [isDisabled, setIsDisabled] = useState(false);
    const dispatch = useDispatch();

    const saveChanges = async ()=>{
        if (
            fiveh === balance.fiveh && 
            twoh === balance.twoh && 
            oneh === balance.oneh && 
            fifty === balance.fifty && 
            twenty === balance.twenty && 
            ten === balance.ten && 
            others === balance.others) {
            dispatch(setNotification({text:"Nothing to Update", type:"info"}))
            return;
        }

        setIsDisabled(true);
        const response = await balanceService.updateBalance({
            fiveh:fiveh,
            twoh:twoh,
            oneh:oneh,
            fifty:fifty,
            twenty:twenty,
            ten:ten,
            others:others
        }) 

        if (response.status < 400 && response.data) {
            dispatch(setNotification({text:response.message, type:"success"}))
            dispatch(updateBalance(response.data));
            setIsDisabled(false);
        } else {
            dispatch(setNotification({text:response.message, type:"error"}))
            setIsDisabled(false);
        }
    }

    useEffect(()=>{
        if (!balance) {
            balanceService.getBalance()
            .then(response=>{
                if (response.status < 400 && response.data) {
                    setFiveh(response.data.fiveh);
                    setTwoh(response.data.twoh);
                    setOneh(response.data.oneh);
                    setFifty(response.data.fifty);
                    setTwenty(response.data.twenty);
                    setTen(response.data.ten);
                    setOthers(response.data.others);
                } else {
                    dispatch(setNotification({text:response.message, type:"error"}))
                }
            })
        } else{
            setFiveh(balance.fiveh);
            setTwoh(balance.twoh);
            setOneh(balance.oneh);
            setFifty(balance.fifty);
            setTwenty(balance.twenty);
            setTen(balance.ten);
            setOthers(balance.others);
        }
    },[])
    
  return (
    <MainContainer>
        <div className='flex flex-nowrap justify-center py-8'>
            <div className='w-[30%] mx-4'>
                <label htmlFor="fivehCount"
                className='text-black font-semibold block mb-1'
                >500 :</label>
                <input type="number"
                value={fiveh}
                id="fivehCount"
                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                onChange={(e)=>{
                    const value = Number.parseInt(e.target.value);
                    if (value >= 0) {
                        setFiveh(value);
                    } else {
                        setFiveh(0);
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
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setTwoh(value);
                        } else {
                            setTwoh(0);
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
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setOneh(value);
                        } else {
                            setOneh(0);
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
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setFifty(value);
                        } else {
                            setFifty(0);
                        }
                    }
                }
                /><br /><br />
            </div>
            <div className='w-[30%] mx-4'>
                <label htmlFor="twentyCount"
                className='text-black font-semibold block mb-1'
                >20 :</label>
                <input type="number"
                value={twenty}
                id="twentyCount"
                className="bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                onChange={
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setTwenty(value);
                        } else {
                            setTwenty(0);
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
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setTen(value);
                        } else {
                            setTen(0);
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
                    (e)=>{
                        const value = Number.parseInt(e.target.value);
                        if (value >= 0) {
                            setOthers(value);
                        } else {
                            setOthers(0);
                        }
                    }
                }
                /><br /><br />

                <label htmlFor="totalCount"
                className='text-red-500 text-xl font-bold block mb-1'
                >Total :</label>
                <input type="number"
                value={(fiveh*500)+(twoh*200)+(oneh*100)+(fifty*50)+(twenty*20)+(ten*10)+others}
                id="totalCount"
                className="bg-green-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                readOnly={true}
                /><br /><br />

            </div>
        </div>
        <button onClick={saveChanges} disabled={isDisabled}
        className='block mx-auto bg-green-600 hover:bg-green-500 font-semibold rounded-lg text-white py-3 px-6'>
            Save Changes
        </button>
    </MainContainer>
  )
}
