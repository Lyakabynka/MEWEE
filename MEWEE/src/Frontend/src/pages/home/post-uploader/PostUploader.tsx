import React, { FC, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import { usePostsStore } from "../../../entities";
import { encryptImage } from "../../../entities/sharedStores/post-utils";

const PostUploader: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [encryptedImage, setEncryptedImage] = useState<string>("");
  const { createPost } = usePostsStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);

      const encryptedData = "";
      setEncryptedImage(encryptedData);

      handleSubmit();
    }
  };

  const handleSubmit = () => {
    createPost(onResponse, { title: title, content: content, attachment: encryptedImage });
  };

  const onResponse = (errors: string[]) => {
    console.log(errors);
    if (errors.length === 0) console.log("all good");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="content"
          name="content"
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple={false}
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="encrypted-image"
          label="Encrypted Image"
          variant="outlined"
          fullWidth
          multiline
          value={encryptedImage}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default PostUploader;
