"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "../card";
import ProfileButtons from "./button";
import { IconType } from "./icons";
import { useRouter } from "next/navigation";
import { Logout } from "./icons/logout";
import { initialsGenerator } from "./initialsGenerator";

type ProfileProps = {
  active: boolean;
  onClose?: () => void;
  profile: {
    id: string;
    name: string;
    email: string;
    items: {
      id: string;
      title: string;
      content: string;
      icon: string;
    }[];
  };
};

export default function Profile({ active, profile }: ProfileProps) {
  const { push } = useRouter();

  const deleteCookies = () => {
    return (document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
  };

  if (!active) {
    return null;
  }

  return (
    <div
      id="profile-modal"
      className="fixed top-[8.15rem] -right-[8.8rem] transform -translate-x-1/2 -translate-y-1/2 z-60"
    >
      <Card className="w-[22.5rem] rounded-lg rounded-tr-none flex flex-col justify-center items-center gap-4 profile-modal">
        <CardHeader className="flex flex-row gap-3 items-center w-full">
          <div
            className="w-9 h-9 bg-[#475569] flex items-center justify-center text-white rounded-lg"
            id="profile-image"
          >
            {initialsGenerator(profile.name) !== ""
              ? initialsGenerator(profile.name)
              : initialsGenerator("Financeiro")}
          </div>
          <div className="flex flex-col justify-center h-full -mt-10">
            <CardTitle
              id="profile-username"
              className="text-[13px] text-[#1E293B] md:text-[13px] lg:text-[14px]"
            >
              {"Olá administrador!"}
            </CardTitle>
            <ProfileButtons
              content={profile.email}
              icon={"Copy" as IconType}
              separator={false}
            />
          </div>
        </CardHeader>
        <hr className="bg-[#F1F1F1] w-[88%] -mt-7" />
        <CardFooter className="flex w-full justify-between">
          <button
            className="text-red-600 text-sm"
            onClick={() => {
              push("/");
              deleteCookies();
            }}
            id="logout"
          >
            Sair
          </button>
          <button
            onClick={() => {
              push("/");
              deleteCookies();
            }}
            id="logout-door"
          >
            <Logout color="#E21B0C" />
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
