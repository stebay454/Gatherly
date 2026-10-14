import Field from "./Field.jsx";
export default function FileField({label,hint,onChange,error,...rest}){
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (onChange && file) {
      onChange(file);
    }
  };
    return(
      <Field
       label={label}
        hint={hint}
        error={error}
      >
       {({id, invalid, describedBy}) => (
          <input 
           {...rest}
           id={id}
           type='file'
           onChange={handleChange}
           aria-invalid={invalid}
           aria-describedby={describedBy}
           accept="image/*"
          />
       )}
      </Field> 
    );
}