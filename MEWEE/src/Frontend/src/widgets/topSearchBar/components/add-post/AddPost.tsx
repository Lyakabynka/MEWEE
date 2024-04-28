import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as IconPlus } from "../../images/icon_plus.svg";
import AddItem from "../../../../assets/image/AddItem.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SizeModalButton from "../../../../assets/image/icons/SizeModalButton.svg";
import EmojiIcon from "../../../../assets/image/icons/EmojiIcon.svg";
import Dropzone from "react-dropzone";
import ImageModal2 from "../../../../assets/image/ImageModal2.png";
import CommentWriterAvatar from "../../../../assets/image/CommentWriterAvatar.png";
import styles from "./add_post.module.scss";
import { useAuthStore, usePostsStore } from "../../../../entities";
import { encryptImage } from "../../../../entities/sharedStores/post-utils";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    paddingTop: theme.spacing(1),
    backgroundColor: "rgba(133, 148, 255, 0.5)",
  },
}));

const AddPost: FC = () => {

  const { username } = useAuthStore();
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [encryptedImage, setEncryptedImage] = useState<string>("");
  const { createPost } = usePostsStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
    else if (name === "location") {
      setLocation(value);
    }
    else if (name === "category") {
      setCategory(value);
    }
  };


  const handleSubmit = () => {
    createPost(onResponse, { title: title, content: content, attachment: encryptedImage, location: location, category: category });
  };

  const onResponse = (errors: string[]) => {
    console.log(errors);
    if (errors.length === 0) console.log("all good");
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // первый файл из списка
    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const result = e.target ? e.target.result : null; // Проверка на null
      if (result !== null && typeof result === "string") {
        // Проверка на тип
        setImage(result);
        const encryptedData = await encryptImage(result);
        setEncryptedImage(encryptedData);
      }
    };

    reader.readAsDataURL(file); // Конвертирует файл в base64
  };




  const openModal = (step: number) => {
    setCurrentStep(step);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setCurrentStep(0);
  };
  return (
    <>
      <div className={styles.div_add} onClick={() => { openModal(1); setImage(null) }}>
        <IconPlus/>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ШАГ 1 */}
      <BootstrapDialog onClose={closeModal} open={currentStep === 1}>
        <DialogActions>
          <div className={styles.modal_item1}>
            <div>
              <Dropzone
                onDrop={handleDrop}
                accept={{ "image/*": [] }} // Исправленный тип accept
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <h1>Створення посту</h1>
                    {image == null ? <img src={AddItem} /> : ""}
                    <input {...getInputProps()} />
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
            <h4>
              Перетягніть сюди <br /> фото або відео
            </h4>
            {image !== null &&
              <button onClick={() => openModal(2)}>Далі</button>}
          </div>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </BootstrapDialog>

      {/* МОДАЛЬНОЕ ОКНО ШАГ 2 */}
      <BootstrapDialog onClose={closeModal} open={currentStep === 2}>
        <DialogActions>
          <div className={styles.modal_item2}>
            <div>
              <div onClick={() => { openModal(1); setImage(null) }}>
                <ArrowLeftIcon />
              </div>
              <h2>Створення </h2>
            </div>
            <div style={{ backgroundImage: `url(${image})` }}>
              <div>
                <img src={SizeModalButton} onClick={() => openModal(3)} />
              </div>
            </div>
          </div>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </BootstrapDialog>
      {/* МОДАЛЬНОЕ ОКНО ШАГ 3 */}
      <BootstrapDialog onClose={closeModal} open={currentStep === 3}>
        <DialogActions>
          <div className={styles.modal_item3}>
            <div className={styles.modal_header}>
              <div onClick={() => openModal(2)}>
                <ArrowLeftIcon />
              </div>
              <h2>Створення посту </h2>
              <LibraryAddIcon onClick={handleSubmit} />
            </div>
            <div className={styles.modal_item_content}>
              <div>
                {typeof image === 'string' ? <img src={image} /> : null}
              </div>
              <form>
                <div className={styles.user}>
                  <img src={CommentWriterAvatar} />
                  <h3>{username}</h3>
                </div>
                <div className={styles.title_input}>
                  <img src={EmojiIcon} />
                  <input type="text" name="title" onChange={handleInputChange} placeholder="Title..." />
                </div>
                <div className={styles.all_input}>
                  <div className={styles.textarea_div}>
                    <img src={EmojiIcon} />
                    <input placeholder="Введите ваш текст здесь" name="content" onChange={handleInputChange} />
                  </div>
                  <div>
                    <input type="text" name="location" onChange={handleInputChange} placeholder="Location..." />
                    <input type="text" name="category" onChange={handleInputChange}  placeholder="Category..." />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default AddPost;
