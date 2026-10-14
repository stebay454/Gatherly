import {useState,useEffect} from 'react';
import Field from "./Field.jsx";
export default function FileField({label,hint,onChange,file,error,...rest}){
  const [previewUrl,setPreviewUrl] = useState('');
  useEffect(()=>{
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    }
  },[file]);

  const handleChange = (event) => {
    const chosenFile = event.target.files[0];
    if (onChange) {
      onChange(chosenFile);
    }
  };
    return(
      <div>
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
      {previewUrl && (
        <img 
         src={previewUrl}
         alt='Avatar preview'
         className='w-14 h-14 rounded-full border-2 border-light-border dark:border-dark-border object-cover mt-2'
        />
       )}
      </div> 
    );
}