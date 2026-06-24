import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary"|"secondary";
    size: "sm"|"md"|"lg";
    text: string;
    startIcon?:ReactElement; 
    endIcon?:ReactElement;
    onClick: ()=> void;
}

const variantStyles = {
    "primary": "bg-primary text-white",
    "secondary":"bg-secondary text-primary"
}

const sizeStyles = {
    "sm": "p-2",
    "md": "p-4",
    "lg": "p-8"
}

const defaultStyles = "rounded-md p-4"

export const Button = (props:ButtonProps) => { 
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>{props.text}</button>
}