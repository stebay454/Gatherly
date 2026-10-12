import {useId} from 'react';
export default function Field({label,hint,error,children}){
    const baseId =useId();
    const inputId = `${baseId}-input`;
    const hintId = `${baseId}-hint`;
    const errorId = `${baseId}-error`;

    const isInvalid = Boolean(error);

    const describedByIds = [];
    if (hint) describedByIds.push(hintId);
    if(error) describedByIds.push(errorId);
    const ariaDescribedBy = describedByIds.length > 0 ?describedByIds.join(' ') : undefined;
    return(
        <div className='font-manrope text-light-text dark:text-dark-text'>
            <label htmlFor={inputId}>
              {label}
            </label>

            {children ({
                id: inputId,
                invalid: isInvalid,
                describedBy: ariaDescribedBy
            })}
            
            {hint && <span id={hintId}>{hint}</span>}
            {error && <span id={errorId} className='text-light-error dark:text-dark-error m-5'>{error}</span>}
        </div>
    );
}