import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='grid w-screen h-screen place-content-center bg-white'>
        <div className='w-[90vw] md:w-[50vw] sm:w-[70vw] lg:w-[30vw]'>
        <img src="./5203299.jpg" alt="img" className='block w-full' />
        <p className='block mx-auto text-center'>Page Not Found! 😵 | Go To <Link to={"/"} className='text-blue-700 hover:underline'>Home</Link></p>
        </div>
    </div>
  )
}