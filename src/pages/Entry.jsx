import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { entryService } from "../apiServices/entryService.js";
import { customerService } from "../apiServices/customerService.js";
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../store/notificaionSlice'
import { updateAccounts } from '../store/accountSlice.js';
import { updateBalance } from '../store/balanceSlice.js';
import { accountService } from '../apiServices/accountService.js';
import { balanceService } from '../apiServices/balanceService.js';

export default function Entry() {
    const accounts = useSelector(state => state.accounts.accounts);
    const balance = useSelector(state=>state.balance.balance);
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState("");
    const [customerIdError, setCustomerIdError] = useState("");
    const [name, setName] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [amount,setAmount] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [accountId, setAccountId] = useState(accounts?.length>0 ? accounts[0]._id : "cash");
    const [isDisabled, setIsDisabled] = useState(false);

    const className = 'bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'

    const createEntry = async ()=>{
        if (Number.parseInt(amount) === 0 || !amount || isNaN(amount)) {
            dispatch(setNotification({text:"Enter Valid Amount to create Entry!",type:"info"}))
            return;
        }
        let response;
        if (customer) {
            setIsDisabled(true);
            response = await entryService.createEntry({customer_id:customer._id,amount:Number.parseInt(amount),accountId,remarks})
        } else if(!customer){
            if (customerIdError !== "Customer not found!") {
                dispatch(setNotification({text:"Invalid Customer Id!",type:"error"}))  
                return ;
            }
            if (aadhar.length < 12 || isNaN(aadhar)) {
                dispatch(setNotification({text:"Invalid Aadhar Number!",type:"error"}))
                return;
            }
            if (phone.length <10){
                dispatch(setNotification({text:"Invalid Phone number!",type:"error"}))
                return;
            }
            setIsDisabled(true);
            response = await entryService.createEntry({
                amount:Number.parseInt(amount),
                cId:customerId,
                name:name,
                aadhar:aadhar,
                phone:phone.trim(),
                address:address,
                accountId:accountId,
                remarks:remarks,
            })
        }

        if(response.status<400 && response.data){
            dispatch(setNotification({text:response.message,type:"success"}))
            dispatch(updateAccounts(accounts.map(acc => {
                if (acc._id === accountId) {
                    return { ...acc, balance: acc.balance - Number.parseInt(amount)}
                }
                return acc;
            }))
            )
            setCustomer(null);
            setCustomerId("");
            setCustomerIdError("");
            setName("");
            setAadhar("");
            setPhone("");
            setAddress("");
            // setAccountId("cash");
            setAmount(0);
            setIsDisabled(false);
        }else {
            dispatch(setNotification({text:response.message,type:"error"}))
            setIsDisabled(false);
        }
    }

    useEffect(() => {
        if (!accounts) {
            accountService.getAccounts()
            .then(response => {
                if (response.status < 400 && response.data) {
                    dispatch(updateAccounts(response.data))
                }
            })
            .then(()=>{
                if (!balance) {
                    balanceService.getBalance()
                    .then(response=>{
                        if (response.status < 400 && response.data) {
                            dispatch(updateBalance(response.data));
                        }
                    })
                }
            })
        }
    },[])

    useEffect(() => {
        if (customerId.trim().length >= 4) {
            const timeout = setTimeout(async () => {
                customerService.findCustomer({ cId: customerId })
                    .then(response => {
                        if (response.status < 400 && response.data) {
                            setCustomer(response.data);
                            setCustomerIdError("Customer Found!");
                        } else {
                            setCustomer(null);
                            setCustomerIdError(response.message);
                        }
                    })
            }, 800);
            return () => clearTimeout(timeout);
        } else {
            setCustomer(null);
        }
    }, [customerId])

    return (
        <MainContainer>
            <div className='mx-auto sm:w-[80%] md:w-[50%] lg:w-[35%] pt-2'>

                    <label htmlFor="customerId"
                        className='text-black font-semibold block mb-1'
                    >
                        Customer Id :
                    </label>
                    <input tabIndex={1}
                        id="customerId"
                        type="text"
                        placeholder='Enter customer id'
                        className={className}
                        value={customerId}
                        onChange={(e) => {
                            const value = e.target.value.trim();
                            setCustomerId(value);
                            if (value.length >= 4) {
                                setCustomerIdError("");
                            } else {
                                setCustomerIdError("Enter atleast 4 characters");
                            }
                        }}
                    /> <br />
                    {customerIdError && <p className={`${customerIdError === "Customer Found!" ? "text-green-500" : "text-red-500"} font-semibold text-sm text-start`}>{customerIdError}</p>}

                    <label htmlFor="customerName" className='text-black font-semibold block mb-1' >
                        Customer Name :
                    </label>
                    <input tabIndex={3}
                        type="text"
                        id="customerName"
                        className={className}
                        required={true}
                        placeholder="Enter customer name"
                        value={customer ? customer.name : name}
                        readOnly={customer ? true : false}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="aadhar" className='text-black font-semibold block mb-1'>
                        Aadhar :
                    </label>
                    <input tabIndex={4}
                        type="text"
                        id="aadhar"
                        className={className}
                        required={true}
                        placeholder="Enter aadhar number"
                        value={customer ? customer.aadhar : aadhar}
                        readOnly={customer ? true : false}
                        onChange={(e) => setAadhar(e.target.value.trim())}
                    />

                    <label htmlFor="phone" className='text-black font-semibold block mb-1'>
                        Phone :
                    </label>
                    <input tabIndex={5}
                        type="text"
                        id="phone"
                        className={className}
                        required={true}
                        placeholder="Enter phone number"
                        value={customer ? customer.phone : phone}
                        readOnly={customer ? true : false}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label htmlFor="address" className='text-black font-semibold block mb-1'>
                        Address :
                    </label>
                    <input tabIndex={6}
                        type="text"
                        id="address"
                        className={className}
                        placeholder="Enter address"
                        value={customer ? customer.address : address}
                        readOnly={customer ? true : false}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label htmlFor="amount" className='text-black font-semibold block mb-1'>
                        Amount :
                    </label>
                    <input tabIndex={2}
                        type="number"
                        id="amount"
                        className={className}
                        placeholder="Enter amount"
                        required={true}
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value.trim())}
                    />
                    <div className='flex flex-nowrap w-full justify-center mt-2'>
                        <label htmlFor="payFrom"
                        className='text-black font-bold block mb-1 mt-2 w-1/3 text-center '
                        > Pay From :</label>
                        <select name="payFrom" id="payFrom" tabIndex={7}
                        value={accountId}
                        onChange={(e)=>setAccountId(e.target.value)}
                        className='bg-gray-100 text-black w-full py-2 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out ml-[1px]'
                        >
                            { accounts &&
                                accounts.map((account) => {
                                    return (
                                        <option key={account._id} value={account._id}>{account.name} (Rs.{account.balance})</option>
                                        )
                                    })
                                }
                            <option value="cash">Cash (Rs.{balance? balance.total : 0})</option>
                        </select>
                    </div>

                    <div className='flex flex-nowrap w-full justify-center mt-2'>
                        <label htmlFor="remarks"
                        className='text-black font-bold block mb-1 mt-2 w-1/3 text-center '
                        > Remarks :</label>
                        <input name="remarks" id="remarks" tabIndex={8}
                        value={remarks}
                        onChange={(e)=>setRemarks(e.target.value)}
                        className='bg-gray-100 text-black w-full py-2 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out ml-[1px]'
                        />
                    </div>

                    <button onClick={createEntry} disabled={isDisabled} tabIndex={9}
                    className='text-white hover:bg-green-500 bg-green-600 py-3 px-6 rounded-lg font-semibold mt-2'>
                        Create Entry
                    </button>

            </div>
        </MainContainer>
    )
}
