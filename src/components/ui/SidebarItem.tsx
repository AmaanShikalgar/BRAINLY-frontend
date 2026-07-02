import type { ReactElement } from "react";

export function SidebarItem({ text, icon, onClick, active }: {
    text: string;
    icon: ReactElement;
    onClick: () => void;
    active?: boolean;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 py-2.5 px-4 cursor-pointer rounded-lg max-w-52 transition-all duration-150 text-sm font-medium
                ${active
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
        >
            {icon}
            {text}
        </div>
    )
}