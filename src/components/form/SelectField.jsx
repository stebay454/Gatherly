import Field from "./Field.jsx";
export default function SelectField({label,hint,options,error,...rest}){
    
    return(
        <Field 
         label={label}
         hint={hint}
         error={error}
        >
        {({ id, invalid, describedBy }) => (
            <select id={id} aria-invalid={invalid} aria-describedby={describedBy} {...rest}>
             <option value=''>Choose a country</option>
            {options.map((country) => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
            </select>
        )}
        </Field>
    );
}