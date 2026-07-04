import { SidebarItem } from "./SidebarItem"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { Logo } from "../../icons/Logo"
import { AllIcon } from "../../icons/AllIcon"
import { InstagramIcon } from "../../icons/InstagramIcon"
import { RedditIcon } from "../../icons/RedditIcon"
import { DocumentIcon } from "../../icons/DocumentIcon"
import { LinkIcon } from "../../icons/LinkIcon"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useState } from "react"

export const Sidebar = ({ onSelect, selected, toggleTheme, dark }: {
    onSelect: (type: string) => void;
    selected: string;
    toggleTheme: () => void;
    dark: boolean;
}) => {
    const user = useUser();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    function signout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return <>
        {/* Overlay */}
        {mobileOpen && (
            <div onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 bg-black/40 z-30"/>
        )}

        {/* Sidebar */}
        <div className={`h-screen bg-white dark:bg-gray-900 border-r border-purple-100 dark:border-gray-700 w-64 fixed left-0 top-0 z-40 transition-transform duration-300 flex flex-col
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-6 pb-2">
                <div className="flex items-center gap-2 font-bold text-purple-600 text-lg">
                    <Logo/>
                    Brainly
                </div>
                {/* Close button - mobile only */}
                <button onClick={() => setMobileOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="text-xs text-gray-400 px-5 mb-4">Your second brain</p>

            {/* User card */}
            {user && (
                <div className="mx-3 mb-4 p-3 bg-purple-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                </div>
            )}

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-3">
                <SidebarItem text="All" icon={<AllIcon/>} onClick={() => { onSelect("all"); setMobileOpen(false); }} active={selected === "all"}/>
                <SidebarItem text="Twitter" icon={<TwitterIcon/>} onClick={() => { onSelect("twitter"); setMobileOpen(false); }} active={selected === "twitter"}/>
                <SidebarItem text="Youtube" icon={<YoutubeIcon/>} onClick={() => { onSelect("youtube"); setMobileOpen(false); }} active={selected === "youtube"}/>
                <SidebarItem text="Instagram" icon={<InstagramIcon/>} onClick={() => { onSelect("instagram"); setMobileOpen(false); }} active={selected === "instagram"}/>
                <SidebarItem text="Reddit" icon={<RedditIcon/>} onClick={() => { onSelect("reddit"); setMobileOpen(false); }} active={selected === "reddit"}/>
                <SidebarItem text="Documents" icon={<DocumentIcon/>} onClick={() => { onSelect("document"); setMobileOpen(false); }} active={selected === "document"}/>
                <SidebarItem text="Links" icon={<LinkIcon/>} onClick={() => { onSelect("link"); setMobileOpen(false); }} active={selected === "link"}/>
            </div>

            {/* Bottom */}
            <div className="px-5 pb-8 flex flex-col gap-3">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">
                    {dark ? "☀️ Light mode" : "🌙 Dark mode"}
                </button>
                <button onClick={signout} className="flex items-center gap-2 text-xs text-red-400 hover:text-red-500 transition-colors">
                    🚪 Sign out
                </button>
            </div>
        </div>

        {/* Hamburger - mobile only, outside sidebar */}
        <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden fixed top-3 left-3 z-50 bg-white dark:bg-gray-900 p-1.5 rounded-lg border border-purple-100 dark:border-gray-700 text-purple-600 shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
    </>
}