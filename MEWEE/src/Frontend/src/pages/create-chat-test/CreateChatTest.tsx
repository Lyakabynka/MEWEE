import React, { FC, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import { useChatStore } from "../../entities";

const CreateChatTest: FC = () => {
  
    const { createChat } = useChatStore();

  const handleSubmit = () => {
    createChat(onResponse, "88905280-e2cd-4d11-b0af-a4793fe2c6cf");
  };

  const onResponse = (errors: string[]) => {
    console.log(errors);
    if (errors.length === 0) console.log("all good");
  };

  return (
    <Grid container spacing={2}>
      <Button onClick={handleSubmit}>OK</Button>
    </Grid>
  );
};

export default CreateChatTest;
