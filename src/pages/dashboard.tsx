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
  const[modelOpen,setModelOpen] = useState(false);
  const {contents,refresh} = useContent();

  return<div>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateContentModal open={modelOpen} onClose={()=>{setModelOpen(false);refresh();}}/>
      <div className="flex justify-end gap-4">
        <Button onClick={()=>{
          setModelOpen(true)
        }} variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
        <Button variant="secondary" text="Share Link" startIcon={<ShareIcon size="md"/>} />
      </div>

      <div className="flex gap-4 flex-wrap pt-4">
        {contents.map(({type,link,title})=><Card key={link} type={type} link={link} title={title}/>)}
      </div>
    </div>
</div>
}