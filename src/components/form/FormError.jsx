export default function FormError({message}){
    if(!message) return null;
    return(
        <div role="alert">
        <p className="text-light-error dark:text-dark-error">{message}</p>
        </div>
    );
}