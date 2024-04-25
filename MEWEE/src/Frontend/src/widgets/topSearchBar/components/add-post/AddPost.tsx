import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddItem from "../../../../assets/image/AddItem.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SizeModalButton from "../../../../assets/image/icons/SizeModalButton.svg";
import EmojiIcon from "../../../../assets/image/icons/EmojiIcon.svg";
import Dropzone from "react-dropzone";
import ImageModal2 from "../../../../assets/image/ImageModal2.png";
import CommentWriterAvatar from "../../../../assets/image/CommentWriterAvatar.png";
import styles from "./add_post.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    paddingTop: theme.spacing(1),
    backgroundColor: "rgba(133, 148, 255, 0.5)",
  },
}));

const AddPost: FC = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [modal1, setModal1] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);

  const openModal = (step: number) => {
    setCurrentStep(step);
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setCurrentStep(0);
  };

  const handleClickOpenModal1 = () => {
    setModal1(true);
  };

  const handleClickOpenModal2 = () => {
    setModal1(false);
    setModal2(true);
  };

  const handleCloseModal1 = () => {
    setModal1(false);
  };

  const handleCloseModal2 = () => {
    setModal2(false);
  };

  const handleCloseModal3 = () => {
    setModal3(false);
  };

  const handleStep2 = () => {
    setModal2(false);
    setModal3(true);
  };

  const handleBack2 = () => {
    setModal1(true);
    setModal2(false);
  };

  const handleBack3 = () => {
    setModal2(true);
    setModal3(false);
  };

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
    <>
      <div className={styles.div_add} onClick={() => openModal(1)}>
        <AddIcon style={{ color: "black" }} />
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
            <button onClick={() => openModal(2)}>Вибрати з присторою</button>
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
              <div onClick={() => openModal(1)}>
                <ArrowLeftIcon />
              </div>
              <h2>Створення </h2>
            </div>
            <div>
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
              <LibraryAddIcon />
            </div>
            <div className={styles.modal_item_content}>
              <div>
                <img src={ImageModal2} />
              </div>
              <form>
                <div className={styles.user}>
                  <img src={CommentWriterAvatar} />
                  <h3>Nataly</h3>
                </div>
                <div className={styles.title_input}>
                  <img src={EmojiIcon} />
                  <input type="text" />
                </div>
                <div className={styles.all_input}>
                  <div className={styles.textarea_div}>
                    <img src={EmojiIcon} />
                    <textarea placeholder="Введите ваш текст здесь" />
                  </div>
                  <div>
                    <input type="text" />
                    <input type="text" />
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
