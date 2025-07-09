import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const userToken = useSelector((state) => state.auth.token);
  if (userToken) return <Navigate to="/" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm />
    </div>
  );
}
