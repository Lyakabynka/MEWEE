import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddItem from "../../../../assets/image/AddItem.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SizeModalButton from "../../../../assets/image/icons/SizeModalButton.svg";
import styles from "./add_post.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    paddingTop: theme.spacing(1),
    backgroundColor: "rgba(133, 148, 255, 0.5)",
  },
}));

const AddPost: FC = () => {
  const [modal1, setModal1] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);

  const handleClickOpenModal1 = () => {
    setModal1(true);
  };

  const handleClickOpenModal2 = () => {
    setModal1(false);
    setModal2(true);
  };

  const handleClickOpenModal3 = () => {
    setModal1(true);
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

  const handleStep3 = () => {
    setModal2(false);
    setModal3(true);
  };
  return (
    <>
      <button onClick={handleClickOpenModal1}>
        <AddIcon style={{ color: "black" }} />
      </button>

      {/* МОДАЛЬНОЕ ОКНО ШАГ 1 */}
      <BootstrapDialog onClose={handleCloseModal1} open={modal1}>
        <DialogActions>
          <div className={styles.modal_item1}>
            <h1>Створення посту</h1>
            <img src={AddItem} />
            <h4>
              Перетягніть сюди <br /> фото або відео
            </h4>
            <button onClick={handleClickOpenModal2}>Вибрати з присторою</button>
          </div>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal1}
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
      <BootstrapDialog onClose={handleCloseModal2} open={modal2}>
        <DialogActions>
          <div className={styles.modal_item2}>
            <div>
              <div>
                <ArrowLeftIcon />
              </div>
              <h2>Створення </h2>
            </div>
            <div>
              <div>
                <img src={SizeModalButton} onClick={handleStep3} />
              </div>
            </div>
          </div>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal2}
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
      <BootstrapDialog onClose={handleCloseModal3} open={modal3}>
        <DialogActions>
          <div className={styles.modal_item2}>
            <div>
              <div>
                <ArrowLeftIcon />
              </div>
              <h2>Створенняsdl cnsdlkmc sdmlk c </h2>
            </div>
            <div></div>
          </div>
        </DialogActions>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal3}
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
    </>
  );
};

export default AddPost;
