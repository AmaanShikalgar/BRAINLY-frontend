import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { RedditIcon } from "../../icons/RedditIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Reddit = "reddit",
    Document = "document",
    Link = "link"
}

const contentTypes = [
    { type: ContentType.Youtube,   label: "YouTube",   icon: <YoutubeIcon/> },
    { type: ContentType.Twitter,   label: "Twitter",   icon: <TwitterIcon/> },
    { type: ContentType.Instagram, label: "Instagram", icon: <InstagramIcon/> },
    { type: ContentType.Reddit,    label: "Reddit",    icon: <RedditIcon/> },
    { type: ContentType.Document,  label: "Document",  icon: <DocumentIcon/> },
    { type: ContentType.Link,      label: "Link",      icon: <LinkIcon/> },
]

function detectType(url: string): ContentType {
    if (url.includes("youtube.com") || url.includes("youtu.be")) return ContentType.Youtube;
    if (url.includes("twitter.com") || url.includes("x.com")) return ContentType.Twitter;
    if (url.includes("instagram.com")) return ContentType.Instagram;
    if (url.includes("reddit.com")) return ContentType.Reddit;
    return ContentType.Link;
}

export const CreateContentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef  = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);

    async function addContent() {
        if (loading) return;
        setLoading(true);
        try {
            const title = titleRef.current?.value;
            const link  = linkRef.current?.value;
            await axios.post(BACKEND_URL + "/api/v1/content", {
                title, link, type
            }, {
                headers: { "Authorization": localStorage.getItem("token") }
            });
            onClose();
        } catch (e: any) {
            alert(e.response?.data?.message || "Failed to add content");
        } finally {
            setLoading(false);
        }
    }

    return <>
        {open && (
            <div className="w-screen h-screen bg-gray-900/60 fixed top-0 left-0 flex justify-center items-center z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-purple-100">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">Add Content</h2>
                        <div onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                            <CrossIcon/>
                        </div>
                    </div>

                    {/* Type Selector */}
                    <div className="mb-5">
                        <label className="text-xs font-medium text-gray-500 mb-2 block">Content type</label>
                        <div className="grid grid-cols-3 gap-2">
                            {contentTypes.map(({ type: t, label, icon }) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-150 cursor-pointer
                                        ${type === t
                                            ? "border-purple-500 bg-purple-50 text-purple-600"
                                            : "border-gray-200 text-gray-500 hover:border-purple-200 hover:bg-purple-50/50"
                                        }`}
                                >
                                    <span className="text-lg">{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Title</label>
                            <Input ref={titleRef} placeholder="Enter a title"/>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Link</label>
                            <Input
                                ref={linkRef}
                                placeholder="Paste your link here"
                                onChange={(e) => setType(detectType(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <Button variant="primary" text={loading ? "Adding..." : "Add Content"} fullWidth={true} onClick={addContent} loading={loading}/>
                </div>
            </div>
        )}
    </>
}