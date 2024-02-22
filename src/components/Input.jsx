import React,{useId,memo,forwardRef} from 'react'

export default memo(forwardRef(function Input({type,lable,
    labelClass="text-black font-semibold block mb-1",
    inputClass="bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out",
    ...props},ref) {
    const id = useId()
  return (
    <>
    <label className={labelClass} htmlFor={id}>{lable} :</label>
    <input
    className={inputClass}
    type={type} {...props} id={id} ref={ref} />
    </>
  )
}));