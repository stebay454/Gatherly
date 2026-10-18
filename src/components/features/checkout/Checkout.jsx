import {useState} from 'react';
import {useForm,FormProvider} from 'react-hook-form';
import Sheet from "../../layout/Sheet";
import Stepper from './Stepper.jsx';
import DetailsStep from './DetailsStep.jsx';
import ReviewStep from './ReviewStep.jsx';
import BillingStep from './BillingStep.jsx';
export default function Checkout({onNavigate}){
    const [step,setStep] = useState(0);
    const formMethods = useForm({
        mode: 'onTouched',

    })
    return(
        <Sheet title='Checkout'>
            <FormProvider {...formMethods}>
                <Stepper step={step}/>
                <form noValidate>
                 {step === 0 && <DetailsStep />}
                 {step === 1 && <BillingStep />}
                 {step === 2 && <ReviewStep />}
                 <div className='flex flex-col'>
                    {step > 0 && <button type='button' onClick={()=> setStep((prev)=> prev - 1)} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text bg-light-sheet dark:bg-dark-sheet border-2 border-light-label dark:border-dark-label cursor-pointer'>Back</button>}
                    {step < 2 && <button type='button' onClick={()=> setStep((prev)=> prev + 1)} className='font-manrope py-2 px-4 mt-2 text-light-text dark:text-dark-text  bg-light-sheet dark:bg-dark-sheet  border-2 border-light-label dark:border-dark-label cursor-pointer'>Next</button>}
                    <button type='button' className="font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer" onClick={()=> onNavigate('event')}>Leave checkout</button>
                 </div>
                </form>
          </FormProvider>
        </Sheet>
    );
}