import {useRef,useEffect} from 'react';

export default function ErrorSummary({errors,submitCount,onFocusField}){
  const containerRef = useRef(null);
  const errorList = Object.entries(errors || {})
  .filter(([_,error]) => Boolean(error))
  .map(([name,error]) => ({
    name,
    message: typeof error === 'string' ? error : error.message,
  }))
  useEffect(()=> {
    if(submitCount > 0 && errorList.length > 0 && containerRef.current){
      containerRef.current.focus();
    }
  },[submitCount]);

  if(submitCount === 0 || errorList.length === 0){
    return null;
  }
  return(
     <div ref={containerRef} tabIndex={-1}>
       <h2 className='font-manrope text-light-error dark:text-dark-error'>Please fix {errorList.length} {errorList.length===1 ? 'problem' : 'problems'}</h2>
       <ul className='font-manrope text-light-error dark:text-dark-error'>
        {errorList.map(({name, message}) => (
          <li key={name}>
           <button type='button' onClick={()=>onFocusField(name)}> - {message}</button>
          </li>
        ))}
       </ul>
     </div>
  );
}