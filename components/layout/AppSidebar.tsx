"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiCalendar } from "react-icons/fi";

export default function AppSidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Browse Listings",
      href: "/",
      icon: <FiHome className="w-5 h-5" />,
    },
    {
      name: "Manage Amenities",
      href: "/manageAmenities", // now clickable
      icon: <FiGrid className="w-5 h-5" />,
      sublinks: [
        { name: "Master Amenities", href: "/manageAmenities/master-amenities" },
        {
          name: "Listing Amenities",
          href: "/manageAmenities/listing-amenities",
        },
      ],
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <FiCalendar className="w-5 h-5" />,
      sublinks: [{ name: "Seasons", href: "/seasons" }],
    },
  ];

  return (
    <aside className="w-full md:w-64 min-h-screen bg-gradient-to-b from-white to-slate-100 shadow-md">
      <div className="flex flex-col h-full p-4">
        {/* Navigation */}
        <nav className="flex flex-col flex-1 gap-4 mt-8">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div key={link.name} className="flex flex-col gap-1">
                {/* Main Link */}
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all
                    ${
                      isActive
                        ? "bg-teal-700 text-white shadow"
                        : "text-slate-700 hover:bg-teal-100 hover:text-teal-700"
                    }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>

                {/* Sublinks */}
                {link.sublinks && (
                  <div className="flex flex-col pl-8 gap-2">
                    {link.sublinks.map((sublink) => {
                      const isSubActive = pathname === sublink.href;

                      return (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                            ${
                              isSubActive
                                ? "bg-teal-700 text-white shadow"
                                : "text-slate-600 hover:bg-teal-100 hover:text-teal-700"
                            }`}
                        >
                          {sublink.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 text-xs text-slate-400 mt-auto">
          © 2025 Seascapes
        </div>
      </div>
    </aside>
  );
}
