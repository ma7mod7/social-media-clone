import { PostForm } from '@/_auth/forms/PostForm'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router';

export const EditPost = () => {
    const { id } = useParams();
  const {data:post}=useGetPostById(id)
  console.log(post)
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm action="Update" post={post}  />
      </div>
    </div>  )
}
