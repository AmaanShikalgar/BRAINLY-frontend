import { Button } from "./components/ui/Button"
import './App.css'
import { PlusIcon } from "./icons/Plusicon"
import { ShareIcon } from "./icons/Shareicon"

function App() {

  return(
    <>
    <div className="flex">
      <Button startIcon={<ShareIcon size={"md"}/>}variant="primary" size="md" onClick={()=>{}} text="Share"/>
      <Button startIcon={<PlusIcon size={"md"}/>}variant="secondary" size="md" onClick={()=>{}} text="Add Content"/>
    </div>
    </>
  )
}
export default App
