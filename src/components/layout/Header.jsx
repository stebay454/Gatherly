import {FiSun, FiMoon} from 'react-icons/fi';
export default function Header({isDark,toggleTheme}){
    return (
        <div className='w-full flex justify-center mb-4 transition-colors duration-500 '>
            <div className='flex flex-col'>
             <h1 className='font-instrument text-light-text dark:text-dark-text text-4xl'>Gatherly</h1>
             <h2 className="font-instrument text-light-text dark:text-dark-text mx-auto">Event tickets.</h2>
            </div>
            <div className="font-manrope bg-light-sheet dark:bg-dark-sheet py-4 px-4 rounded-4xl ml-auto border-2 border-light-border dark:border-dark-border flex  gap-3">
              <p className='text-light-text dark:text-dark-text'>help(?)</p>
              <button className='cursor-pointer my-auto' onClick={toggleTheme} aria-label='Toggle page theme'>
                {isDark ?(<FiSun className='text-dark-text'/>) :(<FiMoon className='dark:text-dark-text' />)}
                </button>
            </div>
        </div>
    );
}