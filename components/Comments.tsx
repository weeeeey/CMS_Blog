import { getComments, Comment } from "../services";
import { useState, useEffect } from "react";

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>();
    useEffect(() => {
        (async () => {
            const data = await getComments();
            setComments(data);
        })();
    }, []);

    return (
        <div className=" bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="mb-2 text-xl font-semibold border-b pb-4">
                {comments?.length} Comments
            </h3>
            <div className="space-y-4 ">
                {comments?.map((c) => (
                    <div key={c.email} className="text-lg">
                        <div className="flex space-x-2 items-center mb-2">
                            <div className="font-semibold border-r-2 pr-2 ">
                                {c.name}
                            </div>

                            {c.createdAt === c.updatedAt ? (
                                <span className="align-middle text-sm">
                                    {new Date(c.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                        }
                                    )}
                                </span>
                            ) : (
                                <div className="space-x-2 text-sm">
                                    <span className="align-middle  ">
                                        {new Date(
                                            c.updatedAt
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                        })}
                                    </span>
                                    <span className="font-light">(수정됨)</span>
                                </div>
                            )}
                        </div>
                        <div>{c.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
