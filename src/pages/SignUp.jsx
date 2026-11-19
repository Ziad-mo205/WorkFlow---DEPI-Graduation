import { useEffect, useState } from "react";
import { FiCheck, FiEye, FiEyeOff, FiPlus, FiUser } from "react-icons/fi";

function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const photoUrl = photo?.url;

  useEffect(() => {
    if (photoUrl) {
      return () => URL.revokeObjectURL(photoUrl);
    }
  }, [photoUrl]);

  function selectPhoto(file) {
    setPhoto(file ? { file, url: URL.createObjectURL(file) } : null);
  }

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    setMessage("");
    selectPhoto(file);
  }

  // The browser checks required fields before this function runs.
  function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");

    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match.");
      form.confirmPassword.focus();
      return;
    }

    setPasswordError("");
    setMessage("Account creation will be available when the API is connected. No account has been created yet.");
  }

  function clearMessages() {
    setPasswordError("");
    setMessage("");
  }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
  <main className="min-h-screen bg-gray-50 font-sans text-gray-900 lg:flex lg:bg-white">
    {/* Left side */}
    <section className="hidden bg-linear-to-br from-indigo-600 to-indigo-900 p-8 text-white lg:block lg:w-1/2 lg:p-16">
      <h1 className="text-4xl font-bold">
        Join your team on WorkFlow
      </h1>
      <p className="mt-5 text-lg text-indigo-100">Set up your account in three quick steps.</p>

      <div className="mt-8 flex flex-col gap-4 text-lg">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>Create your account</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>Add a profile photo</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><FiCheck aria-hidden="true" /></span>
          <p>Start working on your tasks</p>
        </div>
      </div>
    </section>

    {/* Right side */}
    <section className="p-6 lg:w-1/2 lg:p-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xl font-bold lg:text-3xl">Create <span className="hidden lg:inline">your </span>account</h2>
        <p className="mt-1 hidden text-gray-500 lg:block">Join your team on WorkFlow in a minute.</p>

        {/* Profile photo */}
        <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-indigo-300 bg-indigo-50">
            {photo ? (
              <img src={photo.url} alt="Selected profile photo" className="h-full w-full rounded-full object-cover" />
            ) : (
              <FiUser aria-hidden="true" className="text-5xl text-indigo-600" />
            )}
            <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white"><FiPlus aria-hidden="true" /></span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold">Profile photo <span className="font-normal text-gray-500">(optional)</span></p>
            <p className="mt-1 text-sm leading-6 text-gray-500">Choose a profile photo. Square photos look best.</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <label className="relative flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus-within:outline-2">
                <FiPlus aria-hidden="true" />Upload photo
                <input type="file" name="profilePhoto" form="signupForm" accept="image/*" onChange={handlePhotoChange} aria-label="Upload profile photo" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
              </label>
              {photo && <p className="break-all text-sm text-gray-600">{photo.file.name}</p>}
            </div>
          </div>
        </div>

        <form id="signupForm" onSubmit={handleRegister} onChange={clearMessages} className="mt-4">
          {/* Two columns on larger screens */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-gray-700">Full name</label>
              <input id="fullName" name="fullName" value={user.fullName} onChange={handleChange} required type="text" autoComplete="name" placeholder="Rana Fathy" className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
              <input id="email" name="email" value={user.email} onChange={handleChange} required type="email" autoComplete="email" placeholder="rana.fathy@nilesoft.com" className="form-input" />
            </div>
            <div>
              <label htmlFor="jobTitle" className="mb-1 block text-sm font-semibold text-gray-700">Job title</label>
              <input id="jobTitle" name="jobTitle" value={user.jobTitle} onChange={handleChange} required type="text" autoComplete="organization-title" placeholder="Product Owner" className="form-input" />
            </div>
            <div>
              <label htmlFor="department" className="mb-1 block text-sm font-semibold text-gray-700">Department</label>
              <select id="department" name="department" value={user.department} onChange={handleChange} required className="form-input text-gray-700">
                <option value="" disabled>Select your department</option>
                <option value="delivery">Delivery</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input id="password" name="password" value={user.password} onChange={handleChange} required minLength={8} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="••••••••••" aria-describedby="passwordHint" className="form-input password-input" />
                <button type="button" onClick={togglePassword} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="password-toggle">
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
              <p id="passwordHint" className="mt-1 text-xs text-gray-500">Use at least 8 characters</p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-gray-700">Confirm password</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required minLength={8} type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="••••••••••" aria-invalid={Boolean(passwordError)} aria-describedby={passwordError ? "passwordError" : undefined} className="form-input password-input" />
                <button type="button" onClick={toggleConfirmPassword} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} aria-pressed={showConfirmPassword} className="password-toggle">
                  {showConfirmPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
              {passwordError && <p id="passwordError" role="alert" className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>
          </div>

          <p className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm leading-6 text-indigo-800">New accounts start as <strong className="mx-1">Employee</strong>. An Admin can change the role later.</p>
          <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 accent-indigo-600" />
            <span>I agree to the Terms and Privacy Policy</span>
          </label>
          <button type="submit" className="mt-8 primary-button h-12 w-full">Create account</button>
          {message && <p role="status" className="mt-3 text-sm text-indigo-700">{message}</p>}
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">Already have an account? <a href="/login" className="font-semibold text-indigo-600 hover:underline">Log in</a></p>
      </div>
    </section>
  </main>
);
}

export default SignUp;
