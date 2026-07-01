import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import '../App.css'
import { PlusIcon } from "../icons/Plusicon"
import { ShareIcon } from "../icons/Shareicon"
import { CreateContentModal } from "../components/ui/CreateContentModal"
import { useState } from "react"
import { Sidebar } from "../components/ui/Sidebar"

export function Dashboard() {
  const[modelOpen,setModelOpen] = useState(false);

  return<div>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateContentModal open={modelOpen} onClose={()=>{setModelOpen(false)}}/>
      <div className="flex justify-end gap-4">
        <Button onClick={()=>{
          setModelOpen(true)
        }} variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
        <Button variant="secondary" text="Share Link" startIcon={<ShareIcon size="md"/>} />
      </div>

      <div className="flex gap-4">
        <Card type="twitter" link="https://x.com/AmaanShikalgar1/status/2071853642332971428?s=20" title="Latest Tweet"/>
        <Card type="youtube" link="https://youtu.be/cxMqXPAVag8?si=Q-bXj6y493syHBYc" title="Latest video"/>
      </div>
    </div>
</div>
}