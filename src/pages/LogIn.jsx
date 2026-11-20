import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/Logo.jpeg";

function LogIn() {
  const { login, message, setMessage } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  function handleForgotPassword() {
    setMessage("Password reset is not available yet. Please contact your administrator.");
  }

  return (
  <main className="min-h-screen bg-gray-50 text-gray-900 lg:flex lg:bg-white">
    {/* Left side */}
    <section className="hidden bg-linear-to-br from-indigo-600 to-indigo-900 p-8 text-white lg:block lg:w-1/2 lg:p-16">
      <div className="flex items-center gap-3 text-2xl font-bold">
        <img src={logo} alt="WorkFlow logo" className="h-9 w-9 rounded-lg" />
        <span>Work<span className="text-indigo-200">Flow</span></span>
      </div>

      <h1 className="mt-14 text-4xl font-bold">Plan. Assign. Deliver.</h1>
      <p className="mt-4 max-w-md text-lg text-indigo-100">One workspace for projects, tasks, people, and announcements.</p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>Projects and tasks in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>Leave requests in a few clicks</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>The right screens for your role</p>
        </div>
      </div>

      {/* Example task cards */}
      <div aria-hidden="true" className="relative mt-8 h-64 max-w-md">
        <div className="absolute left-0 top-0 w-60 rounded-xl border border-gray-200 bg-white p-4 text-gray-900">
          <p className="text-sm font-bold">Design landing page</p>
          <p className="mt-1 text-xs text-gray-500">Due Nov 18</p>
          <p className="mt-2 rounded-full bg-orange-100 px-2 text-xs font-semibold text-orange-700">In Progress</p>
        </div>
        <div className="absolute left-8 top-14 w-60 rounded-xl border border-gray-200 bg-white p-4 text-gray-900 sm:left-16">
          <p className="text-sm font-bold">API integration</p>
          <p className="mt-1 text-xs text-gray-500">Due Nov 13</p>
          <p className="mt-2 rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-700">To do</p>
        </div>
        <div className="absolute left-4 top-28 w-60 rounded-xl border border-gray-200 bg-white p-4 text-gray-900">
          <p className="text-sm font-bold">User testing</p>
          <p className="mt-1 text-xs text-gray-500">Done</p>
          <p className="mt-2 rounded-full bg-green-100 px-2 text-xs font-semibold text-green-700">Completed</p>
        </div>
      </div>
    </section>

    {/* Right side */}
    <section className="flex items-center justify-center p-6 lg:min-h-screen lg:w-1/2 lg:p-12">
      <div className="w-full max-w-md py-10">
        <div className="mb-6 flex items-center gap-3 text-2xl font-bold lg:hidden">
          <img src={logo} alt="WorkFlow logo" className="h-9 w-9 rounded-lg" />
          <span>Work<span className="text-indigo-600">Flow</span></span>
        </div>
        <h2 className="text-xl font-bold lg:text-3xl">Welcome back <span aria-hidden="true">👋</span></h2>
        <p className="mt-8 text-sm text-gray-500 lg:mt-1">Log in to continue to your workspace.</p>

        <form onSubmit={handleSubmit} onChange={() => setMessage("")} className="mt-3 lg:mt-5">
          <label htmlFor="loginEmail" className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            placeholder="sara.mostafa@nilesoft.com"
            className="form-input"
          />

          <label htmlFor="loginPassword" className="mb-1 mt-3 block text-sm font-semibold text-gray-700">Password</label>
          <div className="relative">
            <input
              id="loginPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              minLength={8}
              placeholder="••••••••••"
              className="form-input password-input"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="password-toggle">
              {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex cursor-pointer items-center gap-1 text-gray-600">
              <input type="checkbox" name="rememberMe" className="h-4 w-4 accent-indigo-600" />
              Remember me
            </label>
            <button type="button" onClick={handleForgotPassword} className="cursor-pointer font-semibold text-indigo-600 hover:underline">Forgot password?</button>
          </div>

          <button type="submit" className="mt-4 primary-button h-11 w-full lg:mt-8">Log in</button>
          {message && <p role="status" className="mt-3 text-sm text-indigo-700">{message}</p>}
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">Don’t have an account? <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">Register</Link></p>
        <p className="text-center text-xs text-gray-500">Having trouble? Contact your administrator.</p>
      </div>
    </section>
  </main>
);
}

export default LogIn;
