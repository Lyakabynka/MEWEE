import GroupPageImage1 from "../../assets/image/GroupPageImage1.png";
import GroupPageImage2 from "../../assets/image/GroupPageImage2.png";
import GroupPageImage3 from "../../assets/image/GroupPageImage3.png";
import GroupPageImage4 from "../../assets/image/GroupPageImage4.png";
import GroupPageImage5 from "../../assets/image/GroupPageImage5.png";
import GroupPageImage6 from "../../assets/image/GroupPageImage6.png";
import GroupPageImage7 from "../../assets/image/GroupPageImage7.png";
import GroupPageImage8 from "../../assets/image/GroupPageImage8.png";
import GroupPageImage9 from "../../assets/image/GroupPageImage9.png";
import GroupPageImage10 from "../../assets/image/GroupPageImage10.png";
import GroupPageImage11 from "../../assets/image/GroupPageImage11.png";
import GroupPageImage12 from "../../assets/image/GroupPageImage12.png";

import { useTranslation } from "react-i18next";

export const dataSideBar = () => {
  const { t } = useTranslation();

  const sideBarData  = [
    {
      id: 1,
      url: "#",
      text: t('interesting'),
      category: 'Interesting',
    },
    {
      id: 2,
      url: "#",
      text: t('groups_friends'),
      category: 'FriendsGroups',
    },
    {
      id: 3,
      url: "#",
      text: t('entertainment'),
      category: 'Entertainment',
    },
    {
      id: 4,
      url: "#",
      text: t('policy'),
      category: 'Policy',
    },
    {
      id: 5,
      url: "#",
      text: t('music'),
      category: 'Music',
    },
    {
      id: 6,
      url: "#",
      text: t('unions'),
      category: 'Unions',
    },
    {
      id: 7,
      url: "#",
      text: t('education'),
      category: 'Education',
    },
  ];

  return sideBarData;
};

export const dataGroupItem = [
  {
    id: 1,
    img: GroupPageImage1,
    title: "Вебінари| англійська",
    participants: "165",
  },
  {
    id: 2,
    img: GroupPageImage2,
    title: "Digital art",
    participants: "1 201",
  },
  {
    id: 3,
    img: GroupPageImage3,
    title: "Туристичні місця",
    participants: "456",
  },
  {
    id: 4,
    img: GroupPageImage4,
    title: "Cute & Soft",
    participants: "11 665",
  },
  {
    id: 5,
    img: GroupPageImage5,
    title: "HBO movies/TV shovs",
    participants: "23 900",
  },
  {
    id: 6,
    img: GroupPageImage6,
    title: "Волонтерський Хаб",
    participants: "5 789",
  },
  {
    id: 7,
    img: GroupPageImage7,
    title: "Home renovations",
    participants: "8 123",
  },
  {
    id: 8,
    img: GroupPageImage8,
    title: "Фріланс Україна",
    participants: "19 1999",
  },
  {
    id: 9,
    img: GroupPageImage9,
    title: "Кемпінг й Туризм",
    participants: "2345",
  },
  {
    id: 10,
    img: GroupPageImage10,
    title: "Садові ельфійки",
    participants: "445",
  },
  {
    id: 11,
    img: GroupPageImage11,
    title: "Architecture nerds",
    participants: "165",
  },
  {
    id: 12,
    img: GroupPageImage12,
    title: "Фольк",
    participants: "165",
  },
];
