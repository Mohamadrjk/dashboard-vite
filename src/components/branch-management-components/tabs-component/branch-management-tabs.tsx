"use client";

import React, { lazy } from "react";
import type { TabsProps } from "antd";
// Loaders
import GeneralTabPanel from "./GeneraTabPanel";
// lazy Imports
const CategoryTabContent = lazy(
  () => import("../categories-tab/category-tab-content")
);
const ProductTabContent = lazy(
  () => import("../product-tab/product-tab-content")
);
const MenuTabContent = lazy(() => import("../menu-tab/menu-tab-content"));
const BranchTabContent = lazy(
  () => import("../branch-tab/branch-tab-content")
);

const tabs: TabsProps["items"] = [
  {
    key: "1",
    className: "!w-full",
    label: "شعبه",
    children: <BranchTabContent />,
  },
  {
    key: "2",
    className: "!w-full",
    label: "دسته بندی",
    children: <CategoryTabContent />,
  },
  {
    key: "3",
    className: "!w-full",
    label: "محصولات",
    children: <ProductTabContent />,
  },
  {
    key: "4",
    className: "!w-full",
    label: "منو",
    children: <MenuTabContent />,
  },
];

const BranchManagementTabs: React.FC = () => (
  <div className=" px-4  ">
    <GeneralTabPanel
      items={tabs}
    />
  </div>
);

export default BranchManagementTabs;
