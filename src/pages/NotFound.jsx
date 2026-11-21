import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/60 px-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400">
          <FiAlertTriangle className="h-6 w-6" />
        </div>

        <p className="mt-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
          404 Error
        </p>

        <h1 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
          Page not found
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Check the URL or go back to your workspace.
        </p>

      </div>
    </div>
  );
};

export default NotFound;