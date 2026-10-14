import {useForm,Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import TextField from '../../form/TextField.jsx';
import SelectField from '../../form/SelectField.jsx';
import FileField from '../../form/FileField.jsx';
import Sheet from '../../layout/Sheet.jsx';
import ErrorSummary from '../../form/ErrorSummary.jsx';

/*defining schema in zod */
const registrationSchema = z.object({
    username:z
    .string()
    .min(3,"username atleast must be 3 characters")
    .max(30,"username must be 30 chracters or less"),

    email:z
    .string()
    .min(1,"Email is required")
    .email("Invalid email address"),
    
    password:z
    .string()
    .min(6,"password must be atleast 6 characters"),

    confirmPassword:z
    .string()
    .min(1,"please confirm your password"),

    country: z
    .string()
    .min(1,'Choose a country'),

    avatar:z.any().optional(),
})

.refine((data)=> data.password === data.confirmPassword, {
  message:"password do not match",
  path: ["confirmPassword"],
})
const countries = [
      {name: 'Ethiopia'},
      {name: 'Egypt'},
      {name: 'Kenya'},
      {name: 'Rwanda'},
      {name: 'Other'}
    ]
export default function SignupForm(){
    const {register,control, handleSubmit,setFocus, formState: {errors,submitCount}} = useForm({
      resolver: zodResolver(registrationSchema),
        defaultValues: {
         username: '',
         email: '',
         password: '',
         confirmPassword: '',
         country: '',
         avatar: undefined
        },
        shouldFocusError: false
    })
    function onValid(data){
      console.log(data);
    }
    return(
        <Sheet>
          <ErrorSummary errors={errors} submitCount={submitCount} onFocusField={setFocus}/>
          <form noValidate onSubmit={handleSubmit(onValid)}> 
            <TextField
             label="User Name:" 
             error={errors.username?.message}
             {...register("username")}
            />
            <TextField
            type="email"
          label="Email Address:" 
          error={errors.email?.message}
          {...register("email")}
            />
            <TextField 
            type='password'
             label="Password:"
             error={errors.password?.message}
             {...register("password")}
            />
            <TextField 
            type='password'
            label='Confirm Password:'
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            />
              <Controller 
            name='country'
            control={control}
            render={({field}) =>(
            <SelectField {...field} label='country' options={countries}  error={errors.country?.message} />
          )}
            />
            <Controller 
             name="avatar"
             control={control}
             render={({ field: { value, ...restField }, fieldState, formState }) => (
              <FileField {...restField} label='picture' error={errors.avatar?.message} />
             )}
            />
            <button className='font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent dark:bg-dark-accent text-dark-text' type='submit'>Submit</button>
          </form>
        </Sheet>
    );
}