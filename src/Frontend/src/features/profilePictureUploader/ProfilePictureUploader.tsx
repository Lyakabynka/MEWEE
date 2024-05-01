import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { encryptImage } from "../../entities/sharedStores/post-utils";
import { useAuthStore } from "../../entities";

const ProfilePictureUploader = () => {
  const [image, setImage] = useState<string | null>(null);
const {updateProfile} = useAuthStore();
  const handleDrop = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      // Handle rejected files if needed
      return;
    }
    
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        const encryptedData = await encryptImage(result);
        setImage(encryptedData);
        updateProfile(onResponse, encryptedData);
        
      }
    };

    reader.readAsDataURL(file);
  };
  const onResponse = (errors: string[]) => {

    console.log(errors);
  };
  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {image ? (
            <img src={image} alt="Uploaded" style={imageStyle} />
          ) : (
            <p>+</p>
          )}
        </div>
      )}
    </Dropzone>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "5px",
  margin:"5px",
  textAlign: "center",
  cursor: "pointer",
  
};

const imageStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "200px",
  marginTop: "20px",
  
};

export default ProfilePictureUploader;
