import LoginForm from "../components/LoginForm";


const RegisterPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-6 w-full max-w-2xl border rounded-xl bg-white">
        <h1 className="text-center text-2xl font-semibold py-4">
          LOGIN Form
        </h1>
        <div className="space-y-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
