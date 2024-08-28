"use client";

import { useState } from "react";
import { Input, Button, Form, message, Modal } from "antd";
import { updateContentBySlug } from "@/app/_utils/contentService";

export default function TextEditor({ slug, initialContent }) {
  const [text, setText] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const validateText = (text) => {
    if (text.length < 10) {
      message.error("Text is too short. Minimum length is 10 characters.");
      return false;
    }
    if (text.length > 500) {
      message.error("Text is too long. Maximum length is 500 characters.");
      return false;
    }
    if (/[^a-zA-Z0-9\s.,!?]/.test(text)) {
      message.error("Text contains invalid characters.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateText(text)) return;

    setLoading(true);
    try {
      await updateContentBySlug(slug, { text });
      message.success("Content updated successfully");
      setPreviewVisible(false);
    } catch (error) {
      message.error("Failed to update content");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText(initialContent);
    message.info("Changes have been reset.");
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Content Text">
        <Input.TextArea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
        <Button type="default" onClick={() => setPreviewVisible(true)}>
          Preview
        </Button>
        <Button
          type="primary"
          onClick={handleSave}
          loading={loading}
          style={{ marginLeft: "8px" }}
        >
          Save
        </Button>
      </Form.Item>

      <Modal
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
      >
        <h2>Preview:</h2>
        <p>{text}</p>
      </Modal>
    </Form>
  );
}
