/* Simulates a network request to check if an email is already reistered , resolve after 800ms*/
export default async function checkEmailTaken(email){
const takenEmails = ["yishak@gmail.com","tamirat@gmail.com","gebre@gmail.com"];
 await new Promise((resolve) => setTimeout(resolve,800));
 if(!email) return false;
 return takenEmails.includes(email.toLowerCase().trim()); 
}