import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import '../App.css'
import { PlusIcon } from "../icons/Plusicon"
import { ShareIcon } from "../icons/Shareicon"
import { CreateContentModal } from "../components/ui/CreateContentModal"
import { useState } from "react"
import { Sidebar } from "../components/ui/Sidebar"
import { useContent } from "../hooks/useContent"

export function Dashboard() {
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

  return <div>
    <Sidebar onSelect={setFilter} selected={filter}/>
    <div className="p-6 ml-72 min-h-screen bg-gray-50">
      <CreateContentModal open={modelOpen} onClose={() => { setModelOpen(false); refresh(); }}/>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">{filterLabel[filter]}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{filteredContents.length} item{filteredContents.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setModelOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon size="md"/>}/>
        </div>
      </div>

      {filteredContents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="text-5xl mb-4">🧠</div>
          <h3 className="text-lg font-medium text-gray-600 mb-1">Nothing here yet</h3>
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