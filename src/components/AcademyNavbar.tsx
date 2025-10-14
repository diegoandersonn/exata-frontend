"use client";
import React, { useEffect, useRef, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./ui/profile/Profile";
import { initialsGenerator } from "./ui/profile/initialsGenerator";
import { useUser } from "@/contexts/UserContext";

function AcademyNavbar() {
  const { user: ctxUser } = useUser();
  const u = ctxUser;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileContainerRef = useRef<HTMLDivElement | null>(null);
  const profile = {
    id: "user-email",
    name: u?.name ?? "",
    email: u?.email ?? "",
    items: [
      {
        id: "user-agency",
        title: "Agência",
        content: "0",
        icon: "Copy",
      },
      {
        id: "user-account",
        title: "Conta",
        content: "0",
        icon: "Copy",
      },
      {
        id: "user-instituition",
        title: "Instituição",
        content: "0",
        icon: "Copy",
      },
    ],
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target as Node) // verifica a div que você clicou é a mesma que a div referência
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-red-800 fixed z-10 h-16 flex justify-end pr-10">
      <div className="navbar-group flex items-center gap-4">
        \
        <div
          ref={profileContainerRef}
          className="navbar-group flex items-center gap-4 relative"
        >
          <button
            className={`bg-[#FFFFFF1A] h-9 w-20 rounded-lg flex items-center justify-between hover:bg-[#ffffff75] z-20 ${
              isProfileOpen ? "bg-[#ffffff75]" : "hover:bg-[#ffffff75] "
            }first-step`}
            onClick={toggleProfile}
            id="open-profile"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className="ml-3 text-white w-3"
            />
            <div className="w-10 h-9 bg-[#FFFFFF33] flex items-center justify-center text-white rounded-lg">
              {initialsGenerator(profile.name) !== ""
                ? initialsGenerator(profile.name)
                : initialsGenerator("Financeiro")}
            </div>
          </button>

          <Profile
            active={isProfileOpen}
            profile={profile}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}

export default AcademyNavbar;
