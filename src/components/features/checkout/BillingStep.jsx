import {useRef,useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import TextField from '../../form/TextField.jsx';
export default function BillingStep(){
    const focusRef = useRef();
    const {register, formState: {errors}} = useFormContext();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef} className='font-manrope text-2xl mb-2 text-light-text dark:text-dark-text'>Billing Step.</h2>
            <TextField 
            label="Address"
            error={errors.address?.message}
            {...register('address')}
            />
            <TextField 
            label="City"
            error={errors.city?.message}
            {...register('city')}
            />
            <TextField 
            label='Card number'
            error={errors.cardNumber?.message}
            hint='16 digits, space allowed'
            {...register('cardNumber')}
            inputMode = 'numeric'
            />
            <TextField 
            label='Expiry date'
            error={errors.expiry?.message}
            hint='MM/YY'
            {...register('expiry')}
            />
            <TextField 
            label='CVC'
            error={errors.cvc?.message}
            {...register('cvc')}
            />
            <TextField 
            label='promo'
            error={errors.promo?.message}
            {...register('promo')}
            />
        </div>
    );
}