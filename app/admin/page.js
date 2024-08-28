"use client";

import { useState, useEffect } from "react";
import { Input, Button, Form, message } from "antd";
import axios from "axios";

export default function AdminDashboard() {
  const [footerText, setFooterText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get("/api/content/footer");
        setFooterText(response.data?.content || "");
      } catch (error) {
        message.error("Failed to fetch content");
      }
    }
    fetchContent();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put("/api/content/footer", { content: footerText });
      message.success("Content updated successfully");
    } catch (error) {
      message.error("Failed to update content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Управление контентом</h1>
      <Form layout="vertical">
        <Form.Item label="Текст в футере">
          <Input.TextArea
            rows={4}
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSave} loading={loading}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}