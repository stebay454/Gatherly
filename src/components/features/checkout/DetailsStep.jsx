import {useRef,useEffect} from 'react';
export default function DetailsStep(){
    const focusRef = useRef();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef}>Details Step.</h2>
        </div>
    );
}