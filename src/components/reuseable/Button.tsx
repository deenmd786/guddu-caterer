import Link from "next/link";
import React from "react";
import "@/styles/button.css"
interface ButtonProps {
  href?: string; // Optional href
  label: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>; // Optional onClick function
  disabled?: boolean; // Optional disabled prop
  type?: "button" | "submit" | "reset"; // Optional type prop
}

const Button: React.FC<ButtonProps> = ({ href, label, className = "", onClick, disabled = false, type = "button" }) => {
  const buttonClass = `cat-btn ${className} ${disabled ? 'disabled' : ''}`.trim();

  if (href) {
    return (
      <Link href={href} className={buttonClass} onClick={disabled ? undefined : onClick}>
        {label}
      </Link>
    );
  } else {
    return (
      <button type={type} className={buttonClass} onClick={disabled ? undefined : onClick} disabled={disabled}>
        {label}
      </button>
    );
  }
};

export default Button;