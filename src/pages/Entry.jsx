import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { entryService } from "../apiServices/entryService.js";
import { customerService } from "../apiServices/customerService.js";
import { useDispatch } from 'react-redux'
import { setNotification } from '../store/notificaionSlice'

export default function Entry() {
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState(null);
    const [customerId, setCustomerId] = useState("");
    const [customerIdError, setCustomerIdError] = useState("");
    const [name, setName] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [amount,setAmount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const className = 'bg-gray-100 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'

    const createEntry = async ()=>{
        if (Number.parseInt(amount) === 0 || !amount) {
            dispatch(setNotification({text:"Enter Amount to create Entry!",type:"info"}))
            return;
        }
        let response;
        if (customer) {
            setIsDisabled(true);
            response = await entryService.createEntry({customer_id:customer._id,amount:Number.parseInt(amount)})
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
                address:address
            })
        }

        if(response.status<400 && response.data){
            dispatch(setNotification({text:response.message,type:"success"}))
            setCustomer(null);
            setCustomerId("");
            setCustomerIdError("");
            setName("");
            setAadhar("");
            setPhone("");
            setAddress("");
            setAmount(0);
            setIsDisabled(false);
        }else {
            dispatch(setNotification({text:response.message,type:"error"}))
            setIsDisabled(false);
        }
    }

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
        }
    }, [customerId])

    return (
        <MainContainer>
            <div className='mx-auto sm:w-[80%] md:w-[50%] lg:w-[35%] pt-6'>

                    <label htmlFor="customerId"
                        className='text-black font-semibold block mb-1'
                    >
                        Customer Id :
                    </label>
                    <input
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
                    {customerIdError && <p className={`${customerIdError === "Customer Found!" ? "text-green-500" : "text-red-500"} font-semibold text-sm text-start`}>{customerIdError}</p>} <br />

                    <label htmlFor="customerName" className='text-black font-semibold block mb-1' >
                        Customer Name :
                    </label>
                    <input
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
                    <input
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
                    <input
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
                    <input
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
                    <input
                        type="number"
                        id="amount"
                        className={className}
                        placeholder="Enter amount"
                        required={true}
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value.trim())}
                    />

                    <button onClick={createEntry}
                    className='text-white hover:bg-green-500 bg-green-600 py-3 px-6 rounded-lg font-semibold mt-6'>
                        Create Entry
                    </button>

            </div>
        </MainContainer>
    )
}
