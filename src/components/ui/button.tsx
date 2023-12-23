import React from "react";

interface ButtonProps {
  label?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button className={`flex items-center justify-center gap-2 p-2`}>
        {props.label}
      </button>
    </>
  );
}
