/*const stepArray =['Details','Billing','Review'];*/
export default function Stepper({step}){
    return(
        <div>
         <p className="font-manrope text-xl text-light-label dark:text-dark-label">Step {step + 1} of 3</p>
         {/*
            <ol>
             {stepArray.map((name,index) => (
                <li aria-current={index === step ?'step' : undefined} key={name} className="font-manrope text-lg text-light-text dark:text-dark-text">{name}</li>
             ))}
            </ol>
            */}
        </div>
    );
} 