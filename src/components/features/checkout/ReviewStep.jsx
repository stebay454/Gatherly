import {useRef,useEffect} from 'react';
export default function ReviewStep(){
    const focusRef = useRef();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef}>Review Step.</h2>
        </div>
    );
}