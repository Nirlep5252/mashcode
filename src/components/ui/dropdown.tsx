"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownComponent extends React.FC<DropdownProps> {
  Trigger: React.FC<DropdownProps>;
  Content: React.FC<DropdownProps>;
}

const DropdownContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: false,
  toggle: () => {},
});

const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};

const Dropdown: DropdownComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  // Close dropdown when clicking outside
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isOpen
      ) {
        toggle();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [toggle, isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger: React.FC<DropdownProps> = ({ children }) => {
  const { toggle } = useDropdown();
  return (
    <div className="z-10" onClick={toggle}>
      {children}
    </div>
  );
};

const DropdownContent: React.FC<DropdownProps> = ({ children, className }) => {
  const { isOpen } = useDropdown();
  const variants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      display: "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      display: "block",
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className={`absolute rounded-md border border-foreground/10 p-2 ${className}`}
    >
      {children}
    </motion.div>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;

export default Dropdown;
