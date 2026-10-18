import {useState} from 'react';
import {FiMaximize2,FiMinimize2} from 'react-icons/fi';

export default function Sheet({title,children}){
    const [isExpanded,setIsExpanded] = useState(false);
    return(
        <div className={`py-4 px-4 bg-light-sheet dark:bg-dark-sheet  rounded-xl border-2 border-light-border dark:border-dark-border transition-all duration-500 
        ${isExpanded ?'w-full max-w-full h-auto':'w-full max-w-[70%] h-auto'}`}>
            <div className='flex justify-between'>
            <h2 className="text-3xl font-instrument text-light-text dark:text-dark-text mb-4">{title}</h2>
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