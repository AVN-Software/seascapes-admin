import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ActionItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "danger";
  external?: boolean;
}

interface QuickActionsCardProps {
  title?: string;
  actions?: ActionItem[];
  className?: string;
  children?: ReactNode;
}

export default function QuickActionsCard({
  title = "Quick Actions",
  actions = [],
  className = "",
  children,
}: QuickActionsCardProps) {
  const getActionClasses = (variant: ActionItem["variant"] = "default") => {
    const baseClasses =
      "w-full py-2 px-4 rounded-lg text-sm font-medium text-center block transition-colors";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white`;
      case "secondary":
        return `${baseClasses} bg-blue-100 hover:bg-blue-200 text-blue-700`;
      case "danger":
        return `${baseClasses} bg-red-100 hover:bg-red-200 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700`;
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const actionClasses = getActionClasses(action.variant);
          const IconComponent = action.icon;

          const linkProps = action.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Link
              key={index}
              href={action.href}
              className={actionClasses}
              {...linkProps}
            >
              {IconComponent && (
                <IconComponent className="w-4 h-4 inline mr-2" />
              )}
              {action.label}
            </Link>
          );
        })}

        {/* Custom children content */}
        {children}
      </div>
    </div>
  );
}
