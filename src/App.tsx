import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/dashboard";
import { Navigate } from "react-router-dom";
import { Brain } from "./pages/Brain";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/signin"/>;
    return <>{children}</>;
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Navigate to="/signin"/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
              <Dashboard toggleTheme={()=>setDark(!dark)} dark={dark}/>
          </ProtectedRoute>
        }/>
        <Route path="/brain/:shareLink" element={<Brain/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;