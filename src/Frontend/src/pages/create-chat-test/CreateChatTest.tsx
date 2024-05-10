import React, { FC, useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import CryptoJS from "crypto-js";
import { useAuthStore, useChatStore } from "../../entities";

const CreateChatTest: FC = () => {
  
  const {id} = useAuthStore();
    const { createChat } = useChatStore();

  const handleSubmit = () => {

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
