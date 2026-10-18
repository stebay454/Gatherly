import {useRef,useEffect} from 'react';
export default function BillingStep(){
    const focusRef = useRef();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef}>Billing Step.</h2>
        </div>
    );
}