import Link from 'next/link';

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void; // Update the type of setMenuOpen
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpen, setMenuOpen }) => {



  return (
    <div
      className={`fixed top-0 left-0 h-full w-[80%] bg-[var(--bg-Menu)] z-50 text-md font-medium transform transition-transform duration-500 ease-in-out md:hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Single Links */}
      <Link
        href="#home"
        className="block text-[var(--text-primary)] p-4 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Home
      </Link>
      <Link
        href="#menu"
        className="block text-[var(--text-primary)] p-4 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Menus
      </Link>
      <Link
        href="#services"
        className="block text-[var(--text-primary)] p-4 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Services
      </Link>

      

      {/* Additional Links */}
      <Link
        href="#about"
        className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        About Us
      </Link>
      <Link
        href="#contact"
        className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Contact Us
      </Link>
      <Link
        href="/auth/login"
        className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Log In
      </Link>
    </div>
  );
};

export default MobileMenu;
