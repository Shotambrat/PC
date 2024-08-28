"use client";

import { useState } from 'react';
import { Upload, Button, Form, message } from 'antd';
import { updateContentBySlug } from '@/app/_utils/contentService';
import { UploadOutlined } from '@ant-design/icons';

export default function ImageEditor({ slug, initialImage }) {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateContentBySlug(slug, { image });
      message.success('Image updated successfully');
    } catch (error) {
      message.error('Failed to update image');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (file) => {
    // Здесь можно добавить обработку изображения (например, обрезку)
    setImage(file);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Upload Image">
        <Upload
          listType="picture"
          beforeUpload={handleUpload}
          maxCount={1}
          showUploadList={{ showPreviewIcon: false }}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
