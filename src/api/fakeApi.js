export default async function checkEmailTaken(email){
    const takenEmails = ['yishak@gmail.com','tamirat@gmail.com','gebre@gmail.com'];
    if(!email) return false;
    await new Promise((resolve)=> (setTimeout(resolve,800)));
    const isTaken = takenEmails.includes(email.toLowerCase().trim());
    return isTaken;
}
export async function submitSignup(data){
  await new Promise((resolve)=> setTimeout(resolve,1000));
  if(data?.username?.toLowerCase().trim()==='admin'){
   const error = new Error('This username is already taken');
   error.status = 409;
   throw error;
  }
  else if(data?.username?.toLowerCase().trim()==='boom'){
    const error = new Error('Something went wrong, try again');
    error.status = 500;
    throw error;
  }
}
export async function checkPromo(promo){
  const takenPromo = ['promos','codes','peace'];
  if(!promo) return false;
  await new Promise((resolve)=> (setTimeout(resolve,800)));
  const isTaken = takenPromo.includes(promo.toLowerCase().trim());
  return isTaken;
}

export async function submitOrder(data){
 await new Promise((resolve) => setTimeout(resolve,1200));

 if(data?.promo?.toLowerCase().trim() === 'reject'){
  const error = new Error("This order cannot be processed because this promotional code has expired.")
  error.status = 409;
  throw error;
 }
}