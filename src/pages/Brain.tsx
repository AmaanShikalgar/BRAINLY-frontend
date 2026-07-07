import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/ui/Card";
import { Footer } from "../components/ui/Footer";

export function Brain() {
    const { shareLink } = useParams();
    const [contents, setContents] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get(BACKEND_URL + `/api/v1/brain/${shareLink}`)
            .then(res => {
                setContents(res.data.content);
                setUsername(res.data.username);
            });
    }, [shareLink]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-purple-600">🧠 {username}'s Brain</h1>
                <p className="text-sm text-gray-400 mt-1">{contents.length} saved items</p>
            </div>
            <div className="flex gap-4 flex-wrap">
                {contents.map(({ _id, type, link, title }: any) => (
                    <Card key={link} _id={_id} type={type} link={link} title={title} onDelete={() => {}}/>
                ))}
            </div>
            <Footer/>
        </div>
    );
}