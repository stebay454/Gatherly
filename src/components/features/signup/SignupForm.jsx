import {useState} from 'react';
import {useForm,Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import TextField from '../../form/TextField.jsx';
import SelectField from '../../form/SelectField.jsx';
import FileField from '../../form/FileField.jsx';
import SignupSuccess from './SignupSuccess.jsx';
import FormError from '../../form/FormError.jsx';
import Sheet from '../../layout/Sheet.jsx';
import ErrorSummary from '../../form/ErrorSummary.jsx';
import checkEmailTaken from '../../../api/fakeApi.js';
import {submitSignup} from '../../../api/fakeApi.js';
const countries = [
      {name: 'Ethiopia'},
      {name: 'Egypt'},
      {name: 'Kenya'},
      {name: 'Rwanda'},
      {name: 'Other'}
    ]

const allowedFileType = ["image/jpeg","image/jpg","image/png", "image/webp"];
const maxFileSize = 2 * 1024 * 1024;

/*defining schema in zod */
const registrationSchema = z.object({
    username:z
    .string()
    .min(3,"Username at least must be 3 characters")
    .max(30,"Username must be 30 characters or less"),

    email:z
    .string()
    .min(1,"Email is required")
    .email("Invalid email address")
    .refine(async (email)=> {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) return true;
       const isTaken = await checkEmailTaken(email);
      return !isTaken;
    },{
      message:"That email is already registered."
    }),

    password:z
    .string()
    .min(6,"Password must be at least 6 characters"),

    confirmPassword:z
    .string()
    .min(1,"Please confirm your password"),

    country: z
    .string()
    .min(1,'Choose a country'),

    avatar:z
    .instanceof(Blob,{
      message: 'Profile picture is required',
    })

    .refine((file)=> allowedFileType.includes(file?.type),{
      message: "Only .jpg .jpeg .png and .webp formats are supported",
    })

    .refine((file)=> file?.size <= maxFileSize, {
      message: "Max file size is 2MB",
    })
    
})

.refine((data)=> data.password === data.confirmPassword, {
  message:"Passwords do not match",
  path: ["confirmPassword"],
})
export default function SignupForm({onNavigate}){
  const [createdUsername,setCreatedUsername] = useState(null);
    const {register,control, handleSubmit,setError,setFocus, formState: {errors,submitCount,isSubmitting}} = useForm({
      resolver: zodResolver(registrationSchema),
      mode: 'onTouched',
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
     const onValid = async (data) => {
    try {
      await submitSignup(data);
      setCreatedUsername(data.username);
    } catch (error) {
      if (error.status === 409) {
        // Map 409 conflict exceptions onto the username input field path
        setError("username", {
          type: "server",
          message: error.message
        });
     
      } else {
        setError("root.server",{
          type:"server",
          message: 'Something went wrong, try again'
        })
        console.error("General submission failure caught:", error);
      }
    }
  };
    return(
        <Sheet title={createdUsername == null ?'Sign up.':`Welcome ${createdUsername}`}>
          {createdUsername !== null ? <SignupSuccess onContinue={onNavigate} /> 
          :
          <>
          <ErrorSummary errors={errors} submitCount={submitCount} onFocusField={setFocus}/>
          <form noValidate onSubmit={handleSubmit(onValid)}> 
            <TextField
             label="User Name:" 
             error={errors.username?.message}
             autoComplete='username'
             {...register("username")}
            />
            <TextField
            type="email"
          label="Email Address:" 
          error={errors.email?.message}
          autoComplete='email'
          {...register("email")}
            />
            <TextField 
            type='password'
             label="Password:"
             error={errors.password?.message}
             autoComplete='new-password'
             {...register("password")}
            />
            <TextField 
            type='password'
            label='Confirm Password:'
            error={errors.confirmPassword?.message}
            autoComplete='new-password'
            {...register("confirmPassword")}
            />
              <Controller 
            name='country'
            control={control}
            render={({field}) =>(
            <SelectField {...field} label='Country : ' options={countries}  error={errors.country?.message} />
          )}
            />
            <Controller 
             name="avatar"
             control={control}
             render={({ field: { value, ...restField }}) => (
              <FileField {...restField} file={value} label='Profile picture: ' error={errors.avatar?.message} />
             )}
            />
            <FormError message={errors.root?.server?.message}/>
            <button disabled={isSubmitting} className='font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer disabled:cursor-not-allowed' type='submit'>{isSubmitting ?'Creating account...': 'Register'}</button>
          </form>
          </>
}
        </Sheet>
    );
}