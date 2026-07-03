import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useUser() {
    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

    useEffect(() => {
        axios.get(BACKEND_URL + "/api/v1/me", {
            headers: { "Authorization": localStorage.getItem("token") }
        }).then(res => setUser(res.data.user));
    }, []);

    return user;
}