import {z} from 'zod';
 const attendeesSchema = z.object({
    name:z.string().trim()
    .min(2,"Attendee name must be at least 2 characters.")
    .max(60,"Attendee name must be 60 characters or less")
 });
 export const detailsSchema = z.object({
    quantity: z.preprocess((val) => {
     if (val === "" || val === undefined || val === null) return undefined;
      const num = Number(val);
      return Number.isNaN(num) ? "NOT_A_NUMBER" : num;
    },
    z.number({error: "Enter a number of tickets from 1 to 6"})
    .int("Quantity must be whole number")
    .min(1,"Minimum quantity is one")
    .max(6,"Choose one to six tickets.")
    ),
    attendees:z.
    array(attendeesSchema)
    .min(1,"Minimum attendee is one.")
    .max(6,"Maximum attendee is six.")
});
  
 export const billingSchema = z.object({
    address: z
    .string()
    .min(5,"Address must be at least 5 characters"),
    
    city:z
    .string()
    .min(2,"City must be at least 2 characters"),
    
    cardNumber:z
    .string()
    .trim()
    .regex(
      /^\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}$/,
      { message: "Enter a 16 digit card number." }
    ),

    expiry: z.
    string()
    .regex(
    /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    {message: "Must be in MM/YY format"}
    ),

    cvc: z
    .string()
    .regex(/^\d{3,4}$/,
    {message: "CVC must be 3 or 4 digits"}   
   ),

    promo:z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
 });

 export const orderSchema = detailsSchema.extend(billingSchema.shape);
