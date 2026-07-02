import { SidebarItem } from "./SidebarItem"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { Logo } from "../../icons/Logo"
import { AllIcon } from "../../icons/AllIcon"
import { InstagramIcon } from "../../icons/InstagramIcon"
import { RedditIcon } from "../../icons/RedditIcon"
import { DocumentIcon } from "../../icons/DocumentIcon"
import { LinkIcon } from "../../icons/LinkIcon"

export const Sidebar = ({ onSelect, selected }: { onSelect: (type: string) => void; selected: string }) => {
    return <div className="h-screen bg-white border-r border-purple-100 min-w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center gap-2 font-bold text-purple-600">
            <Logo/>
            Brainly
        </div>
        <p className="text-xs text-gray-400 mt-1 pl-1">Your second brain</p>
        <div className="pt-8 pl-2">
            <SidebarItem text="All" icon={<AllIcon/>} onClick={() => onSelect("all")} active={selected === "all"}/>
            <SidebarItem text="Twitter" icon={<TwitterIcon/>} onClick={() => onSelect("twitter")} active={selected === "twitter"}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>} onClick={() => onSelect("youtube")} active={selected === "youtube"}/>
            <SidebarItem text="Instagram" icon={<InstagramIcon/>} onClick={() => onSelect("instagram")} active={selected === "instagram"}/>
            <SidebarItem text="Reddit" icon={<RedditIcon/>} onClick={() => onSelect("reddit")} active={selected === "reddit"}/>
            <SidebarItem text="Documents" icon={<DocumentIcon/>} onClick={() => onSelect("document")} active={selected === "document"}/>
            <SidebarItem text="Links" icon={<LinkIcon/>} onClick={() => onSelect("link")} active={selected === "link"}/>
        </div>
    </div>
}