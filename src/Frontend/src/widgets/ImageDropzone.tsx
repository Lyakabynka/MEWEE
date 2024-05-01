import React, { useState } from "react";
import Dropzone from "react-dropzone"; // Зависимости для Dropzone

const ImageDropzone: React.FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // первый файл из списка
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target ? e.target.result : null; // Проверка на null
      if (result !== null && typeof result === "string") {
        // Проверка на тип
        setImage(result);
      }
    };

    reader.readAsDataURL(file); // Конвертирует файл в base64
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [] }} // Исправленный тип accept
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <p>Перетащите сюда изображение или кликните для загрузки</p>
          </div>
        )}
      </Dropzone>
      {image && (
        <img
          src={image as string}
          alt="uploaded"
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default ImageDropzone;
