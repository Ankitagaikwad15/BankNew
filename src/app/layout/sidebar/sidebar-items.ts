import { RouteInfo } from "./sidebar.metadata";

export const NEWUSERROUTES: RouteInfo[] = [
  {
    path: "franchise-bank",
    title: "Bank Details",
    moduleName: "franchise-bank",
    icon: "far fa-object-group",
    class: "",
    groupTitle: false,
    submenu: [],},
  {
    path: "transaction-history",
    title: "Transaction History",
    moduleName: "transaction-history",
    icon: "far fa-object-group",
    class: "",
    groupTitle: false,
    submenu: [],
  },
 
  {
    path: "transaction-money",
    title: "Transfer Money",
    moduleName: "#",
    icon: "fas fa-boxes",
    class: "",
    groupTitle: false,
    submenu: [],
  },
  {
    path: "profile",
    title: "My Profile",
    moduleName: "profile",
    icon: "fas fa-address-book",
    class: "",
    groupTitle: false,
    submenu: [],
  },
];

export const SUPPERUSERMENU: RouteInfo[] = [
 
  {
    path: "userclient",
    title: "Candidates",
    moduleName: "userclient",
    icon: "fas fa-graduation-cap",
    class: "",
    groupTitle: false,
    submenu: [],
  },

  ];