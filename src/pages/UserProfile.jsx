import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const sections = [
  ["profile-details", "Profile"],
  ["account-security", "Account"],
];


function UserProfile() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile-details");
  const [savedProfile, setSavedProfile] = useState({
    fullName: user?.fullName || user?.name || "",
    jobTitle: user?.jobTitle || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: user?.language || "English",
    timeZone: user?.timeZone || "Africa/Cairo",
    appearance: "light",
    taskAlerts: true,
    deadlineAlerts: true,
    leaveAlerts: true,
  });
  const [form, setForm] = useState(savedProfile);
  const [photo, setPhoto] = useState(null);
  const [savedPhoto, setSavedPhoto] = useState(null);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const showAccount = activeSection === "account-security";
  const photoUrl = photo?.url;

  useEffect(() => {
    if (photoUrl) {
      return () => URL.revokeObjectURL(photoUrl);
    }
  }, [photoUrl]);

  function selectPhoto(file) {
    setPhoto(file ? { file, url: URL.createObjectURL(file) } : null);
  }

  function openSection(id) {
    setActiveSection(id);
    setPasswordError("");
    setPasswordMessage("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setProfileMessage("");
  }

  function saveProfile(event) {
    event.preventDefault();
    setSavedProfile(form);
    setSavedPhoto(photo ? photo.file : null);
    setProfileMessage("Profile changes saved on this page.");
  }

  function cancelProfile() {
    setForm(savedProfile);
    selectPhoto(savedPhoto);
    setProfileMessage("");
  }

  function changePassword(event) {
    event.preventDefault();
    const passwordForm = event.currentTarget;
    setPasswordMessage("");

    if (passwordForm.newPassword.value !== passwordForm.confirmPassword.value) {
      setPasswordError("Passwords do not match.");
      passwordForm.confirmPassword.focus();
      return;
    }

    setPasswordError("");
    setPasswordMessage("Password changes are unavailable until the API is connected.");
    passwordForm.reset();
  }

  const name = savedProfile.fullName || "Your profile";
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();

  return (
    <div className="min-h-full text-slate-900">
      <div className="grid min-w-0 content-start gap-3 md:grid-cols-[minmax(8rem,21%)_minmax(0,1fr)] lg:gap-4">
        <nav aria-label="Profile settings" className="rounded-xl border border-slate-200 bg-white p-2">
          <div className="grid grid-cols-2 gap-1 md:grid-cols-1">
            {sections.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => openSection(id)}
                aria-current={activeSection === id ? "true" : undefined}
                className={"cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-medium " + (activeSection === id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50")}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <div className="grid min-w-0">
          {/* Keep the profile height when displaying the account card. */}
          <form onSubmit={saveProfile} className={"col-start-1 row-start-1 min-w-0 rounded-xl border border-slate-200 bg-white p-5 sm:p-6" + (showAccount ? " invisible" : "")}>
            <section id="profile-details" className="scroll-mt-4">
              <div className="mb-6 flex items-center gap-4">
                {photo ? (
                  <img src={photo.url} alt="Selected profile photo" className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">{initials}</span>
                )}
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold">{name}</h2>
                  <p className="text-sm text-slate-600">{savedProfile.jobTitle || "Job title"}{user?.department ? " · " + user.department : ""}</p>
                  <label className="relative mt-2 inline-flex cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium focus-within:outline-2 focus-within:outline-brand">
                    Change photo
                    <input type="file" accept="image/png,image/jpeg" aria-label="Change photo" onChange={(event) => selectPhoto(event.target.files[0])} className="absolute inset-0 w-full cursor-pointer opacity-0" />
                  </label>
                  {photo && <p role="status" className="mt-1 break-all text-sm text-slate-600">{photo.file.name}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Full name</span>
                  <input name="fullName" autoComplete="name" required value={form.fullName} onChange={handleChange} className="form-input" />
                </label>
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Job title</span>
                  <input name="jobTitle" autoComplete="organization-title" value={form.jobTitle} onChange={handleChange} className="form-input" />
                </label>
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Email</span>
                  <input name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} className="form-input" />
                </label>
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} className="form-input" />
                </label>
              </div>
            </section>

            <section id="preferences" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Language</span>
                  <select name="language" value={form.language} onChange={handleChange} className="form-input">
                    <option>English</option>
                    <option>Arabic</option>
                  </select>
                </label>
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Time zone</span>
                  <select name="timeZone" value={form.timeZone} onChange={handleChange} className="form-input">
                    <option value="Africa/Cairo">Cairo</option>
                    <option value="UTC">UTC</option>
                  </select>
                </label>
              </div>
              <fieldset className="mt-4">
                <legend className="mb-2 text-sm font-medium">Appearance</legend>
                <div className="inline-flex gap-3 rounded-lg bg-slate-100 px-3 py-2 text-sm">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="appearance" value="light" checked={form.appearance === "light"} onChange={handleChange} className="accent-indigo-600" /> Light
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input type="radio" name="appearance" value="dark" checked={form.appearance === "dark"} onChange={handleChange} className="accent-indigo-600" /> Dark
                  </label>
                </div>
              </fieldset>
            </section>

            <section id="notifications" className="mt-5">
              <h3 className="mb-1 font-semibold">Notifications</h3>
              <label className="flex cursor-pointer items-center justify-between border-b border-slate-200 py-3 text-sm">
                Task assigned to me
                <input type="checkbox" role="switch" name="taskAlerts" checked={form.taskAlerts} onChange={handleChange} className="toggle toggle-sm text-brand" />
              </label>
              <label className="flex cursor-pointer items-center justify-between border-b border-slate-200 py-3 text-sm">
                Deadline reminders
                <input type="checkbox" role="switch" name="deadlineAlerts" checked={form.deadlineAlerts} onChange={handleChange} className="toggle toggle-sm text-brand" />
              </label>
              <label className="flex cursor-pointer items-center justify-between border-b border-slate-200 py-3 text-sm">
                Leave decisions
                <input type="checkbox" role="switch" name="leaveAlerts" checked={form.leaveAlerts} onChange={handleChange} className="toggle toggle-sm text-brand" />
              </label>
            </section>

            <div className="mt-5 flex flex-wrap gap-2">
              <button type="submit" className="primary-button">Save changes</button>
              <button type="button" onClick={cancelProfile} className="secondary-button">Cancel</button>
            </div>
            {profileMessage && <p role="status" className="mt-3 text-sm text-slate-600">{profileMessage}</p>}
          </form>

          {showAccount && <section id="account-security" className="col-start-1 row-start-1 min-w-0 scroll-mt-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold">Account Security</h2>
            <p className="mt-1 text-sm text-slate-600">Choose a new password and enter it again to confirm.</p>

            <form onSubmit={changePassword} onChange={() => { setPasswordError(""); setPasswordMessage(""); }} className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">New password</span>
                  <input name="newPassword" type="password" autoComplete="new-password" required minLength={8} aria-describedby="new-password-hint" className="form-input" />
                  <span id="new-password-hint" className="block text-xs text-slate-600">Use at least 8 characters.</span>
                </label>
                <label className="space-y-1 text-sm font-medium">
                  <span className="block">Confirm new password</span>
                  <input name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} className="form-input" />
                </label>
              </div>

              <button type="submit" className="primary-button mt-6">Change password</button>
              {passwordError && <p role="alert" className="mt-3 text-sm text-red-700">{passwordError}</p>}
              {passwordMessage && <p role="status" className="mt-3 text-sm text-slate-600">{passwordMessage}</p>}
            </form>
          </section>}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
