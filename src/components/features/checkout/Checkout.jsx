import {useState} from 'react';
import {useForm,FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Sheet from "../../layout/Sheet";
import Stepper from './Stepper.jsx';
import DetailsStep from './DetailsStep.jsx';
import ReviewStep from './ReviewStep.jsx';
import BillingStep from './BillingStep.jsx';
import ErrorSummary from '../../form/ErrorSummary.jsx';
import {orderSchema} from '../../../schemas/checkout.js';
const stepFields =[
    ['quantity','attendees'],
    ['address','city','cardNumber','expiry','cvc','promo'],
    [],
]
export default function Checkout({onNavigate}){
    const [step,setStep] = useState(0);
    const [attempts,setAttempts] =useState(0);
    const formMethods = useForm({
        resolver: zodResolver(orderSchema),
        mode:'onTouched',
        defaultValues: {
            quantity: 1,
            attendees:[{
                name: ''
            }],
            address: '',
            city: '',
            cardNumber: '',
            expiry : '',
            cvc: '',
            promo: ''
        }
    })
    const {trigger,formState: {errors}} = formMethods;
    async function handleNext(){
        const fieldToValidate = stepFields[step];
        const isValid = await trigger(fieldToValidate);
        if(!isValid){
        setAttempts((prev)=> prev + 1);
        return;
        } 
        setAttempts(0);
        setStep((prev)=> prev + 1);
    } 
    async function handleBack(){
        setAttempts(0);
        setStep((prev)=> prev - 1);
    }
    return(
        <Sheet title='Checkout'>
            <FormProvider {...formMethods}>
                <Stepper step={step}/>
                <ErrorSummary errors={errors} submitCount={attempts} onFocusField={formMethods.setFocus} />
                <form noValidate>
                 {step === 0 && <DetailsStep />}
                 {step === 1 && <BillingStep />}
                 {step === 2 && <ReviewStep />}
                 <div className='flex flex-col'>
                    {step > 0 && <button type='button' onClick={handleBack} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text bg-light-sheet dark:bg-dark-sheet border-2 border-light-label dark:border-dark-label cursor-pointer'>Back</button>}
                    {step < 2 && <button type='button' onClick={handleNext} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text  bg-light-sheet dark:bg-dark-sheet  border-2 border-light-label dark:border-dark-label cursor-pointer'>Next</button>}
                    <button type='button' className="font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer" onClick={()=> onNavigate('event')}>Leave checkout</button>
                 </div>
                </form>
          </FormProvider>
        </Sheet>
    );
}