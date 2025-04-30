"use client";

import Link from "next/link";
import { FiGrid, FiList, FiClipboard, FiFolderPlus } from "react-icons/fi";

export default function ManageAmenitiesHome() {
  const sections = [
    {
      name: "Manage Master Amenities",
      description: "Add, edit, or delete all available amenities.",
      href: "/manageAmenities/master-amenities",
      icon: <FiGrid className="w-6 h-6" />,
    },
    {
      name: "Manage Listing Amenities",
      description: "Assign amenities to specific listings.",
      href: "/manageAmenities/listing-amenities",
      icon: <FiList className="w-6 h-6" />,
    },
    // Future placeholders
    {
      name: "Manage Amenity Categories",
      description: "Organize amenities into categories. (Coming Soon)",
      href: "#", // Placeholder for future
      icon: <FiFolderPlus className="w-6 h-6" />,
    },
    {
      name: "View Amenities Audit Logs",
      description: "See history of amenities changes. (Coming Soon)",
      href: "#", // Placeholder for future
      icon: <FiClipboard className="w-6 h-6" />,
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Manage Amenities</h1>
        <p className="text-slate-500 text-sm">
          Choose a function below to manage your amenities.
        </p>
      </div>

      {/* Management Sections */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow hover:bg-teal-50 transition group"
          >
            {/* Icon */}
            <div className="bg-teal-100 text-teal-700 p-3 rounded-full">
              {section.icon}
            </div>

            {/* Text */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-teal-800">
                {section.name}
              </h2>
              <p className="text-sm text-slate-500">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
