
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import type { Models } from 'appwrite';
import { useState } from 'react';


type PostStatsProps = {
    post: Models.Document & { likes?: Models.Document[] };
    userId: string;
};

export const PostStats = ({ post, userId }: PostStatsProps) => {
    const { data: currentUser } = useGetCurrentUser();
    const { mutate: likePost } = useLikePost()
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();

    const likesList = post.likes?.map((user: Models.Document) => user.$id) || [];
    console.log(post.$id)
    const savedPostRecord = currentUser?.saves.find(
        
        (record: Models.Document) => ((record.posts?.$id === post.$id))
    );
    console.log(savedPostRecord)

    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);


    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    }

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavePost(savedPostRecord.$id);
        }

        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
    }
    return (
        <div
            className={`flex justify-between items-center z-20 `}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId)
                        ? "/assets/icons/liked.svg"
                        : "/assets/icons/like.svg"
                        }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    )
}
