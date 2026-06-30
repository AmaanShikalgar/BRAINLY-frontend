import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import './App.css'
import { PlusIcon } from "./icons/Plusicon"
import { ShareIcon } from "./icons/Shareicon"

function App() {
  return<div className="p-4">
    <div className="flex justify-end gap-4">
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
      <Button variant="secondary" text="Share Link" startIcon={<ShareIcon size="md"/>} />
    </div>
    <div className="flex gap-4">
      <Card type="twitter" link="https://x.com/AmaanShikalgar1/status/2071853642332971428?s=20" title="Latest Tweet"/>
      <Card type="youtube" link="https://youtu.be/cxMqXPAVag8?si=Q-bXj6y493syHBYc" title="Latest video"/>
    </div>
</div>
}

export default App