// Team section on the home page (/#team). Groups render in this order.
// Photos live in /public/headshots and are cropped to 4:5 by the card, so any portrait works.
//
// The old site also listed Former Analysts (Azam Ahmed, Michael Breibart, Prabhjit Singh,
// Tanmay Thorat, Piyush Patel, Abhinav Reddy, Krishv Chivukula, Abdullah Mehmood).
// Their headshots are already in /public/headshots; add a group here to show them.

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
};

export type TeamGroup = {
  title: string;
  members: TeamMember[];
};

export const TEAM: TeamGroup[] = [
  {
    title: "Founders",
    members: [
      {
        name: "Isaac Howe",
        role: "Co-Founder",
        photo: "/headshots/isaac-howe.webp",
        linkedin: "https://www.linkedin.com/in/isaac-howe-000235327/",
      },
      {
        name: "Aden Almonte",
        role: "Co-Founder",
        photo: "/headshots/aden-almonte.webp",
        linkedin: "https://www.linkedin.com/in/adenalmonte/",
      },
    ],
  },
  {
    title: "Associates",
    members: [
      {
        name: "Julia Lee",
        role: "Associate",
        photo: "/headshots/julia-lee.webp",
        linkedin: "https://www.linkedin.com/in/aa987235b/",
      },
      {
        name: "Atula Ravi",
        role: "Associate",
        photo: "/headshots/atula-ravi.webp",
        linkedin: "https://www.linkedin.com/in/atula-ravi-447627306/",
      },
      {
        name: "Mohammad Saqib",
        role: "Associate",
        photo: "/headshots/mohammad-saqib.webp",
        linkedin: "https://www.linkedin.com/in/mohammad-najmus-saqib-974aba382/",
      },
      {
        name: "Yuta Chen",
        role: "Associate",
        photo: "/headshots/yuta-chen.webp",
        linkedin: "https://www.linkedin.com/in/kaceyyuta-chen/",
      },
    ],
  },
  {
    title: "Analysts",
    members: [
      {
        name: "Armaan Mehta",
        role: "Analyst",
        photo: "/headshots/armaan-mehta.webp",
        linkedin: "https://www.linkedin.com/in/armaan-mehta-14061b2b6/",
      },
      {
        name: "Esat Acikgoz",
        role: "Analyst",
        photo: "/headshots/esat-acikgoz.webp",
        linkedin: "https://www.linkedin.com/in/esat-acikgoz-15b97727a/",
      },
      {
        name: "Nandini Chittor",
        role: "Analyst",
        photo: "/headshots/nandini-chittor.webp",
        linkedin: "https://www.linkedin.com/in/nandini-chittor/",
      },
      {
        name: "Arnik Narang",
        role: "Analyst",
        photo: "/headshots/arnik-narang.webp",
        linkedin: "https://www.linkedin.com/in/arniknarang/",
      },
      {
        name: "Pamela Shao",
        role: "Analyst",
        photo: "/headshots/pamela-shao.webp",
        linkedin: "https://www.linkedin.com/in/pamela-shao-2847492a7/",
      },
      {
        name: "David Ji",
        role: "Analyst",
        photo: "/headshots/david-ji.webp",
        linkedin: "https://www.linkedin.com/in/david-ji-464470322/",
      },
      {
        name: "Youssef Mahmoud",
        role: "Analyst",
        photo: "/headshots/youssef-mahmoud.webp",
        linkedin: "https://www.linkedin.com/in/youssef-mahmoud-0a1934385/",
      },
      {
        name: "Shakti Parmar",
        role: "Analyst",
        photo: "/headshots/shakti-parmar.webp",
        linkedin: "https://www.linkedin.com/in/shakti-parmar/",
      },
      {
        name: "Nidhi Reddy",
        role: "Analyst",
        photo: "/headshots/nidhi-reddy.webp",
        linkedin: "https://www.linkedin.com/in/nidhi-reddy1029/",
      },
      {
        name: "Arsh Shah",
        role: "Analyst",
        photo: "/headshots/arsh-shah.webp",
        linkedin: "https://www.linkedin.com/in/arsh-s-59361a251/",
      },
      {
        name: "Ryan George",
        role: "Analyst",
        photo: "/headshots/ryan-george.webp",
        linkedin: "https://www.linkedin.com/in/ryan-george1228/",
      },
      {
        name: "Neev Mohindroo",
        role: "Analyst",
        photo: "/headshots/neev-mohindroo.webp",
        linkedin: "https://www.linkedin.com/in/neev-mohindroo-2021a4282/",
      },
    ],
  },
  {
    title: "Advisors",
    members: [
      {
        name: "Yusuf Sallam",
        role: "Advisor",
        photo: "/headshots/yusuf-sallam.webp",
        linkedin: "https://www.linkedin.com/in/yusuf-sallam/",
      },
      {
        name: "Kaustubh Baskaran",
        role: "Advisor",
        photo: "/headshots/kaustubh-baskaran.webp",
        linkedin: "https://www.linkedin.com/in/kaustubh-baskaran/",
      },
    ],
  },
];
