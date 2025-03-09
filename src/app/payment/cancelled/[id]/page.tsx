import Link from 'next/link'
import React from 'react'

const success = () => {
  return (

    <div className='flex items-center justify-center h-screen w-screen'>

    <div className="flex items-center justify-center min-h-screen">

  
    <div className="bg-red-500 p-6 rounded-lg shadow-lg mb-8 relative text-center w-full max-w-md">

       
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>

       
        <h3 className="text-2xl font-semibold text-white mb-4">Payment Cancelled!</h3>
        <p className="text-white text-lg mb-8">order payment cancelled</p>

      
        <div className="flex justify-center items-center mt-6">

           
            <Link href="/" className="w-1/2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-center">
               Go Back
            </Link>

        </div>

    </div>

</div>
</div>
     
  )
}

export default success