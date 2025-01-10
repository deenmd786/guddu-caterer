import { RootState } from '@/redux/store';
import { clearUser  } from '@/redux/userSlice';
import apiHelper from '@/utils/apiHelper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void; // Update the type of setMenuOpen
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async () => {
    alert("Logout button clicked!");
    try {
      await apiHelper("/api/user/logout", {
        method: "GET",
      });
      dispatch(clearUser ());
      router.push('/'); // Redirect to home or login page after logout
    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : "An error occurred during logout"
      );
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-[80%] bg-[var(--bg-Menu)] z-50 text-md font-medium transform transition-transform duration-500 ease-in-out md:hidden ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Single Links */}
      <Link
        href="/"
        className="block text-[var(--text-primary)] p-4 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Home
      </Link>
      <Link
        href="/dashboard/book-buffet/menu"
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
        href="/about-us"
        className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        About Us
      </Link>
      <Link
        href="/contact-us"
        className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
        onClick={() => setMenuOpen(false)} // Close menu on link click
      >
        Contact Us
      </Link>

      {/* Conditional Rendering for Log In / Log Out */}
      {user ? (
        <button
          className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)] w-full text-left"
          onClick={() => {
            handleLogout();
            setMenuOpen(false); // Close menu on logout
          }}
        >
          Log Out
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="block text-[var(--text-primary)] p-3 border-b-2 border-[var(--border)]"
          onClick={() => setMenuOpen(false)} // Close menu on link click
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default MobileMenu;