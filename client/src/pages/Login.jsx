import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const userToken = useSelector((state) => state.auth.token);
  if (userToken) return <Navigate to="/" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginForm />
    </div>
  );
}
