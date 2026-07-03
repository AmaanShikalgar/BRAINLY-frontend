import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Signin(){
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin(){
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                email: username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token",jwt);
            navigate("/dashboard");
    } catch(error: any) {
        alert(error.response?.data?.message || "Error in Credentials!");
    }
}
   return (
  <div className="h-screen w-screen bg-purple-50 flex justify-center items-center">
    <div className="bg-white rounded-2xl border border-purple-100 p-10 w-full max-w-md shadow-sm">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Logo />
          <h1 className="text-2xl font-bold text-purple-600">Brainly</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">Welcome back!</p>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
          <Input ref={usernameRef} placeholder="john@example.com"/>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
         <Input ref={passwordRef} placeholder="••••••••" type="password"/>
        </div>
        <Button onClick={signin} loading={false} variant="primary" text="Sign in" fullWidth={true}/>
      </div>
      <p className="text-center text-sm text-gray-400 mt-5">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} className="text-purple-600 font-medium cursor-pointer">Sign up</span>
      </p>
    </div>
  </div>
);
}