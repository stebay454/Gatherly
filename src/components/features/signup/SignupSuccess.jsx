import {useRef,useEffect} from 'react';
export default function SignupSuccess(){
    const nameRef = useRef();
    useEffect(()=>{
     nameRef.current.focus();
    },[])
  return(
    <div tabIndex={-1} ref={nameRef}>
     <p className='text-2xl font-manrope text-light-text dark:text-dark-text mt-6'>your accout is ready.</p>
    </div>
  ); 
};