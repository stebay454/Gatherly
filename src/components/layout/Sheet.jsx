import {useState,useRef,useEffect} from 'react';
import {FiMaximize2,FiMinimize2} from 'react-icons/fi';

export default function Sheet({title,children}){
    const headingRef = useRef();
        useEffect(()=>{
         headingRef.current.focus();
        },[]);
    const [isExpanded,setIsExpanded] = useState(false);
    return(
        <div className={`py-4 px-4 bg-light-sheet dark:bg-dark-sheet  rounded-xl border-2 border-light-border dark:border-dark-border transition-all duration-500 
        ${isExpanded ?'w-full max-w-full h-auto':'w-full max-w-[80%] h-auto'}`}>
            <div className='flex justify-between'>
            <h1 className="text-3xl font-instrument text-light-text dark:text-dark-text mb-2" tabIndex={-1} ref={headingRef}>{title}</h1>
            <button type="button" className='cursor-pointer' onClick={() => setIsExpanded((prev) => !prev)} aria-label={isExpanded ? 'Shrink sheet' : 'Expand sheet'}>
             {isExpanded ?
             (<FiMinimize2 className='text-light-text dark:text-dark-text'/>) :
             <FiMaximize2 className='text-light-text dark:text-dark-text' />}
            </button>
            </div>
            {children}
        </div> 
    );
}