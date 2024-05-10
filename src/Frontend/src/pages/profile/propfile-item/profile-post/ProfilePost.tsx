import { FC, useEffect } from "react";
import { FeedPost } from "../../../../features/exportFeaturesComponents";
import { usePostsStore } from "../../../../entities";

const ProfilePost: FC<{ id: string }> = ({ id }) => {
  const { posts, getPosts } = usePostsStore();

  const onResponse = (errors: string[]) => {
    if (errors.length == 0) {
      console.log("POSTS FOR " + id + " loaded.");
    }
  };

  useEffect(() => {
    getPosts(onResponse, id);
  }, []);

  return (
    <>
      <FeedPost posts={posts} />
    </>
  );
};

export default ProfilePost;
