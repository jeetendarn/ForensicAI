import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const [loginSuccess, setLoginSuccess] = useState(null);

  const handleLogin = async () => {

    try {

      const result = await loginUser({

        user_id: userId,
        password: password,
        role: role

      });

      localStorage.setItem(
        "token",
        result.access_token
      );

      setLoginSuccess("Login Successful");

    }

    catch(error){

      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-[#0A0F1F] flex">

      <div className="w-1/2 flex items-center justify-center">

        <div>

          <h1 className="text-6xl font-bold text-cyan-400">
            ForensicAI
          </h1>

          <p className="mt-4 text-gray-400 text-xl">
            AI Powered Digital Investigation Platform
          </p>

        </div>

      </div>

      <div className="w-1/2 flex items-center justify-center">

        <div className="bg-[#1F2937] p-10 rounded-xl w-[420px] shadow-2xl">

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Login
          </h2>

          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-6"
          >
            <option>Admin</option>
            <option>Investigator</option>
            <option>Student</option>
          </select>

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 p-3 rounded font-bold"
          >
            LOGIN
          </button>

          {
            loginSuccess && (

              <div className="mt-4 bg-green-900 p-4 rounded">

                <h3 className="font-bold text-green-300">

                  Login Successful

                </h3>

              </div>

            )
          }

          <div className="text-center mt-6">

            <span className="text-gray-400">

              Don't have an account?

            </span>

            <Link
              to="/register"
              className="ml-2 text-cyan-400"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}