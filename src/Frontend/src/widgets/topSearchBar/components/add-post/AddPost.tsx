import {FC, useEffect, useRef, useState} from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { ReactComponent as IconPlus } from "../../images/icon_plus.svg";
import { ReactComponent as IconClose } from"../../../../assets/image/icons/IconClose.svg";
import { ReactComponent as AddIcon } from "../../../../assets/image/icons/AddIcon.svg";
import { ReactComponent as SizeIcon } from "../../../../assets/image/icons/SizeIcon.svg";
import { ReactComponent as ZoomIcon } from     "../../../../assets/image/icons/ZoomIcon.svg";
import { ReactComponent as IconOriginal } from "../../../../assets/image/icons/IconOriginal.svg";
import { ReactComponent as Icon1x1 } from      "../../../../assets/image/icons/Icon1x1.svg";
import { ReactComponent as Icon4x5 } from      "../../../../assets/image/icons/Icon4x5.svg";
import { ReactComponent as Icon16x9 } from     "../../../../assets/image/icons/Icon16x9.svg";
import { ReactComponent as IconAdd } from "../../../../assets/image/icons/IconAdd.svg";
import { ReactComponent as SizeModalButton } from "../../../../assets/image/icons/SizeModalButton.svg";
import AddItem from "../../../../assets/image/AddItem.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import EmojiIcon from "../../../../assets/image/icons/EmojiIcon.svg";
import Dropzone from "react-dropzone";
import ImageModal2 from "../../../../assets/image/ImageModal2.png";
import CommentWriterAvatar from "../../../../assets/image/CommentWriterAvatar.png";
import styles from "./add_post.module.scss";
import { EnumProfileType, useAuthStore, usePostsStore } from "../../../../entities";
import {decryptImage, encryptImage} from "../../../../entities/sharedStores/post-utils";
import ReactCrop, {centerCrop, makeAspectCrop, Crop,
  PixelCrop, convertToPixelCrop,} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {canvasPreview} from "./canvasPreview";
import {useDebounceEffect} from "./useDebounceEffect";
import {imgPreview} from "./imgPreview";
import {useTranslation} from "react-i18next";
import {boolean} from "yup";
import DecryptedImg from "../../../../pages/profile/DecryptedImg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    paddingTop: theme.spacing(1),
    backgroundColor: "var(--mainPage_post_addPost_background)",
  },
}));

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
  return centerCrop(
      makeAspectCrop(
          {
            unit: '%',
            width: 100,
          },
          aspect,
          mediaWidth,
          mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
  )
}

type ModalStates = {
  [key: string]: boolean;
};
const initialModalStates: ModalStates = {
  modal1: false,
  modal2: false,
  modal3: false,
};


const AddPost: FC <{username:string, avatar:string, id:string, type?:EnumProfileType}> = ({
  username,
  avatar,
  id,
  type = EnumProfileType.User
}) => {

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [encryptedImage, setEncryptedImage] = useState<string>("");
  const { createPost } = usePostsStore();
  const [modalStates, setModalStates] = useState<ModalStates>(initialModalStates);
  const { t } = useTranslation();
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [aspect, setAspect] = useState<number | undefined>()
  const [croppedSrc, setCroppedSrc] = useState<string | null>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextAreaValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const MIN_HEIGHT = 300;

  const openModal2 = (modalId: string) => {
    setModalStates(prevState => {
      const updatedStates: ModalStates = {};
      Object.keys(prevState).forEach(key => {
        if (key !== modalId) {
          updatedStates[key] = false;
        }
      });
      updatedStates[modalId] = !prevState[modalId];
      return updatedStates;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setInputValue(event.target.value);
    } else if (name === "content") {
      setContent(value);
      setTextAreaValue(event.target.value);
    }
    else if (name === "location") {
      setLocation(value);
    }
    else if (name === "category") {
      setCategory(value);
    }
  };

  const handleSubmit = async () => {
    if(croppedSrc != null){
      createPost(onResponse, { authorId: id??"", title: title, content: content, attachment: encryptedImage, location: location, category: ((type === EnumProfileType.User?"User":"Group")+"_"+ category), type: 1 });
      closeModal();
    }
    else{
      console.log('croppedSrc error!');
    }
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
        const img = new Image();
        img.onload = function() {
          if (img.height < MIN_HEIGHT) {
            console.log('Изображение слишком маленькое.');
            return;
          }

          setImage(result);
          encryptAndSetImage(result);
        };
        img.src = result;
      }
    };

    reader.readAsDataURL(file); // Конвертирует файл в base64
  };

  const handleClickConvert = async (src: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);
      const encryptedData = await encryptImage(base64);
      setEncryptedImage(encryptedData);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('Не вдалося перетворити дані зображення в base64');
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const encryptAndSetImage = async (imageData: string) => {
    const encryptedData = await encryptImage(imageData);
    setEncryptedImage(encryptedData);
  };

  const openModal = (step: number) => {
    setCurrentStep(step);
  };

  const closeModal = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  function handleSetAspectClick(aspect: number | undefined) {
    if (aspect === undefined) {
      if (imgRef.current) {
        const {width, height} = imgRef.current;
        const maxAspectRatio = width / height;
        setAspect(maxAspectRatio);
        const newCrop = centerAspectCrop(width, height, maxAspectRatio);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
      return;
    }

    setAspect(aspect);

    if (imgRef.current) {
      const {width, height} = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }

  const debouncedFunction = async () => {
    if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current
    ) {
      const src = await imgPreview(
          imgRef.current,
          completedCrop,
          scale,
      );
      setCroppedSrc(src);
    }
  };
  useDebounceEffect(debouncedFunction, 100, [completedCrop, scale]);
  const [value, setValue] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    setScale(Number(e.target.value));
  };
  return (
      <>
        <div className={styles.div_add} onClick={() => { setIsActive(true); openModal(1); setImage(null) }}>
          <IconPlus style={{color: isActive ? "#FBA500" : ""}}/>
        </div>

        {/* МОДАЛЬНОЕ ОКНО ШАГ 1 */}
        <BootstrapDialog onClose={closeModal} open={currentStep === 1}>
          <DialogActions>
            <div className={styles.modal_item1} >
              <div>
                <Dropzone
                    onDrop={handleDrop}
                    accept={{ "image/*": [] }} // Исправленный тип accept
                >
                  {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <h1>{t("create_post")}</h1>
                        <div>{image == null ? <img src={AddItem}/> : ""}</div>
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
              {image == null &&
                  <h4>
                    {t("drag_1")} <br/> {t("drag_2")}
                  </h4>
              }
              {image !== null &&
                  <button onClick={() => openModal(2)}>{t("next")}</button>}
            </div>
          </DialogActions>
          <div className={styles.icon}>
            <IconClose onClick={closeModal} style={{position: "absolute", width:"18px",
              height: '18px', top: "0.7rem", right: "0.7rem"}} />
          </div>
        </BootstrapDialog>

        {/* МОДАЛЬНОЕ ОКНО ШАГ 2 */}
        <BootstrapDialog onClose={closeModal} open={currentStep === 2}>
          <DialogActions>
            <div className={styles.modal_item2}>
              <div>
                <div onClick={() => {
                  openModal(1);
                  setImage(null)
                }} >
                  <ArrowLeftIcon className={styles.icon}/>
                </div>
                <h2>{t("create_post")}</h2>
                <div>
                  <IconClose onClick={closeModal} className={styles.icon}/>
                </div>
              </div>
              <div>
                <div className={styles.div_img_container}>
                <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      // minWidth={400}
                      minHeight={300}
                      style={{userSelect: 'none'}}

                  >
                    <img
                        onClick={() => handleSetAspectClick(undefined)}
                        ref={imgRef}
                        alt="Crop me"
                        src={String(image)}
                        onLoad={() => handleSetAspectClick(undefined)}
                        style={{transform: `scale(${scale})`}}
                    />
                  </ReactCrop>
                </div>
                {modalStates.modal1 && (
                    <div className={styles.modal_size}>
                      <div onClick={() => handleSetAspectClick(undefined)}>
                        <div><IconOriginal/></div>
                        <div>{t("original")}</div>
                      </div>
                      <div onClick={() => handleSetAspectClick(1)}>
                        <div><Icon1x1 /></div>
                        <div>1:1</div>
                      </div>
                      <div onClick={() => handleSetAspectClick(4 / 5)}>
                        <div><Icon4x5 /></div>
                        <div>4:5</div>
                      </div>
                      <div onClick={() => handleSetAspectClick(16 / 9)}>
                      <div><Icon16x9 /></div>
                        <div>16:9</div>
                      </div>
                    </div>)}
                <div className={styles.div_size} onClick={() => openModal2('modal1')}>
                  <SizeIcon/>
                </div>
                {modalStates.modal2 && (
                    <div className={styles.modal_dandruff}>
                      <div className={styles.wrapper}>
                        <input type="range" min="1" max="2" step="0.1" value={value} onChange={handleChange}/>
                        <div style={{width: `${(value - 1) * 100}%`}}></div>
                      </div>
                    </div>)}
                <div className={styles.div_dandruff} onClick={() => {openModal2('modal2')}}>
                  <ZoomIcon/>
                </div>
                {modalStates.modal3 && (
                    <div className={styles.modal_complete}>
                      {!!completedCrop && (
                          <div>
                            <img
                                ref={previewImageRef}
                                src={String(croppedSrc)}
                                style={{
                                  objectFit: 'contain',
                                  width: completedCrop.width,
                                  height: completedCrop.height,
                                }}
                            />
                          </div>
                      )}
                      <div onClick={() => {
                        if(croppedSrc != null) {
                          handleClickConvert(croppedSrc);
                        }
                        openModal(3)
                      }}><AddIcon/></div>
                    </div>)}
                <div className={styles.div_complete}
                     onClick={() => {
                       debouncedFunction()
                       openModal2('modal3')
                     }}>
                  <SizeModalButton />
                </div>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
        {/* МОДАЛЬНОЕ ОКНО ШАГ 3 */}
        <BootstrapDialog onClose={closeModal} open={currentStep === 3} maxWidth={"md"} style={{padding: "0"}}>
          <DialogActions>
            <div className={styles.modal_item3}>
              <div className={styles.modal_header}>
                <div>
                  <ArrowLeftIcon className={styles.icon} onClick={() => openModal(2)}/>
                </div>
                <h2>{t("create_post")}</h2>
                <div>
                  <IconAdd className={styles.icon} onClick={handleSubmit}/>
                </div>
                {/*<LibraryAddIcon />*/}
              </div>
              <div className={styles.modal_item_content}>
                <div>
                  {typeof image === 'string' ? <img src={String(croppedSrc)} /> : null}
                </div>
                <div>
                  <form>
                    <div className={styles.user}>
                      <DecryptedImg className={styles.profile_avatar} content={avatar} borderRadius="50%"></DecryptedImg>
                      <h3>{username}</h3>
                    </div>
                    <div className={styles.title_input}>
                      <img src={EmojiIcon}/>
                      <label className={styles.label}>
                        <input type="text" name="title" onChange={handleInputChange}
                               placeholder={t("write_headline_placeholder")} maxLength={150}/>
                      </label>
                      <div><span>{inputValue.length} / 150</span></div>
                    </div>
                    <div className={styles.all_input}>
                      <div className={styles.textarea_div}>
                        <img src={EmojiIcon}/>
                        <label className={styles.label_textarea}>
                          <textarea className={styles.textarea} onChange={handleInputChange} name="content"
                                    placeholder={t("write_description_placeholder")} maxLength={5000}/>
                        </label>
                        <div><span>{textareaValue.length} / 5000</span></div>
                      </div>
                      <div>
                      <label className={styles.label}>
                          <input type="text" name="location" onChange={handleInputChange}
                                 placeholder={t("write_location_placeholder")}/>
                        </label>
                        <label className={styles.label} style={{marginTop: "1rem"}}>
                          <input type="text" name="category" onChange={handleInputChange}
                                 placeholder={t("write_category_placeholder")}/>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
      </>
  );
};

export default AddPost;
