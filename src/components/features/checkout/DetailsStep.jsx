import {useRef,useEffect} from 'react';
import {useFormContext,useFieldArray} from 'react-hook-form';
import TextField from '../../form/TextField.jsx';
export default function DetailsStep(){
    const {register,control,getValues, formState: {errors}} = useFormContext();
    const {fields,replace} = useFieldArray({
        control,
        name: 'attendees',
    })
    const focusRef = useRef();
    useEffect(()=> {
     focusRef.current.focus();
    },[]);
    function handleQuantityChange(e){
      const numberedValue = Number(e.target.value); 
      if(!Number.isInteger(numberedValue) || numberedValue < 1 || numberedValue >6) return;
      const currentAttendees = getValues('attendees');
      const newAttendees = Array.from({length: numberedValue}, (_,i)=> ({name: currentAttendees[i]?.name || ''})) 
      replace(newAttendees);
    }
    return(
        <div>
            <h2 tabIndex={-1} ref={focusRef}>Details Step.</h2>
            <TextField 
            label='Number of tickets'
            error={errors.quantity?.message}
            hint='Choose 1 to 6'
            inputMode='numeric'
            {...register('quantity',{onChange: handleQuantityChange})}
            />
            <fieldset>
                <legend>Attendee names</legend>
                {fields.map((field,index) =>(
                    <TextField 
                    key={field.id} 
                    label={`Attendee ${index + 1} name`} 
                    error={errors.attendees?.[index]?.name?.message} 
                    {...register(`attendees.${index}.name`)}
                    />
                ))}
            </fieldset>
        </div>
    );
}