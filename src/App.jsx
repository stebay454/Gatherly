import Header from "./components/layout/Header.jsx";
import useTheme from "./hooks/useTheme.js";
import SignupForm from './components/features/signup/SignupForm.jsx'
export default function App(){
    const {isDark,toggleTheme} = useTheme();
    return (
        <div className="w-full min-h-screen py-4 px-4 bg-light-background dark:bg-dark-background transition-colors duration-500 flex flex-col items-center">
          <Header isDark={isDark} toggleTheme={toggleTheme}/>
          <SignupForm />
        </div>
    );
}