import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState(null);

  const handleRegister = async () => {

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      const result = await registerUser({

        name,
        email,
        password,
        role

      });

      setSuccess(result);

    }

    catch (error) {

      alert(
        error.response?.data?.detail ||
        "Registration Failed"
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

          <p className="mt-5 text-xl text-gray-400">
            Create Your Investigation Account
          </p>

        </div>

      </div>

      <div className="w-1/2 flex items-center justify-center">

        <div className="bg-[#1F2937] p-10 rounded-xl w-[450px] shadow-2xl">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          >
            <option>Student</option>
            <option>Investigator</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-4"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] mb-6"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-cyan-500 p-3 rounded font-bold"
          >
            CREATE ACCOUNT
          </button>

          {success && (

            <div className="mt-6 bg-green-900 p-4 rounded">

              <h3 className="font-bold text-green-300">
                Account Created Successfully
              </h3>

              <p className="mt-2">
                User ID:
                <span className="text-cyan-400 ml-2">
                  {success.user_id}
                </span>
              </p>

              <p>
                Role:
                <span className="ml-2">
                  {success.role}
                </span>
              </p>

            </div>

          )}

          <div className="text-center mt-6">

            <span className="text-gray-400">
              Already have an account?
            </span>

            <Link
              to="/"
              className="ml-2 text-cyan-400"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}