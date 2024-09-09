// import React from 'react'

// const formtext = () => {
//   return (
//     <div className='Negelect this div.....Start from the next'>
//         <div className='relative bg-yellow-300 mt-[70px] md:mt-0 md:ml-[60px] h-[90vh] md:h-full text-green-500 p-4 md:p-11 w-[90%] md:w-[40%] rounded-sm '>
//             <div>
//                 <h1 className='text-green-500 font-bold text-lg md:text-2xl my-3' >Create Invoice</h1>
//             </div>
//             <form className='h-[70vh] overflow-auto remove-scrollbar '>
//                 <h2 className='text-pink-400 font-bold text-sm my-4' >Bill From</h2>
//                 <div className='text-indigo-800 grid grid-col-1 md:grid-col-3 gap-3 w-full' >
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-gray-600' >Street Address</label>
//                         <input className='w-full p-3 font-bold text-sm bg-green-500 text-gray-700 border border-gray-950 rounded-md' type="text" name="street" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-gray-600' >City</label>
//                         <input className='w-full p-3 font-bold text-sm bg-green-500 text-gray-700 border border-gray-950 rounded-md' type="text" name="city" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-gray-600' >Post Code</label>
//                         <input className='w-full p-3 font-bold text-sm bg-green-500 text-gray-700 border border-gray-950 rounded-md' type="text" name="postCode" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-gray-600' >Country</label>
//                         <input className='w-full p-3 font-bold text-sm bg-green-500 text-gray-700 border border-gray-950 rounded-md' type="text" name="country" value />
//                     </div>
//                 </div>
//                 <h2 className='text-yellow-500 font-bold text-sm my-4' >Bill To</h2>
//                 <div className='mt-4' >
//                     <label className='block mb-2 text-md capitalize font-light text-gray-700' for="clientName" >Client's Name</label>
//                     <input className='w-full p-3 font-bold text-sm bg-gray-400 text-green-600 border border-yellow-500 rounded-md' type="text" name="clientName" value />
//                 </div>
//                 <div className='my-4' >
//                     <label className='block mb-2 text-sm capitalize font-light text-gray-700' for="clientEmail" >Client's Email</label>
//                     <input className='w-full p-3 font-bold text-sm bg-gray-300 text-gray-900 border border-green-700 rounded-md' name="clientEmail" placeholder="e.g.email@example.com" value />
//                 </div>
//                 <div className='text-black grid grid-col-1 md:grid-cols-3 gap-3 w-full' >
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-green-600' for="street">Street Address</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-red-900 border border-gray-600 rounded-md' type="text" name="street" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-green-600' for="street">City</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-red-900 border border-gray-600 rounded-md' type="text" name="city" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-green-600' for="street">Post Code</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-red-900 border border-gray-600 rounded-md' type="text" name="postCode" value />
//                     </div>
//                     <div className='md:first:col-span-3' >
//                         <label className='block mb-2 text-sm capitalize font-light text-green-600' for="street">Country</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-red-900 border border-gray-600 rounded-md' type="text" name="country" value />
//                     </div>
//                 </div>
//                 <div className='w-full flex justify-between mt-4' >
//                     <div className='w-[45%]'>
//                         <label className='block mb-2 text-sm capitalize font-light text-black' for="createdAt" >Invoice Date</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-black border border-blue-600 rounded-md' type="date" name="createdAt" value=" {todady's date} " />
//                     </div>
//                     <div className='w-[45%]'>
//                         <label className='block mb-2 text-sm capitalize font-light text-black' for="createdAt" >Payment Due Date</label>
//                         <input className='w-full p-3 font-bold text-sm bg-yellow-300 text-black border border-blue-600 rounded-md' type="date" name="paymentDue" value />
//                     </div>
//                 </div>
//                 <div className='w-full mt-5' >
//                     <label className='block mb-2 text-sm capitalize font-light text-black' for="description" >Description</label>
//                     <input className='w-full p-3 font-bold text-sm bg-gray-100 text-black border border-gray-700 rounded-md' type="text" name="description" placeholder='e.g. Graphic Design Service' value />
//                 </div>
//                 <div>
//                     <h3 className='text-sm text-green-500 font-bold my-9' >Item List</h3>
//                     <div className='' >
//                         <div className='grid md:grid-cols-8 grid-cols-6 mb-3 gap-3'>
//                             <div className='col-span-3' >
//                                 <label className='block mb-2 text-sm capitalize font-light text-black' for="itemName" >Item name</label>
//                                 <input className='w-full p-3 font-bold text-sm bg-gray-700 text-white border border-blue-600 rounded-md' type="text" name="itemName" value />
//                             </div>
//                             <div className=''>
//                                 <label className='block mb-2 text-sm capitalize font-light text-green-500' for="quantity" >Qty.</label>
//                                 <input className='w-full p-3 font-bold text-sm bg-gray-900 text-white border border-green-400 rounded-md' type="number" name="quantity" value />
//                             </div>
//                             <div className='col-span-2' >
//                                 <label className='block mb-2 text-sm capitalize font-light text-gray-800' for="price" >Price</label>
//                                 <input className='w-full p-3 font-bold text-sm bg-gray-700 text-yellow-300 border border-green-600 rounded-md' type="number" name="price" value />
//                             </div>
//                             <div className='h-full col-span-2 md:col-auto' >
//                                 <label className='block mb-2 text-sm capitalize font-light text-green-400'>Total</label>
//                                 <div className='w-full py-3 px-1 font-bold text-sm bg-white text-black shadow-md border border-green-700 rounded-md '></div>
//                             </div>
//                             <button type="button" className='mt-5' >
//                                 <RiDeleteBinFill />
//                             </button>
//                         </div>
//                     </div>
//                     <button type="button" className='text-black w-full text-center font-medium p-3 text-sm rounded bg-white' >+ Add New Item</button>
//                 </div>
//             </form>
//             <div className='flex justify-between w-full items-center absolute b-8 r-0 px-5 md:px-11' >
//                 <div>
//                     <button className='rounded text-sm font-semibold text-red-500 py-3 px-6 bg-gray-600' >Discard</button>
//                 </div>
//                 <div className='flex gap-3 items-center'>
//                     <button className='text-sm rounded-sm font-semibold text-blue-500 py-3 px-6 bg-green-500'>Save as Draft</button>
//                     <button className='text-sm rounded-sm font-semibold text-blue-500 py-3 px-6 bg-green-500'>Save & Send</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default formtext







import React from 'react'

const formtext = () => {
  return (
    <div className='Negelect this div.....Start from the next'>
        <div >
            <div>
                <h1>Create Invoice</h1>
            </div>
            <form className='h-[70vh] overflow-auto remove-scrollbar '>
                <h2 >Bill From</h2>
                <div className=' grid grid-col-1 md:grid-col-3 gap-3 w-full' >
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2 ' >Street Address</label>
                        <input className='w-full ' type="text" name="street" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block ' >City</label>
                        <input className='w-full ' type="text" name="city" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2 ' >Post Code</label>
                        <input className='w-full p-3 ' type="text" name="postCode" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2' >Country</label>
                        <input className='w-full p-3' type="text" name="country" value />
                    </div>
                </div>
                <h2  >Bill To</h2>
                <div className='mt-4' >
                    <label className='block mb-2' for="clientName" >Client's Name</label>
                    <input className='w-full p-3' type="text" name="clientName" value />
                </div>
                <div className='my-4' >
                    <label className='block mb-2' for="clientEmail" >Client's Email</label>
                    <input className='w-full p-3' name="clientEmail" placeholder="e.g.email@example.com" value />
                </div>
                <div className=' grid grid-col-1 md:grid-cols-3 gap-3 w-full' >
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2' for="street">Street Address</label>
                        <input className='w-full p-3' type="text" name="street" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2' for="street">City</label>
                        <input className='w-full p-3' type="text" name="city" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2' for="street">Post Code</label>
                        <input className='w-full p-3' type="text" name="postCode" value />
                    </div>
                    <div className='md:first:col-span-3' >
                        <label className='block mb-2' for="street">Country</label>
                        <input className='w-full p-3' type="text" name="country" value />
                    </div>
                </div>
                <div className='w-full flex justify-between mt-4' >
                    <div className='w-[45%]'>
                        <label className='block mb-2' for="createdAt" >Invoice Date</label>
                        <input className='w-full p-3' type="date" name="createdAt" value=" {todady's date} " />
                    </div>
                    <div className='w-[45%]'>
                        <label className='block mb-2' for="createdAt" >Payment Due Date</label>
                        <input className='w-full p-3' type="date" name="paymentDue" value />
                    </div>
                </div>
                <div className='w-full mt-5' >
                    <label className='block mb-2' for="description" >Description</label>
                    <input className='w-full p-3' type="text" name="description" placeholder='e.g. Graphic Design Service' value />
                </div>
                <div>
                    <h3  >Item List</h3>
                    <div className='' >
                        <div className='grid md:grid-cols-8 grid-cols-6 mb-3 gap-3'>
                            <div className='col-span-3' >
                                <label className='block' for="itemName" >Item name</label>
                                <input className='w-full' type="text" name="itemName" value />
                            </div>
                            <div className=''>
                                <label className='block' for="quantity" >Qty.</label>
                                <input className='w-full' type="number" name="quantity" value />
                            </div>
                            <div className='col-span-2' >
                                <label className='block' for="price" >Price</label>
                                <input className='w-full' type="number" name="price" value />
                            </div>
                            <div className='h-full col-span-2 md:col-auto' >
                                <label className='block'>Total</label>
                                <div className='w-full'></div>
                            </div>
                            <button type="button" className='mt-5' >
                                <RiDeleteBinFill />
                            </button>
                        </div>
                    </div>
                    <button type="button" className='' >+ Add New Item</button>
                </div>
            </form>
            <div className='flex justify-between w-full items-center' >
                <div>
                    <button className='rounded' >Discard</button>
                </div>
                <div className='flex gap-3 items-center'>
                    <button >Save as Draft</button>
                    <button>Save & Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default formtext