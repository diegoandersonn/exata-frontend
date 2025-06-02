'use client'
// import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import Bell from '@/../public/bell-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { usePathname, useRouter } from 'next/navigation'
import Profile from './ui/profile/Profile'
import { initialsGenerator } from './ui/profile/initialsGenerator'
import { NextResponse } from 'next/server'

function AcademyNavbar() {
  // const { push } = useRouter()
  // const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileContainerRef = useRef<HTMLDivElement | null>(null)
  const [profile, setProfile] = useState({
      id: "user-email",
      name: "",
      email: "",
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
    });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileContainerRef.current &&
        !profileContainerRef.current.contains(event.target as Node) // verifica a div que você clicou é a mesma que a div referência
      ) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev)
  }

  useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(`/api/wallet`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Erro ao buscar dados da carteira");
          }
  
          const responseData = await response.json();
          setProfile({
            id: responseData.data.id,
            name: responseData.data.name,
            email: responseData.data.email,
            items: profile.items.map((item, index) => {
              if (index === 0)
                return { ...item, content: responseData.data.agency };
              if (index === 1)
                return { ...item, content: responseData.data.account };
              if (index === 2)
                return { ...item, content: responseData.data.organization };
              return item;
            }),
          });
          return NextResponse.json(responseData);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
  
      fetchData();
    });

  return (
    <nav className="w-full bg-[#C80018] fixed z-10 h-16 flex justify-end pr-10">
      <div className="navbar-group flex items-center gap-4">
        {/* <button
          className={`bg-[#FFFFFF1A] h-9 w-9 rounded-lg flex items-center justify-center ${
            pathname === '/notification' ? 'bg-[#ffffff75]' : 'hover:bg-[#ffffff75]'
          }`}
          onClick={() => push('/notification')}
          id="notification-button"
        >
          <Image src={Bell} className="text-white" alt="Ícone de notificação" />
        </button>
        <div className="w-px bg-[#64748B] h-8" /> */}
        <div ref={profileContainerRef} className="navbar-group flex items-center gap-4 relative">
          <button
            className={`bg-[#FFFFFF1A] h-9 w-20 rounded-lg flex items-center justify-between hover:bg-[#ffffff75] z-20 ${
              isProfileOpen ? 'bg-[#ffffff75]' : 'hover:bg-[#ffffff75] '
            }first-step`}
            onClick={toggleProfile}
            id="open-profile"
          >
            <FontAwesomeIcon icon={faChevronDown} className="ml-3 text-white w-3" />
            <div className="w-10 h-9 bg-[#FFFFFF33] flex items-center justify-center text-white rounded-lg">
              {initialsGenerator(profile.name) !== "" ? initialsGenerator(profile.name) : initialsGenerator('Financeiro')}
            </div>
          </button>

          <Profile active={isProfileOpen} profile={profile} onClose={() => setIsProfileOpen(false)} />
        </div>
      </div>
    </nav>
  )
}

export default AcademyNavbar
