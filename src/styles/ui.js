export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export const btnBase = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${focusRing}`;

export const btnPrimary = `${btnBase} bg-brand text-white hover:bg-[#4039c9] active:bg-[#3730b8]`;

export const btnOutline = `${btnBase} border border-gray-300 bg-white text-gray-900 hover:border-brand hover:bg-[#eef2ff] hover:text-brand active:bg-[#e0e7ff]`;

export const btnDanger = `${btnBase} bg-red-600 text-white hover:bg-red-700 active:bg-red-800`;

export const pillBase = `cursor-pointer rounded-full border px-3.5 py-1 text-sm font-medium transition-colors ${focusRing}`;
export const pillActive = "border-[#c7c9f9] bg-[#eef2ff] text-brand";
export const pillIdle =
  "border-gray-300 bg-white text-gray-700 hover:border-[#c7c9f9] hover:bg-[#eef2ff] hover:text-brand active:bg-[#e0e7ff]";
