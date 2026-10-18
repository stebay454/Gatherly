import {useState} from 'react';
import Header from "./components/layout/Header.jsx";
import useTheme from "./hooks/useTheme.js";
import SignupForm from './components/features/signup/SignupForm.jsx';
import Checkout from './components/features/checkout/Checkout.jsx';
import EventPage from './components/features/home/EventPage.jsx';
export default function App(){
    const [view,setView] = useState('event');
    const {isDark,toggleTheme} = useTheme();
    function onGetTickets(pageName){
        setView(pageName);
    }
    return (
        <div className="w-full min-h-screen py-4 px-4 bg-light-background dark:bg-dark-background transition-colors duration-500 flex flex-col items-center">
        <Header isDark={isDark} toggleTheme={toggleTheme} onNavigate={onGetTickets}/>
        <main className='w-full flex justify-center py-4 px-4'>
        {view === 'event' ? <EventPage onNavigate={onGetTickets}/> :(view ==='signup' ? <SignupForm onNavigate={onGetTickets}/> : <Checkout onNavigate={onGetTickets}/>)}
         </main>
        </div>
    );
}