/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Layout } from "antd";

import LogOut from "./header-logout";
import { items, routes } from "./sidebar-menu-data";
import SideBar from "./drawer-sider";
import { Icon } from "@iconify/react/dist/iconify.js";
import ErrorBoundaryWrapper from "@/components/error-component/ErrorBoundary";
import NotFoundComponent from "@/components/notFound-components/not-found-component";
import { useLocation } from "react-router";
const { Header, Content } = Layout;
const logoUrl = "./dashboard-logo.webp";
const LayoutWarper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const getOpenKey = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openItem = items.find((item: any) => {
      if (item.children) {
        const find = item.children.find((child: any) => child.key == pathname);
        if (find) {
          return item;
        }
      }
    });
    if (openItem) return openItem.key as string;
    return "2";
  };
  const findActiveKey = (): string | undefined => {
    return routes.find((item) => item.path === pathname)?.title;
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const tmp = window.innerWidth <= 768;
        setIsMobile(tmp);
      };
      handleResize(); // Call the handler immediately on page load
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <Layout
      className="  !font-medium "
      style={{ height: "100vh", direction: "rtl", fontFamily: "Medium" }}
    >
      <SideBar
        getOpenKey={getOpenKey}
        open={collapsed}
        setOpen={setCollapsed}
        isMobile={isMobile}
        items={items}
        pathName={pathname}
      />
      <Layout>
        <Header className="w-full " style={{ padding: 0, background: "white" }}>
          <div className="w-full flex items-center ">
            <div className="w-full flex items-center gap-4 h-[64px] pr-4">
              {isMobile && (
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  color="default"
                  variant="text"
                  icon={<Icon icon={"pajamas:hamburger"} />}
                ></Button>
              )}
              <img src={logoUrl} width={40} height={40} alt="logo" />
              <span className="h-8 border-r border-primary"></span>

              <h1
                key={findActiveKey()}
                className="lg:text-xl text-base  font-medium translate-x-4 animate-fadeRight"
              >
                {findActiveKey() && findActiveKey()}
              </h1>
            </div>
            <LogOut />
          </div>
        </Header>
        <Content
          className="!w-full !h-[calc(100%-2rem)] overflow-y-auto custome-scrool-bar max-lg:!p-0"
          style={{ padding: "0 24px", minHeight: 280 }}
        >
          <ErrorBoundaryWrapper
            fallback={<NotFoundComponent title="متاسفیم خطایی رخ داده است." />}
          >
            {children}
          </ErrorBoundaryWrapper>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWarper;
