import {useState,useEffect} from 'react';
import {FiMaximize2,FiMinimize2} from 'react-icons/fi'
export default function Sheet(){
    const [isExpanded,setIsExpanded] = useState(false);
      function handleExpandToggle(){
        setIsExpanded((prev)=>!prev);
    }
    return(
        <div className={`py-4 px-4 bg-light-sheet dark:bg-dark-sheet  rounded-xl border-2 border-light-border dark:border-dark-border transition-all duration-500 flex justify-between
        ${isExpanded ?'w-full max-w-full h-auto':'w-full max-w-[70%] h-auto'}`}>
            <h2 className="font-instrument text-light-text dark:text-dark-text">Available now.</h2>
            <button className='cursor-pointer' onClick={handleExpandToggle}>
             {isExpanded ?
             (<FiMinimize2 className='text-light-text dark:text-dark-text'/>) :
             <FiMaximize2 className='text-light-text dark:text-dark-text' />}
            </button>
        </div>
    );
}