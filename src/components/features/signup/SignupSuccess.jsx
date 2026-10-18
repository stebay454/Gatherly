import {useRef,useEffect} from 'react';
export default function SignupSuccess({onContinue}){
    const nameRef = useRef();
    useEffect(()=>{
     nameRef.current.focus();
    },[]);
  return(
    <div tabIndex={-1} ref={nameRef}>
     <p className='text-2xl font-manrope text-light-text dark:text-dark-text mt-6'>Your account is ready.</p>
     <button type="button" className='font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent  text-dark-text cursor-pointer' onClick={()=> onContinue('checkout')}>Continue to tickets</button>
    </div>
  ); 
};