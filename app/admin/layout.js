// "use client";

// import { Layout, Menu } from "antd";
// import { UserOutlined, FileTextOutlined, SettingOutlined } from "@ant-design/icons";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useSession } from "next-auth/react";

// const { Header, Content, Sider } = Layout;

// export default function AdminLayout({ children }) {
//   const router = useRouter();
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (!session) {
//       router.push('/login');
//     }
//   }, [session, router]);

//   return (
//     <Layout className="fixed h-screen w-full top-0 z-[9999]" style={{ minHeight: "100vh" }}>
//       <Sider>
//         <div className="logo" />
//         <Menu theme="dark" mode="inline">
//           <Menu.Item key="1" icon={<FileTextOutlined />} onClick={() => router.push("/admin/content")}>
//             Управление контентом
//           </Menu.Item>
//           <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => router.push("/admin/seo")}>
//             SEO Настройки
//           </Menu.Item>
//           {session?.user?.role === 'superadmin' && (
//             <Menu.Item key="3" icon={<UserOutlined />} onClick={() => router.push("/admin/users")}>
//               Пользователи
//             </Menu.Item>
//           )}
//         </Menu>
//       </Sider>
//       <Layout className="site-layout">
//         <Header className="site-layout-background" style={{ padding: 0 }} />
//         <Content style={{ margin: "0 16px" }}>
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

"use client";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <Layout
      className="fixed h-screen w-full top-0 z-[9999]"
      style={{ minHeight: "100vh" }}
    >
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="4"
            icon={<FileTextOutlined />}
            onClick={() => router.push("/admin/content-management")}
          >
            Управление контентом
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<SettingOutlined />}
            onClick={() => router.push("/admin/analytics")}
          >
            Настройки аналитики
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={() => router.push("/admin/users")}
          >
            Пользователи
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
