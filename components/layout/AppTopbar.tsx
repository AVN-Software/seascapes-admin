"use client";

import { FiBell } from "react-icons/fi";

export default function AppTopbar() {
  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Left: Branding */}
      <div className="text-lg font-bold text-teal-700">Seascapes Admin</div>

      {/* Right: User Section */}
      <div className="flex items-center gap-6">
        {/* Notifications Icon */}
        <button
          type="button"
          className="relative text-slate-600 hover:text-teal-700 transition"
          title="Notifications"
        >
          <FiBell className="w-5 h-5" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span className="text-sm text-slate-700 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
