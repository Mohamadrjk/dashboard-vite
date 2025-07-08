import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

const LogOut = () => {
  const cookie = new Cookies()
  const navigate = useNavigate();
  const onLogOut = () => {
    message.info(`نشست شما به پایان رسید`);
    localStorage.removeItem("expires-time");
    cookie.remove("token");
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: "ادمین",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "خروج",
      key: "2",
      icon: <LogoutOutlined />,
      onClick: () => onLogOut(),
    },
  ];

  return (
    <div className="pl-8 ">
      <Dropdown
        menu={{ items }}
        overlayClassName="!font-regular"
        overlayStyle={{
          direction: "rtl",
        }}
      >
        <div
          dir="rtl"
          className=" !font-medium  !whitespace-nowrap !text-base lg:!text-lg !flex items-center gap-2 cursor-pointer"
        >
          حساب کاربری
          <DownOutlined className="!h-max " />
        </div>
      </Dropdown>
    </div>
  );
};

export default LogOut;
