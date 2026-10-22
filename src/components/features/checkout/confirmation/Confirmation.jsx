import Sheet from '../../../layout/Sheet.jsx'
export default function Confirmation(){
    return(
        <div>
            <Sheet title="Order Confirmed!">
                <div className="font-manrope text-center py-8 text-light-text dark:text-dark-text">
                    <div className="text-5xl mb-4 text-green-500">✓</div>
                    <h2 className="text-2xl font-manrope mb-2">Thank you for your order!</h2>
                    <p className="font-manrope text-light-label dark:text-dark-label text-sm mb-6">Your registration seats have been processed cleanly.</p>
                    <button 
                        type="button" 
                        className="py-2 px-4 rounded bg-light-accent text-dark-text cursor-pointer"
                        onClick={() => onNavigate('event')}
                    >
                        Return to Events
                    </button>
                </div>
            </Sheet>
        </div>
    );
}