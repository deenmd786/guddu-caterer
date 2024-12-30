"use client";

import Link from 'next/link';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';

interface LinkItem {
    href?: string;
    label: string;
}

interface DropdownProps {
    title: string;
    links: LinkItem[]; // Specify array of LinkItem type
    isScroll?: boolean; // Controlled externally for styling
    className?: string; // Additional class for custom styling
}

const Dropdown: React.FC<DropdownProps> = ({ title, links, isScroll = false, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Open dropdown on mouse enter
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    // Close dropdown on mouse leave
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
            
                className={`${
                    isScroll ? 'text-[var(--text-primary)]' : 'text-[var(--text-white)]'
                } md:hover:text-[var(--text-secondary)] flex items-center`}
            >
                {title} <IoMdArrowDropdown className='ml-1 text-xl' />
            </button>
            <div
                className={`absolute bg-[var(--background)] shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? 'scale-y-100' : 'scale-y-0'} origin-top`}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }} // Prevent interaction when closed
            >
                {links.map((link) => (
                    <Link
                        key={link.label} // Use a unique key
                        href={link.href || '#'}
                        className={`${
                            className
                                ? className
                                : 'block px-2 py-1 text-[var(--text-primary)] md:hover:text-[var(--text-secondary)] md:hover:bg-[var(--background-secondary)] whitespace-nowrap'
                        }`}
                        // scroll={false} 
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;