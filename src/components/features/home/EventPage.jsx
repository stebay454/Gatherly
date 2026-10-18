import {event} from "../../../data/events.js";
import Sheet from "../../layout/Sheet.jsx";
export default function EventPage({onNavigate}){
    const {title,date,place,price,shortDescription} = event;
    return(
        <Sheet title='Available now.'>
        <div className='mt-6 font-manrope text-light-text dark:text-dark-text'>
            <p className="text-light-label dark:text-dark-label">{date}</p>
          <h2 className='text-xl lg:text-2xl'>{title}</h2>
          <p className="text-light-label dark:text-dark-label">{shortDescription}</p>
          <p className="text-light-label dark:text-dark-label">Address: {place}</p>
          <p className="text-lg">Price: {price}</p>
          <button className='font-manrope py-2 px-2 rounded-lg mt-6 bg-light-accent text-dark-text cursor-pointer' onClick={() => onNavigate('signup')}>Get Tickets</button>
        </div>
        </Sheet>
    );
}