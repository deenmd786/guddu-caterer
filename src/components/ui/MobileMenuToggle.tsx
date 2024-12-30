interface MobileMenuToggleProps {
    menuOpen: boolean;
    toggleMenu: () => void;
  }
  
  const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ menuOpen, toggleMenu }) => {
    return (
      <button
        className="md:hidden flex flex-col space-y-1 items-center"
        onClick={toggleMenu}
      >
        <span
          className={`w-6 h-1 ${menuOpen ? "rotate-45 translate-y-2.5" : ""} transition-transform duration-300 ease-in-out`}
        ></span>
        <span
          className={`w-4 ml-2 h-0.5 ${menuOpen ? "opacity-0" : ""} transition-all duration-300 ease-in-out`}
        ></span>
        <span
          className={`w-6 h-1 ${menuOpen ? "-rotate-45 -translate-y-1" : ""} transition-transform duration-300 ease-in-out`}
        ></span>
      </button>
    );
  };
  
  export default MobileMenuToggle;