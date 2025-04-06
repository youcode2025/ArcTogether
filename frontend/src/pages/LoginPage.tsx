
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-800/90 to-gray-600/90 relative overflow-hidden">
      {/* Nature-themed background elements */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop')", 
                    filter: "brightness(0.6)" }}>
      </div>
      
      {/* Glassmorphism overlay pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <LoginForm />
      </div>
      
      <div className="mt-8 text-center text-white/80 text-xs animate-fade-in relative z-10">
        &copy; {new Date().getFullYear()} Outdoor Exchange. All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;