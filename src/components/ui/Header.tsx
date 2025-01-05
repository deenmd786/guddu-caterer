"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../reuseable/Button";
import MobileMenu from "./MobileMenu";
import { FaRegCircleUser } from "react-icons/fa6";
import apiHelper from "../../utils/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const route = useRouter();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      const sections = document.querySelectorAll("section");
      let currentSection = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - section.offsetHeight / 3) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getColorClass = () =>
    isScrolled
      ? "bg-[var(--background-secondary)] shadow-md"
      : "bg-transparent";
  const getTextColorClass = () =>
    isScrolled ? "!text-[var(--text-primary)]" : "text-[var(--text-white)]";

  const handleLogout = async () => {
    alert("Logout button clicked!");
    try {
      await apiHelper("/api/user/logout", {
        method: "GET",
      });
      dispatch(clearUser ());
      route.refresh()

    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : "An error occurred during logout"
      );
    }
  };

  const handleNavigation = (section : string) => {
    if (section === "menu") {
      route.push('/dashboard/book-buffet/menu'); // Navigate to the desired route
    }
    // You can add more logic here if needed for other sections
  };

  const sections = ["home", "services", "menu", "about-us", "contact-us"];


  return (
    <header
      className={`fixed w-full transition-all duration-200 ease-in-out ${getColorClass()} z-50`}
    >
      <div
        className={`container max-w-5xl mx-auto px-4 py-3 ${getTextColorClass()}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="w-20 mr-6">
            <Image
              src="/assets/images/main/logo.png"
              alt="Logo"
              width={80}
              height={40}
              className="object-contain w-12 md:w-16"
            />
          </Link>

          <nav className="hidden md:flex space-x-6 xl:space-x-12 font-bold">
      {sections.map((section) => (
        <span key={section}> {/* Use a span to wrap the Link for conditional rendering */}
          {section === "menu" ? (
            <a
              onClick={() => handleNavigation(section)} // Handle click for "menu"
              className={`md:hover:text-[--text-secondary] ${
                activeSection === section
                  ? "text-[--text-secondary] border-b-2 border-[--text-secondary]"
                  : ""
              }`}
              style={{ cursor: 'pointer' }} // Change cursor to pointer for better UX
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")}
            </a>
          ) : (
            <Link
              href={section === "home" ? "/" : section === "about-us" || section === "contact-us" ? `/${section}` : `#${section}`}
              className={`md:hover:text-[--text-secondary] ${
                activeSection === section
                  ? "text-[--text-secondary] border-b-2 border-[--text-secondary]"
                  : ""
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")}
            </Link>
          )}
        </span>
      ))}
    </nav>

          <div className="flex items-center space-x-6">
          {user?.role === "ADMIN" && (
        <Link href="/admin">
          <div className="flex items-center text-[var(--button)] text-4xl">
            {user.profilePic ? (
              <Image
                src={user.profilePic}
                height={50}
                width={50}
                alt="User  Profile"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
              />
            ) : (
              <FaRegCircleUser  />
            )}
          </div>
        </Link>
      )}
            <div className="hidden md:flex">
              {user ? (
                <Button href="/" onClick={handleLogout} label="Logout" />
              ) : (
                <Button href="/auth/login" label="Login" />
              )}
            </div>

            <button
              className="md:hidden flex flex-col space-y-1 items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {["top", "middle", "bottom"].map((pos, index) => (
                <span
                  key={index}
                  className={`w-${
                    pos === "middle" ? "4 ml-2 h-0.5" : "6 h-1"
                  } ${
                    isScrolled
                      ? "!bg-[var(--text-primary)]"
                      : "bg-[var(--bg-Menu)]"
                  } transition-transform duration-300 ease-in-out ${
                    menuOpen
                      ? pos === "top"
                        ? "rotate-45 translate-y-2.5"
                        : pos === "middle"
                        ? "opacity-0"
                        : "-rotate-45 -translate-y-1"
                      : ""
                  }`}
                ></span>
              ))}
            </button>
          </div>
        </div>

        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
