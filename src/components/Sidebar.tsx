"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { MenuItem } from "../utils/types";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Home", path: "/", iconSrc: "/sidebar/haus.svg" },
    { name: "Search", path: "/search", iconSrc: "/sidebar/search.svg" },
    { name: "Explore", path: "/explore", iconSrc: "/sidebar/exp.svg" },
    { name: "Messages", path: "/messages", iconSrc: "/sidebar/mess.svg" },
    { name: "Notifications", path: "/notifications", iconSrc: "/sidebar/herz.svg" },
    { name: "Create", path: "/post", iconSrc: "/sidebar/add.svg" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4">
      {/* Логотип */}
      <Image src="/logo.svg" alt="Logo" width={190} height={107} priority />

      <nav className="w-full my-4">
        {/* Итерация по пунктам меню */}
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)} // Навигация по клику
            className={`w-full text-left px-6 py-3 mb-2 rounded-lg font-medium 
              ${pathname === item.path ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
          >
            {/* Иконка меню */}
            <Image src={item.iconSrc} alt={item.name} width={24} height={24} className="mr-3" />
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
