import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Preview {
    title: string;
    description: string;
    image: string;
    siteName: string;
}

export function useLinkPreview(link: string) {
    const [preview, setPreview] = useState<Preview | null>(null);

    useEffect(() => {
        axios.post(BACKEND_URL + "/api/v1/preview", { url: link }, {
            headers: { "Authorization": localStorage.getItem("token") }
        }).then(res => setPreview(res.data))
          .catch(() => setPreview(null));
    }, [link]);

    return preview;
}