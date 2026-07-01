import { useState } from "react"
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

//controlled component
export const CreateContentModal = ({open, onClose}) =>{
    const[modelOpen, setModelOpen] = useState(false);
    return<>
        {open && <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-70 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                        <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input placeholder={"Title"}/>
                        <Input placeholder={"Link"}/>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" text="Submit" size="sm"/>
                    </div>
                </span>
            </div>
        </div>}
    </>
}