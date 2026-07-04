import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import '../App.css'
import { PlusIcon } from "../icons/Plusicon"
import { ShareIcon } from "../icons/Shareicon"
import { CreateContentModal } from "../components/ui/CreateContentModal"
import { useState } from "react"
import { Sidebar } from "../components/ui/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export function Dashboard({ toggleTheme, dark }: { toggleTheme: () => void; dark: boolean }) {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<string>("all");

  const filteredContents = filter === "all"
    ? contents
    : contents.filter((c: any) => c.type === filter);

  const filterLabel: Record<string, string> = {
    all: "All Content",
    twitter: "Twitter",
    youtube: "YouTube",
    instagram: "Instagram",
    reddit: "Reddit",
    document: "Documents",
    link: "Links"
  };

  async function shareBrain() {
    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/brain/share", {
          share: true
      }, {
          headers: { "Authorization": localStorage.getItem("token") }
      });
      const shareLink = `${window.location.origin}/brain/${response.data.link}`;
      if (navigator.share) {
          await navigator.share({ title: "My Brainly", text: "Check out my second brain!", url: shareLink });
      } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareLink);
          toast.success("Link copied to clipboard!");
      } else {
          prompt("Copy your share link:", shareLink);
      }
    } catch(e: any) {
      toast.error("Failed to generate share link");
    }
  }

  return <div>
    <Sidebar onSelect={setFilter} selected={filter} toggleTheme={toggleTheme} dark={dark}/>
    <div className="p-4 md:p-6 md:ml-64 min-h-screen bg-gray-50 dark:bg-gray-800 pt-14 md:pt-6">
      <CreateContentModal open={modelOpen} onClose={() => { setModelOpen(false); refresh(); }}/>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-base md:text-xl font-semibold text-gray-700 dark:text-gray-200">{filterLabel[filter]}</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5">{filteredContents.length} item{filteredContents.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          {/* Mobile: icon only buttons */}
          <button onClick={() => setModelOpen(true)} className="md:hidden p-2 bg-purple-600 text-white rounded-lg">
            <PlusIcon size="md"/>
          </button>
          <button onClick={shareBrain} className="md:hidden p-2 bg-purple-100 text-purple-600 rounded-lg">
            <ShareIcon size="md"/>
          </button>
          {/* Desktop: full buttons */}
          <div className="hidden md:flex gap-3">
            <Button onClick={() => setModelOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
            <Button onClick={shareBrain} variant="secondary" text="Share Brain" startIcon={<ShareIcon size="md"/>}/>
          </div>
        </div>
      </div>

      {filteredContents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">Nothing here yet</h3>
          <p className="text-sm text-gray-400">Add some {filter === "all" ? "content" : filter} to get started</p>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap justify-start">
          {filteredContents.map(({ _id, type, link, title }: any) => (
            <Card key={link} _id={_id} type={type} link={link} title={title} onDelete={refresh}/>
          ))}
        </div>
      )}
    </div>
  </div>
}