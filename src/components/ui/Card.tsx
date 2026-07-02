import axios from "axios";
import { BACKEND_URL } from "../../config";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { RedirectIcon } from "../../icons/RedirectIcon";
import { useLinkPreview } from "../../hooks/useLinkPreview";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "reddit" | "document" | "link";
    _id: string;
    onDelete: () => void;
}

const typeBadge: Record<string, { label: string; color: string }> = {
    youtube:   { label: "▶ YouTube",   color: "bg-red-50 text-red-500" },
    twitter:   { label: "𝕏 Twitter",   color: "bg-blue-50 text-blue-400" },
    instagram: { label: "📸 Instagram", color: "bg-pink-50 text-pink-500" },
    reddit:    { label: "🔴 Reddit",    color: "bg-orange-50 text-orange-500" },
    document:  { label: "📄 Document",  color: "bg-purple-50 text-purple-500" },
    link:      { label: "🔗 Link",      color: "bg-purple-50 text-purple-500" },
}

const isLinkPreview = (type: string) =>
    ["instagram", "reddit", "link", "document"].includes(type);

export const Card = ({ title, link, type, _id, onDelete }: CardProps) => {
    const preview = useLinkPreview(isLinkPreview(type) ? link : "");

    async function deleteContent() {
        await axios.delete(BACKEND_URL + "/api/v1/content", {
            data: { contentId: _id },
            headers: { "Authorization": localStorage.getItem("token") }
        });
        onDelete();
    }

    const badge = typeBadge[type];

    return (
        <div className="p-4 bg-white rounded-xl border border-gray-100 max-w-72 min-w-72 shadow-sm hover:shadow-md transition-shadow duration-200">
            
            {/* Badge */}
            <div className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full mb-3 ${badge.color}`}>
                {badge.label}
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="text-base font-medium text-gray-800 pr-2 leading-snug">{title}</div>
                <div className="flex items-center gap-2 shrink-0">
                    <a href={link} target="_blank" className="text-gray-400 hover:text-purple-500 transition-colors">
                        <RedirectIcon/>
                    </a>
                    <div onClick={deleteContent} className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors">
                        <DeleteIcon/>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div>
                {type === "youtube" && (
                    <iframe
                        className="w-full rounded-lg"
                        src={
                            link.includes("youtu.be")
                                ? link.replace("youtu.be/", "www.youtube.com/embed/")
                                : link.replace("watch?v=", "embed/").split("&")[0]
                        }
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {type === "twitter" && (
                    <blockquote className="twitter-tweet">
                        <a href={link}></a>
                    </blockquote>
                )}

                {isLinkPreview(type) && (
                    <a href={link} target="_blank" className="block rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 transition-colors">
                        {preview?.image ? (
                            <img src={preview.image} alt={title} className="w-full h-36 object-cover"/>
                        ) : (
                            <div className="w-full h-24 bg-purple-50 flex items-center justify-center text-2xl">
                                {badge.label.split(" ")[0]}
                            </div>
                        )}
                        <div className="p-3">
                            {preview?.siteName && (
                                <p className="text-xs text-purple-500 font-medium mb-1">{preview.siteName}</p>
                            )}
                            <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                {preview?.title || title}
                            </p>
                            {preview?.description && (
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{preview.description}</p>
                            )}
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}