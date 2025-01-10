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

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative z-10">
            <button
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
                onClick={handleToggleDropdown}
                className={`${
                    isScroll ? 'text-[var(--text-primary)]' : 'text-[var(--text-white)]'
                } md:hover:text-[var(--text-secondary)] flex items-center`}
            >
                {title} <IoMdArrowDropdown className='ml-1 text-xl' />
            </button>
            <div
                className={`absolute bg-[var(--background)] shadow-lg transition-all duration-300 ease-in-out transform ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href || '#'}
                        className={`${
                            className
                                ? className
                                : 'block px-2 py-1 text-[var(--text-primary)] md:hover:text-[var(--text-secondary)] md:hover:bg-[var(--background-secondary)] whitespace-nowrap'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;