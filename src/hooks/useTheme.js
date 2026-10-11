import {useState,useEffect} from 'react';
export default function useTheme(){
   const [isDark,setIsDark] = useState(() =>{
    return localStorage.getItem('theme') === 'dark';
   });

   useEffect(()=> {
    const root = document.documentElement;
    if(isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else{
      root.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
   },[isDark]);

   function toggleTheme(){
    setIsDark((prev) => !prev);
   }
    return {isDark,toggleTheme};
}