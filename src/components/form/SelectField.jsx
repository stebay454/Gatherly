import Field from "./Field.jsx";
export default function SelectField({label,hint,options,error,...rest}){
    return(
        <Field 
         label={label}
         hint={hint}
         error={error}
        >
        {({ id, invalid, describedBy }) => (
            <select {...rest} id={id} aria-invalid={invalid} aria-describedby={describedBy}  className=" rounded border-2 border-light-label dark:border-dark-label bg-light-sheet dark:bg-dark-sheet">
             <option value=''>Choose a country</option>
            {options.map((country) => (
              <option key={country.name} value={country.name} className='text-light-text dark:text-dark-text'>{country.name}</option>
            ))}
            </select>
        )}
        </Field>
    );
}