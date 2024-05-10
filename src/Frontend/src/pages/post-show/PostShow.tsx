// import { FC } from "react";
// import { Grid } from "@mui/material";
// import { postData } from "./dataPostShow";
// import Post from "./post/Post";
// import CommentBarComponents from "../../widgets/comment-bar-components/CommentBarComponents";
// import { commentsData } from "../../widgets/widgetData";
// import { usePostsStore } from "../../entities";
// import { postDataTypes } from "./dataPostShow.interface";
// const PostShow: FC<{ posts: any }> = ({ posts }) => {
//   return (
//     <>
//       <Grid container>
//         <Grid item sm={8}>
//           {posts &&
//             posts.map((item: postDataTypes) => {
//               return <Post key={item.id} dataObject={item}></Post>;
//             })}
//         </Grid>
//       </Grid>
//     </>
//   );
// };
// export default PostShow;

import { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { postData } from "./dataPostShow";
import Post from "./post/Post";
import CommentBarComponents from "../../widgets/comment-bar-components/CommentBarComponents";
import { commentsData } from "../../widgets/widgetData";
import { usePostsStore } from "../../entities";
import { FeedPostItem } from "../../widgets/home-feeds/home-post/FeedPostItem";
import { FeedPost } from "../../features/exportFeaturesComponents";
import { useParams } from "react-router-dom";
import CommentBarWindow from "../../widgets/comment-bar-components/commentBarWindow/CommentBarWindow";
const PostShow: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ currentPost, setCurrentPost] = useState<any>(null);
  const { getPost } = usePostsStore();

  const onResponse = (data: any, errors: string[]) => {

    if (errors.length == 0 && data != null) {
      setCurrentPost(data);

    }
  }

  useEffect(()=>
  {

    getPost(onResponse, id);
  }, [])

  return (
    <>
      <Grid container>
        <Grid item>
          {/* <Post dataObject={postData} /> */}
          { currentPost &&
          <FeedPostItem appearance={false} item={currentPost}></FeedPostItem>}
        </Grid>
      </Grid>
    </>
  );
};
export default PostShow;
