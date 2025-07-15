/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import clsx from 'clsx';
import React from 'react'


interface SideBarProps {
    pathName: string;
    getOpenKey: any;
    items: any;
    isMobile: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function SideBar({ getOpenKey, items, pathName, isMobile, open, setOpen }: SideBarProps) {
    if (isMobile)
        return (
            <Drawer
                closable={false}
                className='*:!p-0'
                onClose={() => setOpen(false)}
                open={open}
                width={240}
            >
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[pathName]}
                    defaultOpenKeys={[getOpenKey()]}
                    mode="inline"
                    direction="rtl"
                    selectedKeys={[pathName]}
                    items={items}
                    className="!font-medium  min-h-screen !p-2 [&_.ant-menu-submenu-vertical]:[&_.ant-menu-item]:!flex"
                />
            </Drawer>
        )
    return <Sider
        collapsible
        className={clsx("!w-[25vw]")}
        width={240}
        collapsedWidth={80}
        breakpoint="md"

    >
        <div className="demo-logo-vertical" />
        <Menu
            theme="dark"
            defaultSelectedKeys={[pathName]}
            defaultOpenKeys={[getOpenKey()]}
            mode="inline"
            direction="rtl"
            selectedKeys={[pathName]}
            items={items}
            className="!font-medium !p-2 [&_.ant-menu-submenu-vertical]:[&_.ant-menu-item]:!flex"
        />
    </Sider>
}

export default SideBar