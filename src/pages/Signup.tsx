import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    async function signup(){
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const firstName = firstNameRef.current?.value;
            const lastName = lastNameRef.current?.value;

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                email: username,
                password,
                firstName,
                lastName
            });
            alert("You have Signed up!");
    } catch(error: any) {
        alert(error.response?.data?.message || "Error in Credentials!");
    }
}
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <Input ref={firstNameRef} placeholder="First Name"/>
            <Input ref={lastNameRef} placeholder="Last Name"/>
            <div className="flex justify-center pt-4">
            <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true}/>
            </div>
        </div>
    </div>
}