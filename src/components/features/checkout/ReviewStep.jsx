import {useRef,useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
export default function ReviewStep(){
    const { getValues } = useFormContext();
    const formData = getValues();
    const focusRef = useRef();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef} className='font-manrope text-2xl text-light-text dark:text-dark-text'>Review Step.</h2>
            <div>
                <p className='font-manrope'><i>Ticket Quantity:</i> {formData.quantity}</p>
                <p className='font-manrope'><i>Attendee names:</i></p>
                {formData.attendees.map((attendee,index)=> {
                    <p key={index} className='font-manrope'>
                        -Attendee {index + 1}:{attendee?.[index]?.name}
                    </p>
                })}
            </div>

            <div>
                <p className='font-manrope'><i>Address:</i>{formData.address}</p>
                <p className='font-manrope'><i>City:</i>{formData.city}</p>
                <p className='font-manrope'><i>Card number:</i>{formData.cardNumber}</p>
                <p className='font-manrope'><i>Expiry Date:</i>{formData.expiry}</p>
                <p className='font-manrope'><i>CVC: </i>{formData.cvc}</p>
                <p className='font-manrope'><i>Promo: </i>{formData.promo}</p>
            </div>
        </div>
    );
}