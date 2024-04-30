import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/firebase';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app); 

interface FormData {

  email: string;
  password: string;
}

const Home: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", userCredential.user);
      
      router.push('/login');
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please Enter Valid Account and Try Again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="p-6 w-full max-w-md border rounded-xl bg-white shadow-lg">
        <h1 className="text-center text-2xl font-semibold py-4 text-indigo-600">
          Login Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container space-y-6">
         
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
          Don't Have an Account?{' '}
          <Link href="/register">
            <span className="text-indigo-600 hover:underline">Register Here</span>
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Home;
