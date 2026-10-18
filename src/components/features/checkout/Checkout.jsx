import Sheet from "../../layout/Sheet";

export default function Checkout({onNavigate}){
    return(
        <Sheet title='Checkout'>
         <button className="font-manrope py-2 px-2 rounded-lg mt-2 bg-light-accent text-dark-text cursor-pointer" type='button' onClick={()=> onNavigate('event')}>Back to events</button>
        </Sheet>
    );
}