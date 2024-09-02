// app/login/page.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Form, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const token = await userCredential.user.getIdToken();

      document.cookie = `token=${token}; path=/`;
      message.success("Успешный вход");
      router.push("/admin");
    } catch (error) {
      message.error("Неправильный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      <h2>Вход в систему</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Введите email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Введите пароль" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
