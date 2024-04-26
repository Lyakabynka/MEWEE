import ProfileAvatar from "../../assets/image/ProfileAvatar.png";
import ProfilePortfolio from "../../assets/image/icons/ProfilePortfolio.svg";
import ProfileLovely from "../../assets/image/icons/ProfileLovely.svg";
import ProfileFlash from "../../assets/image/icons/ProfileFlash.svg";
import ProfileGallery1 from "../../assets/image/ProfileGallery.png";
import ProfileGallery2 from "../../assets/image/ProfileGallery.png";
import ProfileGallery3 from "../../assets/image/ProfileGallery.png";
import ProfileGallery4 from "../../assets/image/ProfileGallery.png";
import ProfileGallery5 from "../../assets/image/ProfileGallery.png";
import ProfileGallery6 from "../../assets/image/ProfileGallery.png";

export const userInfoData = {
  id: "1",
  avatar: ProfileAvatar,
  userName: "Anna Korn",
  lockal: "Italy",
  subscribers: "13K",
  subscriptions: "35",
  education: [
    {
      id: "1",
      icon: ProfilePortfolio,
      text: "Frederick II University of Naples.",
    },
    {
      id: "2",
      icon: ProfileLovely,
      text: "www.snapfocus.com/annakorn",
    },
    {
      id: "3",
      icon: ProfileFlash,
      text: "In relationship with Michael Bricks",
    },
  ],
  gallery: [
    { image: ProfileGallery1 },
    { image: ProfileGallery2 },
    { image: ProfileGallery3 },
    { image: ProfileGallery4 },
    { image: ProfileGallery5 },
    { image: ProfileGallery6 },
  ],
};

export const profileButtonsData = [
  {
    id: 1,
    text: "Пости",
  },
  {
    id: 2,
    text: "Портфоліо",
  },
  {
    id: 3,
    text: "Друзі",
  },
  {
    id: 4,
    text: "Групи",
  },
  {
    id: 5,
    text: "Фото",
  },
  {
    id: 6,
    text: "Відео",
  },
];

export const profileItemData = [
  {
    id: "e2dd5a4f-bebd-4061-9017-5790eda4f1a8",
    title: "First Post",
    content: "This is the content of the first post.",
    attachment: "attachment_url_1",
    userId: "d084d1e6-4aeb-47c4-b1a6-0f162ed2b701",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "e2dd5a4f-bebd-4061-9017-5790eda4f1a9",
    title: "Second Post",
    content: "This is the content of the second post.",
    attachment: "attachment_url_2",
    userId: "2a6f6099-0b2a-4b63-8d02-0d7dc60e9c95",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "ce06ed13-fbcb-432a-a8b2-4fb0596e1d56",
    title: "Third Post",
    content: "This is the content of the third post.",
    attachment: "attachment_url_3",
    userId: "b257a9e7-389d-45b2-8b42-990fa7c27b2f",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3e193ff6-1b86-4513-8032-cb8b0d34f1c5",
    title: "Fourth Post",
    content: "This is the content of the fourth post.",
    attachment: "attachment_url_4",
    userId: "a50745cd-5b17-4c89-b78c-6ad67ed4e8e4",
    createdAt: "",
    updatedAt: "",
  },
];
