import {useRef,useEffect} from 'react';
export default function SignupSuccess({username}){
    const nameRef = useRef();
    useEffect(()=>{
     nameRef.current.focus();
    },[])
  return(
    <div tabIndex={-1} ref={nameRef}>
     <h2 className='text-4xl font-instrument text-light-text dark:text-dark-text'>Welcome {username} :)</h2>
     <p className='text-2xl font-manrope text-light-text dark:text-dark-text mt-6'>YOUR ACCOUNT IS READY.</p>
    </div>
  ); 
};