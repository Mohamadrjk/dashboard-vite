import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MenuProps } from "antd";
import { Link } from "react-router";


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  className?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem(
    "داشبورد",
    "/",
    <Link to={"/dashboard"}>
      <PieChartOutlined width={"2rem"} />
    </Link>
  ),
  getItem(
    "تحلیل مشتری",
    "2",

    <Link to={"/Gender-sales"}>
      <TeamOutlined width={"2rem"} />
    </Link>,

    [
      getItem(
        "تحلیل منطقه‌ای ",
        "/Gender-sales",
        <Link to={"/Gender-sales"}>
          <TeamOutlined width={"2rem"} />
        </Link>,
        undefined,
        " !pr-2"
      ),
      // getItem(
      //   "تحلیل رفتار خرید ",
      //   "/customer-purchase-category",
      //   <Link to={"/customer-purchase-category"}>
      //     <TeamOutlined width={"2rem"} />
      //   </Link>,
      //   undefined,
      //   " !pr-2"
      // ),
      getItem(
        "سطح وفاداری ",
        "/customer-loyalty-level",
        <Link to={"/customer-loyalty-level"}>
          <Icon
            icon="stash:users-crown-light"
            width="18"
            height="18"
            style={{ color: "inherit" }}
          />
        </Link>,
        undefined,
        " !pr-2"
      ),
      getItem(
        "تحلیل تعامل ",
        "/customer-Interactions",
        <Link to={"/customer-Interactions"}>
          <TeamOutlined width={"2rem"} />
        </Link>,
        undefined,
        " !pr-2"
      ),
      getItem(
        "گزارشات آماری",
        "/statistical-reports",
        <Link to={"/statistical-reports"}>
          <TeamOutlined width={"2rem"} />
        </Link>,
        undefined,
        " !pr-2"
      ),
    ],
    "!rounded"
  ),
  getItem(
    "تحلیل کالا",
    "3",
    <Link to={"/goods-sales-terms"}>
      <Icon icon="lsicon:goods-outline" width="24" height="24" />
    </Link>,
    [
      getItem(
        "وضعیت کلی فروش کالا",
        "/goods-sales-terms",
        <Link to={"/goods-sales-terms"}>
          <TeamOutlined width={"2rem"} />
        </Link>
      ),
      getItem(
        "عملکرد کالاها",
        "/product-performance",
        <Link to={"/product-performance"}>
          <TeamOutlined width={"2rem"} />
        </Link>
      ),
    ]
  ),
  getItem(
    "تحلیل فروش",
    "4",
    <Link to={"/goods-sales-terms"}>
      <Icon icon="ic:outline-sell" width="24" height="24" />
    </Link>,
    [
      getItem(
        "عملکرد کلی فروش",
        "/overall-sales-performance",
        <Link to={"/overall-sales-performance"}>
          <Icon
            icon="grommet-icons:document-performance"
            width="20"
            height="20"
          />
        </Link>
      ),
      getItem(
        "فروش محصولات و خدمات",
        "/Selling-products-and-services",
        <Link to={"/Selling-products-and-services"}>
          <Icon icon="mdi:report-multiple" width="20" height="20" />
        </Link>
      ),
      getItem(
        "مشتریان کلیدی",
        "/key-accounts",
        <Link to={"/key-accounts"}>
          <Icon icon="mdi:user-key-outline" width="20" height="20" />
        </Link>
      ),
    ]
  ),
  getItem(
    "مدیریت باشگاه",
    "5",
    <Link to={"/club-levels-managment"}>
      <Icon icon="fluent-mdl2:team-favorite" width="20" height="20" />
    </Link>,
    [
      getItem(
        "پیکربندی کسب و کار",
        "/club-settings",
        <Link to={"/club-settings"}>
          <Icon
            icon="mdi:mobile-phone-settings-variant"
            width="24"
            height="24"
          />
        </Link>
      ),
      getItem(
        "تنظیمات سطح‌بندی",
        "/club-levels-managment",
        <Link to={"/club-levels-managment"}>
          <Icon icon="ph:ranking-light" width="24" height="24" />
        </Link>
      ),
      getItem(
        "تنظیمات نظرسنجی",
        "/club-surveys-managment",
        <Link to={"/club-surveys-managment"}>
          <Icon icon="lucide:star" width="24" height="24" />
        </Link>,
        undefined
      ),
    ],
    "!rounded"
  ),
  getItem(
    "مدیریت منو",
    "6",
    <Link to={"/branch-management"}>
      {/* <MenuManagementIcon /> */}
    </Link>,
    [
      getItem(
        " پیکربندی منو ",
        "/branch-management",
        <Link to={"/branch-management"}>
          {/* <ConfigurationIcon /> */}
        </Link>,
        undefined,
        " !pr-2"
      ),
      getItem(
        "تنظیمات منو ",
        "/menu-settings",
        <Link to={"/menu-settings"}>
          {/* <ConfigurationIcon /> */}
        </Link>,
        undefined,
        " !pr-2"
      ),
    ]
  ),
];

export const routes = [
  {
    title: "داشبورد",
    path: "/",
  },
  {
    title: "تحلیل مشتری",
    path: "2",
  },
  {
    title: "تحلیل منطقه‌ای",
    path: "/Gender-sales",
  },
  {
    title: "تحلیل رفتار خرید",
    path: "/customer-purchase-category",
  },
  {
    title: "سطح وفاداری",
    path: "/customer-loyalty-level",
  },
  {
    title: "تحلیل تعامل",
    path: "/customer-Interactions",
  },
  { title: "مدیریت شعب ", path: "/branch-management" },
  {
    title: "گزارشات آماری",
    path: "/statistical-reports",
  },
  {
    title: "وضعیت کلی فروش کالا",
    path: "/goods-sales-terms",
  },
  {
    title: "عملکرد کالاها",
    path: "/product-performance",
  },
  {
    title: "عملکرد کلی فروش",
    path: "/overall-sales-performance",
  },
  {
    title: "فروش محصولات و خدمات",
    path: "/Selling-products-and-services",
  },
  {
    title: "مشتریان کلیدی",
    path: "/key-accounts",
  },
  {
    title: "تنظیمات کسب و کار",
    path: "/club-settings",
  },
  {
    title: "تنظیمات سطح‌بندی",
    path: "/club-levels-managment",
  },
  {
    title: "تنظیمات نظرسنجی",
    path: "/club-surveys-managment",
  },
];
