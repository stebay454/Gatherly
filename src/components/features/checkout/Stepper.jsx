const stepArray =['Details','Billing','Review'];
export default function Stepper({step}){
    return(
        <div>
         <p>Step {step + 1} of 3</p>
            <ol>
             {stepArray.map((name,index) => (
                <li aria-current={index === step ?'step' : undefined} key={name}>{name}</li>
             ))}
            </ol>
        </div>
    );
} 