import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { Footer } from "../components/ui/Footer";

export function Signin(){
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signin(){
        setError("");
        setLoading(true);
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                email: username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch(error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-screen flex justify-center items-center relative overflow-hidden pb-12">

            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-indigo-50 -z-10"/>
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"/>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10" style={{animationDelay:"1s"}}/>
            <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10" style={{animationDelay:"2s"}}/>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10" style={{animationDelay:"0.5s"}}/>
            <div className="absolute inset-0 -z-10" style={{
                backgroundImage:"linear-gradient(rgba(80,70,228,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(80,70,228,0.03) 1px,transparent 1px)",
                backgroundSize:"40px 40px"
            }}/>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-10 w-full max-w-md shadow-xl relative z-10">
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

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-3 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button onClick={signin} loading={loading} variant="primary" text="Sign in" fullWidth={true}/>
                </div>
                <p className="text-center text-sm text-gray-400 mt-5">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="text-purple-600 font-medium cursor-pointer">Sign up</span>
                </p>
            </div>
            <Footer/>
        </div>
    );
}