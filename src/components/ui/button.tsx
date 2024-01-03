import React, { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  color?: "primary" | "secondary" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  glowOnHover?: boolean;
  growOnHover?: boolean;
  goUpOnHover?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export default function Button({
  onClick,
  children,
  variant = "solid",
  color = "primary",
  size = "md",
  radius = "md",
  glowOnHover = false,
  growOnHover = false,
  goUpOnHover = false,
  iconOnly,
  className,
  disabled,
}: ButtonProps) {
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const bgColorClasses = {
    primary: "bg-primary/80 hover:bg-primary/100",
    secondary: "bg-secondary/80 hover:bg-secondary/100",
    danger: "bg-danger/80 hover:bg-danger/100",
    accent: "bg-accent/80 hover:bg-accent/100",
  };

  const outlineColorClasses = {
    primary: "outline-primary hover:bg-primary",
    secondary: "outline-secondary hover:bg-secondary",
    danger: "outline-danger hover:bg-danger",
    accent: "outline-accent hover:bg-accent",
  };

  const textColorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    danger: "text-danger",
    accent: "text-accent",
  };

  const variantClasses = {
    solid: `${bgColorClasses[color]} text-foreground`,
    outline: `${outlineColorClasses[color]} ${textColorClasses[color]}}`,
    ghost: "bg-transparent hover:bg-foreground/10 text-foreground",
  };

  const sizeClasses = {
    sm: `text-sm gap-1 p-1 ${iconOnly || "px-1.5"}`,
    md: `text-md gap-2 p-2 ${iconOnly || "px-3"}`,
    lg: `text-xl gap-4 p-4 ${iconOnly || "px-6"} font-bold`,
  };

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          `flex items-center justify-center ${
            variant === "outline" ? "outline outline-2" : ""
          } transition-all duration-300 ${variantClasses[variant]} ${
            radiusClasses[radius]
          } ${sizeClasses[size]}`,
          className,
        )}
      >
        {children}
      </button>
    </>
  );
}
