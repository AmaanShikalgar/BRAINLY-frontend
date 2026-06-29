import { Button } from "./components/ui/Button"
import './App.css'
import { PlusIcon } from "./icons/Plusicon"

function App() {

  return(
    <>
      <Button  variant="primary" size="sm" onClick={()=>{}} text="Share"/>
      <Button startIcon={<PlusIcon/>}variant="secondary" size="md" onClick={()=>{}} text="Add Content"/>
      <Button variant="secondary" size="lg" onClick={()=>{}} text="Add Content"/>
    </>
  )
}

export default App
