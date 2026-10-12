import Field from './Field.jsx';
export default function TextField({label,hint,error,type='text',...rest}){
    return (
         <Field 
          label={label}
          hint={hint}
          error={error}
         >
          {({ id, invalid, describedBy }) => (
                <input
                {...rest}
                id={id}
                type={type}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className='border-2 border-light-label dark:border-dark-label text-light-text dark:text-dark-text py-2 px-2 rounded-lg mt-2 ml-2'
                />
            )}
         </Field>
    );
}