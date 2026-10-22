import {useState} from 'react';
import {useForm,FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Sheet from "../../layout/Sheet";
import Stepper from './Stepper.jsx';
import DetailsStep from './DetailsStep.jsx';
import ReviewStep from './ReviewStep.jsx';
import BillingStep from './BillingStep.jsx';
import ErrorSummary from '../../form/ErrorSummary.jsx';
import FormError from './FormError.jsx';
import { submitOrder } from '../../../api/fakeApi.js';
import Confirmation from './confirmation/Confirmation.jsx';
import {orderSchema} from '../../../schemas/checkout.js';
const stepFields =[
    ['quantity','attendees'],
    ['address','city','cardNumber','expiry','cvc','promo'],
    [],
]
export default function Checkout({onNavigate}){
    const [step,setStep] = useState(0);
    const [attempts,setAttempts] =useState(0);
    const [isConfirmed,setIsConfirmed] = useState(false);
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
    const {trigger,handleSubmit,setError,formState: {errors, isSubmitting}} = formMethods;

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
    async function onFinalSubmit(data){
       try{
        await submitOrder(data);
        setIsConfirmed(true);
       } catch (error){
        if(error.status === 409){
        setError("root.serverError", {
            type: "server",
            message: error.message
        });

        } else{
            console.error("General error",error);
        }
       }
    };
    return(
        <>
        {isConfirmed ? 
         (<Confirmation /> )
         :(
         <Sheet title='Checkout'>
            <FormProvider {...formMethods}>
                <Stepper step={step}/>
                <ErrorSummary errors={errors} submitCount={attempts} onFocusField={formMethods.setFocus} />
                <FormError />
                <form noValidate onSubmit={handleSubmit(onFinalSubmit)}>
                 {step === 0 && <DetailsStep />}
                 {step === 1 && <BillingStep />}
                 {step === 2 && <ReviewStep />}
                 <div className='w-1/2 mx-auto mt-4 flex flex-col'>
                    {step > 0 && <button type='button' onClick={handleBack} disabled={isSubmitting} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text bg-light-sheet dark:bg-dark-sheet border-2 border-light-label dark:border-dark-label cursor-pointer'>Back</button>}
                    {step < 2 && <button type='button' onClick={handleNext} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text  bg-light-sheet dark:bg-dark-sheet  border-2 border-light-label dark:border-dark-label cursor-pointer'>Next</button>}
                    {step === 2 && (
                        <button type='submit' disabled={isSubmitting} className="font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer"> {isSubmitting ? "Processing Transaction..." : "Complete Purchase & Checkout"}</button>
                    )}
                    <button type='button' className="font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer" onClick={()=> onNavigate('event')}>Leave checkout</button>
                 </div>
                </form>
          </FormProvider>
        </Sheet>
        )}
      </>
    );
}