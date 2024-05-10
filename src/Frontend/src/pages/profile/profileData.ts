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
import ReviewsProfileItem1 from "../../assets/image/ReviewsProfileItem1.png";
import ReviewsProfileItem2 from "../../assets/image/ReviewsProfileItem2.png";
import StarProfileIten from "../../assets/image/StarProfileIten.png";
import Sertificate1 from "../../assets/image/Sertificate.png";
import Sertificate2 from "../../assets/image/Sertificate.png";
import Sertificate3 from "../../assets/image/Sertificate.png";
import Sertificate4 from "../../assets/image/Sertificate.png";
import onlineSwitch from "../../assets/image/onlineSwitch.png";
import Friend1 from "../../assets/image/Friend1.png";
import Friend2 from "../../assets/image/Friend2.png";
import ProfileItemPhoto from "../../assets/image/ProfileItemPhoto.png";
import { postDataTypes } from "../post-show/dataPostShow.interface";

export const userInfoData: any = {
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
      text: "Frederick II University of Naplessdsdds.",
    },
    {
      id: "2",
      icon: ProfileLovely,
      text: "www.snapfocus.com/annakorn",
    },
    {
      id: "3",
      icon: ProfileFlash,
      text: "In relationship with Michael Brickcdscsds",
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
    text: "posts",
  },
  {
    id: 2,
    text: "portfolio",
  },
  {
    id: 3,
    text: "friends",
  },
  {
    id: 4,
    text: "groups",
  },
  {
    id: 5,
    text: "photo",
  },
  {
    id: 6,
    text: "video",
  },
];

// export const profileItemData: postDataTypes[] = [
//   {
//     id: "user04259",
//     authorId: "d084d1e6-4aeb-47c4-b1a6-0f162ed2b701",
//     username: "User1",
//     profileImageUrl: "profile_image_url_1",
//     location: "Location 1",
//     category: "Category 1",
//     imageUrl: "image_url_1",
//     description: "This is the content of the first post.",
//     likesCount: 0,
//     comments: 0,
//     shares: 0,
//     title: "First Post",
//     attachment:
//       "U2FsdGVkX1/lcIs/BA5UHffIoa5qujd189NUbMkkIT78aZY1iCOXNPhseU2nf0bQdydSGMYOTegz72spoAFW+blimYyxPex8b/tzp3SfHOOmVeAvcPnvHr1iEcCzIBAaj6YhtG74yAniF1Fti2ecL4fNm0DniFOiqGHBJe8+pw7q4nBZp5FCOlejVgCnduuUEXiAHNNnecWUa9BD4SgBR7BScz0n7g4zdENq/GLNPMe4ZTPhsE2e6rwMh/U54s4d4dJh1g9KGLCq0Ddx6xaeQbFhEBrhR2ZaJGwF/vvMCnfSyZUlV2svr95HHmUsAqKW/7gygFJ/IZmh3X/WxZMhaSG9rgDZvC438OitQ5OFzOhXcO55xRBemn69Mwzf5kllmEHf0tPcf7kpiLzzqZ5p6bpjyKBuVD3CoQiL+VeVYBMEuiIimmdwob+5vQ9v2+vtJgkwkNqqPleTiMUcbMqp4uHG7knDrRaDj2mAgEgHGjC71E/KQqyCxqsI1in1bTp50OjtLiXjkVJmem7YslRGDzjj7j9noAxK70X6xW3AzHRD/xNQuAi9ptoU47ok+Gi7NlDz6AUaAS4xMwq9+t/3PXN1j9hrQzAAn1NW8lJlnuc7kfvf5B+Wo2CMGAZL2h6PCjFQvXk0EQIgQBxGkMJecIegIIYkKA4QsjTxWLG6nkXFth2gzDJAC5Oqvxw35aVS11tl8cli8kpLtx4Kqusl0vd4RPrg+EXKRTdcYZpJ682cr7xfcdGLA51zNlVeQ/tbDRicYro8c7i6ADeRG51mfMN21KLN5iVr1Ke/Osf13BNIn0+pulJMaTiNMjvz78pBUPdcyYUib+4bP8JlgOlLXJUGr7axEQuRSvDJTpfcqSXKGXJW+B6f91NpsjuLCJ+iFa9ToB6x9kVSogTu2dayFewZ/AtgkIvs0v9MKtzLmQ9Ixq0dxWym1grM70qhag21ayA17vnzCmu14A3NtmX3T5sS6RIgNOPEpuMVPHU6jrE4g+lF3/HEHuvOTBagzpUnqUk81l7wTxYJJ0j1IZCRnHEnJ9hc+2AbezPXoeCXe72+uHoFTscwJ5Sl9wkb/CP0cNhZZOrCgPnowoIxwlSL1BiJgLtrx+etpNfHytcWXNpKOXbIB7yJlBXp5tVsTRzlHjUYrnj/dBfztJX+HcnQv7vrlcoJ01c04PabzBU45/aI1po1fGiMNtgraMJqbG7vABKQ7I12qx7IZOB/Fy+JaB+Kqx9vhRqorxuqbu+tD7pbx8MC/uPLxUsbTTiW5jJvDInIjGPkayDg8Dd7bxW/xO5wyXnHJ7h6BdYddWt3BisTocWzQnwVFHDDOvB+HSThGxrPMScNMXEIi4DYnv5blPP9DclOVrDUkrsQ1Vm4tAwmKLhD+iPKGFylSdA1WtK7t+VSLoKh7FxnKRpRFi3eMovT8KmO8Z1XlnBVdeZQLWbYvluNJY3SgI99vG+0mGqcc4/LLGOHWiS0vua+jIJF4d6BKAfjQ6im4SEuVwcDi98aZlaDO7Rg6hjBXCEUydcXOYSgIJHj5OjPXfOG68fp90kT6R3dlHe9X7HvIJNbzzf8ZB+pkYPUQhGJkJJnJfyyZOfpYyq7Qg9KDO0IyrYlSpQ6Fmm75Zv/IDbKW/YKc1pbh/jtbwdCZqLVREDFvLy/V+So8mrtQbX9gquo6zyaAJFak+I6v+XXXa7Wl7SQ23Y=",
//     createdAt: "2024-04-27T00:00:00.000Z", // Provide a valid date string
//   },
//   {
//     id: "user04259",
//     authorId: "2a6f6099-0b2a-4b63-8d02-0d7dc60e9c95",
//     username: "User2",
//     profileImageUrl: "profile_image_url_2",
//     location: "Location 2",
//     category: "Category 2",
//     imageUrl: "image_url_2",
//     description: "This is the content of the second post.",
//     likesCount: 0,
//     comments: 0,
//     shares: 0,
//     title: "Second Post",
//     attachment:
//       "U2FsdGVkX1/lcIs/BA5UHffIoa5qujd189NUbMkkIT78aZY1iCOXNPhseU2nf0bQdydSGMYOTegz72spoAFW+blimYyxPex8b/tzp3SfHOOmVeAvcPnvHr1iEcCzIBAaj6YhtG74yAniF1Fti2ecL4fNm0DniFOiqGHBJe8+pw7q4nBZp5FCOlejVgCnduuUEXiAHNNnecWUa9BD4SgBR7BScz0n7g4zdENq/GLNPMe4ZTPhsE2e6rwMh/U54s4d4dJh1g9KGLCq0Ddx6xaeQbFhEBrhR2ZaJGwF/vvMCnfSyZUlV2svr95HHmUsAqKW/7gygFJ/IZmh3X/WxZMhaSG9rgDZvC438OitQ5OFzOhXcO55xRBemn69Mwzf5kllmEHf0tPcf7kpiLzzqZ5p6bpjyKBuVD3CoQiL+VeVYBMEuiIimmdwob+5vQ9v2+vtJgkwkNqqPleTiMUcbMqp4uHG7knDrRaDj2mAgEgHGjC71E/KQqyCxqsI1in1bTp50OjtLiXjkVJmem7YslRGDzjj7j9noAxK70X6xW3AzHRD/xNQuAi9ptoU47ok+Gi7NlDz6AUaAS4xMwq9+t/3PXN1j9hrQzAAn1NW8lJlnuc7kfvf5B+Wo2CMGAZL2h6PCjFQvXk0EQIgQBxGkMJecIegIIYkKA4QsjTxWLG6nkXFth2gzDJAC5Oqvxw35aVS11tl8cli8kpLtx4Kqusl0vd4RPrg+EXKRTdcYZpJ682cr7xfcdGLA51zNlVeQ/tbDRicYro8c7i6ADeRG51mfMN21KLN5iVr1Ke/Osf13BNIn0+pulJMaTiNMjvz78pBUPdcyYUib+4bP8JlgOlLXJUGr7axEQuRSvDJTpfcqSXKGXJW+B6f91NpsjuLCJ+iFa9ToB6x9kVSogTu2dayFewZ/AtgkIvs0v9MKtzLmQ9Ixq0dxWym1grM70qhag21ayA17vnzCmu14A3NtmX3T5sS6RIgNOPEpuMVPHU6jrE4g+lF3/HEHuvOTBagzpUnqUk81l7wTxYJJ0j1IZCRnHEnJ9hc+2AbezPXoeCXe72+uHoFTscwJ5Sl9wkb/CP0cNhZZOrCgPnowoIxwlSL1BiJgLtrx+etpNfHytcWXNpKOXbIB7yJlBXp5tVsTRzlHjUYrnj/dBfztJX+HcnQv7vrlcoJ01c04PabzBU45/aI1po1fGiMNtgraMJqbG7vABKQ7I12qx7IZOB/Fy+JaB+Kqx9vhRqorxuqbu+tD7pbx8MC/uPLxUsbTTiW5jJvDInIjGPkayDg8Dd7bxW/xO5wyXnHJ7h6BdYddWt3BisTocWzQnwVFHDDOvB+HSThGxrPMScNMXEIi4DYnv5blPP9DclOVrDUkrsQ1Vm4tAwmKLhD+iPKGFylSdA1WtK7t+VSLoKh7FxnKRpRFi3eMovT8KmO8Z1XlnBVdeZQLWbYvluNJY3SgI99vG+0mGqcc4/LLGOHWiS0vua+jIJF4d6BKAfjQ6im4SEuVwcDi98aZlaDO7Rg6hjBXCEUydcXOYSgIJHj5OjPXfOG68fp90kT6R3dlHe9X7HvIJNbzzf8ZB+pkYPUQhGJkJJnJfyyZOfpYyq7Qg9KDO0IyrYlSpQ6Fmm75Zv/IDbKW/YKc1pbh/jtbwdCZqLVREDFvLy/V+So8mrtQbX9gquo6zyaAJFak+I6v+XXXa7Wl7SQ23Y=",
//     createdAt: "2024-04-27T00:00:00.000Z", // Provide a valid date string
//   },
//   {
//     id: "user04259",
//     authorId: "b257a9e7-389d-45b2-8b42-990fa7c27b2f",
//     username: "User3",
//     profileImageUrl: "profile_image_url_3",
//     location: "Location 3",
//     category: "Category 3",
//     imageUrl: "image_url_3",
//     description: "This is the content of the third post.",
//     likesCount: 0,
//     comments: 0,
//     shares: 0,
//     title: "Third Post",
//     attachment:
//       "U2FsdGVkX1/lcIs/BA5UHffIoa5qujd189NUbMkkIT78aZY1iCOXNPhseU2nf0bQdydSGMYOTegz72spoAFW+blimYyxPex8b/tzp3SfHOOmVeAvcPnvHr1iEcCzIBAaj6YhtG74yAniF1Fti2ecL4fNm0DniFOiqGHBJe8+pw7q4nBZp5FCOlejVgCnduuUEXiAHNNnecWUa9BD4SgBR7BScz0n7g4zdENq/GLNPMe4ZTPhsE2e6rwMh/U54s4d4dJh1g9KGLCq0Ddx6xaeQbFhEBrhR2ZaJGwF/vvMCnfSyZUlV2svr95HHmUsAqKW/7gygFJ/IZmh3X/WxZMhaSG9rgDZvC438OitQ5OFzOhXcO55xRBemn69Mwzf5kllmEHf0tPcf7kpiLzzqZ5p6bpjyKBuVD3CoQiL+VeVYBMEuiIimmdwob+5vQ9v2+vtJgkwkNqqPleTiMUcbMqp4uHG7knDrRaDj2mAgEgHGjC71E/KQqyCxqsI1in1bTp50OjtLiXjkVJmem7YslRGDzjj7j9noAxK70X6xW3AzHRD/xNQuAi9ptoU47ok+Gi7NlDz6AUaAS4xMwq9+t/3PXN1j9hrQzAAn1NW8lJlnuc7kfvf5B+Wo2CMGAZL2h6PCjFQvXk0EQIgQBxGkMJecIegIIYkKA4QsjTxWLG6nkXFth2gzDJAC5Oqvxw35aVS11tl8cli8kpLtx4Kqusl0vd4RPrg+EXKRTdcYZpJ682cr7xfcdGLA51zNlVeQ/tbDRicYro8c7i6ADeRG51mfMN21KLN5iVr1Ke/Osf13BNIn0+pulJMaTiNMjvz78pBUPdcyYUib+4bP8JlgOlLXJUGr7axEQuRSvDJTpfcqSXKGXJW+B6f91NpsjuLCJ+iFa9ToB6x9kVSogTu2dayFewZ/AtgkIvs0v9MKtzLmQ9Ixq0dxWym1grM70qhag21ayA17vnzCmu14A3NtmX3T5sS6RIgNOPEpuMVPHU6jrE4g+lF3/HEHuvOTBagzpUnqUk81l7wTxYJJ0j1IZCRnHEnJ9hc+2AbezPXoeCXe72+uHoFTscwJ5Sl9wkb/CP0cNhZZOrCgPnowoIxwlSL1BiJgLtrx+etpNfHytcWXNpKOXbIB7yJlBXp5tVsTRzlHjUYrnj/dBfztJX+HcnQv7vrlcoJ01c04PabzBU45/aI1po1fGiMNtgraMJqbG7vABKQ7I12qx7IZOB/Fy+JaB+Kqx9vhRqorxuqbu+tD7pbx8MC/uPLxUsbTTiW5jJvDInIjGPkayDg8Dd7bxW/xO5wyXnHJ7h6BdYddWt3BisTocWzQnwVFHDDOvB+HSThGxrPMScNMXEIi4DYnv5blPP9DclOVrDUkrsQ1Vm4tAwmKLhD+iPKGFylSdA1WtK7t+VSLoKh7FxnKRpRFi3eMovT8KmO8Z1XlnBVdeZQLWbYvluNJY3SgI99vG+0mGqcc4/LLGOHWiS0vua+jIJF4d6BKAfjQ6im4SEuVwcDi98aZlaDO7Rg6hjBXCEUydcXOYSgIJHj5OjPXfOG68fp90kT6R3dlHe9X7HvIJNbzzf8ZB+pkYPUQhGJkJJnJfyyZOfpYyq7Qg9KDO0IyrYlSpQ6Fmm75Zv/IDbKW/YKc1pbh/jtbwdCZqLVREDFvLy/V+So8mrtQbX9gquo6zyaAJFak+I6v+XXXa7Wl7SQ23Y=",
//     createdAt: "2024-04-27T00:00:00.000Z", // Provide a valid date string
//   },
//   {
//     id: "user04259",
//     authorId: "a50745cd-5b17-4c89-b78c-6ad67ed4e8e4",
//     username: "User4",
//     profileImageUrl: "profile_image_url_4",
//     location: "Location 4",
//     category: "Category 4",
//     imageUrl: "image_url_4",
//     description: "This is the content of the fourth post.",
//     likesCount: 0,
//     comments: 0,
//     shares: 0,
//     title: "Fourth Post",
//     attachment:
//       "U2FsdGVkX1/lcIs/BA5UHffIoa5qujd189NUbMkkIT78aZY1iCOXNPhseU2nf0bQdydSGMYOTegz72spoAFW+blimYyxPex8b/tzp3SfHOOmVeAvcPnvHr1iEcCzIBAaj6YhtG74yAniF1Fti2ecL4fNm0DniFOiqGHBJe8+pw7q4nBZp5FCOlejVgCnduuUEXiAHNNnecWUa9BD4SgBR7BScz0n7g4zdENq/GLNPMe4ZTPhsE2e6rwMh/U54s4d4dJh1g9KGLCq0Ddx6xaeQbFhEBrhR2ZaJGwF/vvMCnfSyZUlV2svr95HHmUsAqKW/7gygFJ/IZmh3X/WxZMhaSG9rgDZvC438OitQ5OFzOhXcO55xRBemn69Mwzf5kllmEHf0tPcf7kpiLzzqZ5p6bpjyKBuVD3CoQiL+VeVYBMEuiIimmdwob+5vQ9v2+vtJgkwkNqqPleTiMUcbMqp4uHG7knDrRaDj2mAgEgHGjC71E/KQqyCxqsI1in1bTp50OjtLiXjkVJmem7YslRGDzjj7j9noAxK70X6xW3AzHRD/xNQuAi9ptoU47ok+Gi7NlDz6AUaAS4xMwq9+t/3PXN1j9hrQzAAn1NW8lJlnuc7kfvf5B+Wo2CMGAZL2h6PCjFQvXk0EQIgQBxGkMJecIegIIYkKA4QsjTxWLG6nkXFth2gzDJAC5Oqvxw35aVS11tl8cli8kpLtx4Kqusl0vd4RPrg+EXKRTdcYZpJ682cr7xfcdGLA51zNlVeQ/tbDRicYro8c7i6ADeRG51mfMN21KLN5iVr1Ke/Osf13BNIn0+pulJMaTiNMjvz78pBUPdcyYUib+4bP8JlgOlLXJUGr7axEQuRSvDJTpfcqSXKGXJW+B6f91NpsjuLCJ+iFa9ToB6x9kVSogTu2dayFewZ/AtgkIvs0v9MKtzLmQ9Ixq0dxWym1grM70qhag21ayA17vnzCmu14A3NtmX3T5sS6RIgNOPEpuMVPHU6jrE4g+lF3/HEHuvOTBagzpUnqUk81l7wTxYJJ0j1IZCRnHEnJ9hc+2AbezPXoeCXe72+uHoFTscwJ5Sl9wkb/CP0cNhZZOrCgPnowoIxwlSL1BiJgLtrx+etpNfHytcWXNpKOXbIB7yJlBXp5tVsTRzlHjUYrnj/dBfztJX+HcnQv7vrlcoJ01c04PabzBU45/aI1po1fGiMNtgraMJqbG7vABKQ7I12qx7IZOB/Fy+JaB+Kqx9vhRqorxuqbu+tD7pbx8MC/uPLxUsbTTiW5jJvDInIjGPkayDg8Dd7bxW/xO5wyXnHJ7h6BdYddWt3BisTocWzQnwVFHDDOvB+HSThGxrPMScNMXEIi4DYnv5blPP9DclOVrDUkrsQ1Vm4tAwmKLhD+iPKGFylSdA1WtK7t+VSLoKh7FxnKRpRFi3eMovT8KmO8Z1XlnBVdeZQLWbYvluNJY3SgI99vG+0mGqcc4/LLGOHWiS0vua+jIJF4d6BKAfjQ6im4SEuVwcDi98aZlaDO7Rg6hjBXCEUydcXOYSgIJHj5OjPXfOG68fp90kT6R3dlHe9X7HvIJNbzzf8ZB+pkYPUQhGJkJJnJfyyZOfpYyq7Qg9KDO0IyrYlSpQ6Fmm75Zv/IDbKW/YKc1pbh/jtbwdCZqLVREDFvLy/V+So8mrtQbX9gquo6zyaAJFak+I6v+XXXa7Wl7SQ23Y=",
//     createdAt: "2024-04-27T00:00:00.000Z", // Provide a valid date string
//   },
// ];

export const portfilioData = [
  {
    id: "1",
    reviewsUserAvatar: ReviewsProfileItem1,
    reviewsUserName: "Emily Brown",
    reviews:
      "Incredibly satisfied with the result of the photo session! The photographer skillfully used light and colors, creating a unique atmosphere in each photo. He successfully entered our atmosphere and was able to capture the best moments.",
    reviewsStar: [
      { id: "1", image: StarProfileIten },
      { id: "2", image: StarProfileIten },
      { id: "3", image: StarProfileIten },
      { id: "4", image: StarProfileIten },
      { id: "5", image: StarProfileIten },
    ],
  },
  {
    id: "2",
    reviewsUserAvatar: ReviewsProfileItem2,
    reviewsUserName: "Emily Brown",
    reviews:
      "This photographer is a true master of his craft! He managed to capture the best moments of our important event, creating wonderful images that will remind us of this day for a long time. ",
    reviewsStar: [
      { id: "1", image: StarProfileIten },
      { id: "2", image: StarProfileIten },
      { id: "3", image: StarProfileIten },
      { id: "4", image: StarProfileIten },
      { id: "5", image: StarProfileIten },
    ],
  },
];

export const setificateData = [
  { id: "1", image: Sertificate1 },
  { id: "2", image: Sertificate2 },
  { id: "3", image: Sertificate3 },
  { id: "4", image: Sertificate4 },
];

export const friendData = [
  {
    id: "1",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "2",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "3",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "4",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "5",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "6",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "7",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "8",
    name: "Phill Kopf",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "9",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "10",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "11",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "12",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "13",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "14",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "15",
    name: "Lara Moss",
    avatar: Friend1,
    online: true,
    onlineSwitch: onlineSwitch,
  },
  {
    id: "16",
    name: "Phill Kopf",
    avatar: Friend2,
    online: false,
    onlineSwitch: onlineSwitch,
  },
];

export const imageData = [
  {
    id: "1",
    imgPath1:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
    imgPath2:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
  },
  {
    id: "2",
    imgPath1:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
    imgPath2:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
  },
  {
    id: "3",
    imgPath1:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
    imgPath2:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
  },
  {
    id: "4",
    imgPath1:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
    imgPath2:
      "https://i.pinimg.com/474x/17/37/54/173754e80e276003674225580f32f9c5.jpg",
  },
];

export const sliderData = [
  {
    id: "1",
    videoPath1: "https://sparkling-article.com/s.mp4",
    videoPath2: "https://sparkling-article.com/s.mp4",
  },
  {
    id: "2",
    videoPath1: "https://sparkling-article.com/s.mp4",
    videoPath2: "https://sparkling-article.com/s.mp4",
  },
  {
    id: "3",
    videoPath1: "https://sparkling-article.com/s.mp4",
    videoPath2: "https://sparkling-article.com/s.mp4",
  },
  {
    id: "4",
    videoPath1: "https://sparkling-article.com/s.mp4",
    videoPath2: "https://sparkling-article.com/s.mp4",
  },
];
