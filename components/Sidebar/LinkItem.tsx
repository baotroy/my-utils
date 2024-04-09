import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import clsx from "clsx";
import convertCase, { CaseType } from "@/app/string/utils";

interface LinkItemProps {
  label: string;
  // slug?: string;
  isFocus?: boolean;
  href: string;
  isParent?: boolean;
  isOpen?: boolean;
  icon: IconType | null | undefined;
  handleClick?: (e: any) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({
  label,
  isFocus,
  href,
  isParent,
  isOpen,
  icon: Icon,
  handleClick,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          `
          group relative 
          flex 
          items-center
          rounded-sm 
          px-4 
          duration-300
          ease-in-out 
          font-normal
          leading-tight
          `,
          isFocus ? "italic" : "text-graydark dark:text-bodydark2"
        )}
        onClick={handleClick}
      >
        {Icon && <Icon size={20} />}
        {label}
        {isParent &&
          (isOpen ? (
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          ))}
      </Link>
    </li>
  );
};

export default LinkItem;
