import { FC } from "react";
import { Grid } from "@mui/material";
import { postData } from "./dataPostShow";
import Post from "./post/Post";
import CommentBarComponents from "../../widgets/comment-bar-components/CommentBarComponents";
const PostShow: FC = () => {
  return (
    <>
      <Grid container>
        <Grid sm={8}>
          <Post dataObject={postData} />
        </Grid>
        <Grid sm={4}>
          <CommentBarComponents appearance={false} />
        </Grid>
      </Grid>
    </>
  );
};
export default PostShow;
