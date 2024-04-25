type MenuItem = {
  name: string;
  submenu: boolean;
  sublinks?: { name: string; link: string; onClick: (() => void) | null }[];
  link: {
      url: string;
      type: 'page' | 'anchorlink' | 'taglink';
  };

};



export const links: MenuItem[] = [
  {
    name: "Components",
    submenu: false,
    sublinks: [],
    link: {
      url:"/components-page",
      type:"page"
    },

  },
  {
    name: "Audits",
    submenu: true,
    sublinks: [{ name: "Cyberscope", link: "https://github.com/cyberscope-io/audits/blob/main/agata/audit.pdf", onClick: null },
    { name: "Checkdot", link: "https://audits.checkdot.io/Agata-Audit-CheckDot.pdf", onClick: null }
    ],

    link: {
      url:"https://github.com/cyberscope-io/kyc/blob/main/agata/kyc.png",
      type:'anchorlink'
    },
  
  },
  {
    name: "Whitepaper",
    submenu: false,
    sublinks: [{ name: "About us", link: "/about-us", onClick: null }],
    link: {
      url:"https://agatech.gitbook.io/agatech-whitepaper/",
      type:'anchorlink'
    },

  },
  {
    name: "Roadmap",
    submenu: false,
    sublinks: [{ name: "About us", link: "/about-us", onClick: null }],
    link: {
      url:"/#Roadmap",
      type:'taglink'
    },
    
  },
  {
    name: "FaQs",
    submenu: false,
    sublinks: [{ name: "About us", link: "/about-us", onClick: null }],
    link: {
      url:"/#FaQs",
      type:'taglink'
    },
  },
];
