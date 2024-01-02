"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

interface DropdownProps {
  children: React.ReactNode;
}

interface DropdownComponent extends React.FC<DropdownProps> {
  Trigger: React.FC<DropdownProps>;
  Content: React.FC<DropdownProps>;
  Item: React.FC<DropdownProps>;
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

const DropdownContent: React.FC<DropdownProps> = ({ children }) => {
  const { isOpen } = useDropdown();
  return (
    <motion.div
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -10,
        scale: isOpen ? 1 : 0.95,
        display: isOpen ? "block" : undefined,
        transitionEnd: {
          display: !isOpen ? "none" : undefined,
        },
        animationDuration: "0.05s",
        transitionDuration: "0.05s",
      }}
      className="absolute -bottom-11 rounded-md border border-foreground/10 p-2"
    >
      {children}
    </motion.div>
  );
};

const DropdownItem: React.FC<DropdownProps> = ({ children }) => {
  const { toggle } = useDropdown();
  return <div onClick={toggle}>{children}</div>;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

export default Dropdown;
