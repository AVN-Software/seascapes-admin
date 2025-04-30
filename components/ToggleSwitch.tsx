// components/ui/ToggleSwitch.tsx
"use client";

import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string; // optional label next to toggle
  disabled?: boolean;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-sm font-medium text-slate-700">{label}</span>
      )}
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
          ${checked ? "bg-teal-600" : "bg-slate-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        aria-pressed={checked}
        aria-disabled={disabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition
            ${checked ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
}
