import { useFormContext } from "react-hook-form";
export default function FormError(){
 const {formState: {errors}} = useFormContext();
 const serverError = errors?.root?.serverError;
 if(!serverError) return null;

 return(
    <div className="font-manrope text-4xl">
        {serverError.message}
    </div>
 );
}