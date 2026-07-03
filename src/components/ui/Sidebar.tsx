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
        {/* Hamburger button - mobile only */}
        <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 p-2 rounded-lg border border-purple-100 dark:border-gray-700 text-purple-600"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>

        {/* Overlay - mobile only */}
        {mobileOpen && (
            <div
                onClick={() => setMobileOpen(false)}
                className="md:hidden fixed inset-0 bg-black/40 z-30"
            />
        )}

        {/* Sidebar */}
        <div className={`h-screen bg-white dark:bg-gray-900 border-r border-purple-100 dark:border-gray-700 min-w-72 fixed left-0 top-0 pl-6 z-40 transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            
            <div className="flex text-2xl pt-8 items-center gap-2 font-bold text-purple-600">
                <Logo/>
                Brainly
            </div>
            <p className="text-xs text-gray-400 mt-1 pl-1">Your second brain</p>

            {user && (
                <div className="mt-6 mx-2 p-3 bg-purple-50 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-gray-800 truncate">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                </div>
            )}

            <div className="pt-8 pl-2">
                <SidebarItem text="All" icon={<AllIcon/>} onClick={() => { onSelect("all"); setMobileOpen(false); }} active={selected === "all"}/>
                <SidebarItem text="Twitter" icon={<TwitterIcon/>} onClick={() => { onSelect("twitter"); setMobileOpen(false); }} active={selected === "twitter"}/>
                <SidebarItem text="Youtube" icon={<YoutubeIcon/>} onClick={() => { onSelect("youtube"); setMobileOpen(false); }} active={selected === "youtube"}/>
                <SidebarItem text="Instagram" icon={<InstagramIcon/>} onClick={() => { onSelect("instagram"); setMobileOpen(false); }} active={selected === "instagram"}/>
                <SidebarItem text="Reddit" icon={<RedditIcon/>} onClick={() => { onSelect("reddit"); setMobileOpen(false); }} active={selected === "reddit"}/>
                <SidebarItem text="Documents" icon={<DocumentIcon/>} onClick={() => { onSelect("document"); setMobileOpen(false); }} active={selected === "document"}/>
                <SidebarItem text="Links" icon={<LinkIcon/>} onClick={() => { onSelect("link"); setMobileOpen(false); }} active={selected === "link"}/>
            </div>

            <div className="absolute bottom-8 left-6 flex flex-col gap-3">
                <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {dark ? "☀️ Light mode" : "🌙 Dark mode"}
                </button>
                <button onClick={signout} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors">
                    🚪 Sign out
                </button>
            </div>
        </div>
    </>
}