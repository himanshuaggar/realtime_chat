import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <div className="flex min-h-full flex-col justify-center bg-gray-200 py-12 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-full">
                <svg viewBox='0 0 2000 2000' className="mx-auto text-purple-600 h-12 w-12">
                    <path
                        fill='currentColor'
                        d='m1976.678 964.142-1921.534-852.468c-14.802-6.571-32.107-3.37-43.577 8.046-11.477 11.413-14.763 28.703-8.28 43.532l365.839 836.751-365.839 836.749c-6.483 14.831-3.197 32.119 8.28 43.532 7.508 7.467 17.511 11.417 27.677 11.417 5.37 0 10.785-1.103 15.9-3.371l1921.533-852.466c14.18-6.292 23.322-20.349 23.322-35.861.001-15.514-9.141-29.571-23.321-35.861zm-1861.042-739.791 1664.615 738.489h-1341.737zm321.069 816.954h1334.219l-1655.287 734.35z'
                    />
                </svg>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">Sign In to Your Account</h2>
            </div>
            <AuthForm />
        </div>
    )
}