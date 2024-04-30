import React, { useState } from "react";
import { Inter } from "next/font/google";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/firebase';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app); // Initialize Firebase Authentication

const inter = Inter({ subsets: ["latin"] });

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error] = useState<string | null>(null); 
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", userCredential.user);
      
      router.push('/login');
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred. Please Enter Valid Account and Try Again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ToastContainer /> {/* This component is required for displaying toast notifications */}
      <div className="p-6 w-full max-w-md border rounded-xl bg-white shadow-lg">
        <h1 className="text-center text-2xl font-semibold py-4 text-indigo-600">
          Sign Up Form
        </h1>
        {error && <p className="error-message text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="form-container space-y-6">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            autoFocus
            id="fullName"
            {...register("fullName", { required: true })}
            className={`input-field ${errors.fullName ? 'error-border' : ''}`}
          />
          {errors.fullName && (
            <p className="error-message text-red-600">Full name is required</p>
          )}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className={`input-field ${errors.email ? 'error-border' : ''}`}
          />
          {errors.email && (
            <p className="error-message text-red-600">Invalid email format</p>
          )}
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
            className={`input-field ${errors.password ? 'error-border' : ''}`}
          />
          {errors.password && (
            <p className="error-message text-red-600">Password must be at least 8 characters long</p>
          )}
          <button type="submit" className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
        <p className="text-center mt-4">
          Already Have an Account?{' '}
          <Link href="/login">
            <span className="text-indigo-600 hover:underline">Login Here</span>
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignUp;
