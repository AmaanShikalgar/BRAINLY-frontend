import { Button } from "./components/ui/Button"
import './App.css'
import { PlusIcon } from "./icons/Plusicon"
import { ShareIcon } from "./icons/Shareicon"

function App() {

  return(
    <>
    <div className="flex">
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon size="md"/>}/>
      <Button variant="secondary" text="Share Link" startIcon={<ShareIcon size="md"/>} />
    </div>
    </>
  )
}

export default App