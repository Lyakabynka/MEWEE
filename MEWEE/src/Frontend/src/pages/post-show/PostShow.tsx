import { FC } from "react";
import { Grid } from "@mui/material";
import { postData } from "./dataPostShow";
import Post from "./post/Post";
import CommentBarComponents from "../../widgets/comment-bar-components/CommentBarComponents";
import { commentsData } from "../../widgets/widgetData";
import { usePostsStore } from "../../entities";
const PostShow: FC = () => {

  const { posts } = usePostsStore();

  return (
    <>
      <Grid container>
        <Grid sm={8}>
          {/* <Post dataObject={postData} /> */}
          <Post dataObject={posts} />
        </Grid>
        <Grid sm={4}>
          {/* <CommentBarComponents
            commentDataRender={commentsData}
            appearance={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
export default PostShow;




// import { FC } from "react";
// import { Grid } from "@mui/material";
// import { postData } from "./dataPostShow";
// import Post from "./post/Post";
// import CommentBarComponents from "../../widgets/comment-bar-components/CommentBarComponents";
// import { commentsData } from "../../widgets/widgetData";
// import { usePostsStore } from "../../entities";
// const PostShow: FC = () => {

//   const { posts } = usePostsStore();

//   return (
//     <>
//       <Grid container>
//         <Grid sm={8}>
//           {/* <Post dataObject={postData} /> */}
//           <Post dataObject={posts} />
//         </Grid>
//         <Grid sm={4}>
//           <CommentBarComponents
//             commentDataRender={commentsData}
//             appearance={false}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// };
// export default PostShow;
