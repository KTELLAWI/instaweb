import React, { Fragment ,useRef,useState} from 'react'
import {Transition,Dialog} from '@headlessui/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modelAtom';
import { CameraIcon } from '@heroicons/react/solid';
import {db,storage} from '../firebase';
import {addDoc,collection ,serverTimestamp,updateDoc,doc} from '@firebase/firestore'
import { useSession } from 'next-auth/react';
import {ref,getDownloadURL,uploadString} from '@firebase/storage'


function Modal() {
    const {data:session ,status} = useSession();
    const [open,setOpen]= useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const [selectedFile,setSelectedFile]= useState(null);
    const captionRef =useRef(null)
    const [loading,setLoading]= useState(false);

   const uploadPost = async ()=>{
       if (loading) return ;
       setLoading(true);
       const docRef = await addDoc(collection (db,'posts'),{
           username:session.user.username,
           caption:captionRef.current.value,
           profileImg:session.user.image,
           timestamp:serverTimestamp(),


       });

       console.log(docRef.id)

       const imgeRef = ref(storage,`posts/${docRef.id}/image`)
       await uploadString(imgeRef,selectedFile,"data_url").then(async snapshot =>{
           const downloadURL = await getDownloadURL(imgeRef)
           await updateDoc(doc(db,'posts',docRef.id),{
               image:downloadURL
           })
       });
       setOpen(false)
       setLoading(false)
       setSelectedFile(null)

   }
  const addImageToPost =(e)=>{
      const reader =new FileReader()
      if (e.target.files[0]){
          reader.readAsDataURL(e.target.files[0]);
      }

      reader.onload =(readerEvent)=>{
        setSelectedFile(readerEvent.target.result)
      }


  }


    return (
    <Transition.Root show ={open} as={Fragment}>
        <Dialog
            as='div'
            className='fixed z-10  bg-black inset-1 overflow-y-hidden'
            onClose={setOpen}
            >
        <div className='flex items-end  bg-white transition-opacity justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            
            <Transition.Child
            as={Fragment}
            //show={isShowing}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-100 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-1000 scale-95 "
            >
            <Dialog.Overlay
            className='block inset-0  bg-gray-500 bg-opacity-75 transition-opacity'
            />


            </Transition.Child>
            <span
            arial-hidden='true'
            className='hidden sm:inline-block sm:align-middle sm:h-screen '
            > &#8203</span>

            <Transition.Child
            as={Fragment}
            //show={isShowing}
                enter="transform transition duration-[400ms]"
                enterFrom="opacity-100 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-200 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-100 scale-95 "
            >
            
            <div 
                className='inline-block align-bottom bg-blue-300 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 '
                >
                <div> 
                {selectedFile ?(
                    <img 
                    className=' cursor-pointer w-full object-contain'
                    src={selectedFile} onClick={()=>setSelectedFile(null)} alt="" /> 
                    
                    ) :(
                        
                        <div
                   onClick={()=>filePickerRef.current.click()}
                   className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                       <CameraIcon
                           className='h-6 w-6 text-red-600'
                           arial-hidden="true"
                       />
                   </div>)}
                   
                    <div>
                     <div className='mt-3 text-center sm:mt-5'>
                       <Dialog.Title
                       as='h3'
                       className='text-lg leading-6 font-medium text-gray-900'
                       >
                        Upload A Photo   

                       </Dialog.Title>
                       <div>
                           <input type="file"
                           ref={filePickerRef}
                           hidden
                           onChange={addImageToPost}
                            />
                       </div>
                       <div>
                           <input type="text"
                           className='border-none focus:rong-0 w-full text-center'
                           ref={captionRef}
                           placeholder='Please Insert Your caption '
                            />
                       </div>

                     </div>

                    </div>
                    <div className='mt-5 sm:mt-6'>
                        <button
                        type='button'
                        disabled={!selectedFile}
                       onClick={uploadPost}
                        className='inline-flex justify-center w-full  rounded-md border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300'
                        >
                           {loading ? "uploading..." : 'Uplade Post'}
                        </button>
                    </div>
                </div>
                </div>

            </Transition.Child>



        </div>


            </Dialog>
        </Transition.Root>
    )
}

export default Modal
