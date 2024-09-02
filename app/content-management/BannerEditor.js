// app/admin/banners/BannerEditor.js
import { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

export default function BannerEditor({ bannerId }) {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bannerId) {
      async function fetchBanner() {
        try {
          const response = await axios.get(`/api/banners/${bannerId}`);
          setBanner(response.data);
          setLoading(false);
        } catch (error) {
          message.error('Failed to load banner');
        }
      }
      fetchBanner();
    }
  }, [bannerId]);

  const handleSave = async (values) => {
    try {
      if (bannerId) {
        await axios.put(`/api/banners/${bannerId}`, values);
        message.success('Banner updated successfully');
      } else {
        await axios.post('/api/banners', values);
        message.success('Banner created successfully');
      }
    } catch (error) {
      message.error('Failed to save banner');
    }
  };

  return (
    <div>
      <h1>{bannerId ? 'Edit Banner' : 'Create Banner'}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form onFinish={handleSave} initialValues={banner}>
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="subtitle" label="Subtitle">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload listType="picture" beforeUpload={() => false} defaultFileList={[{
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: banner?.image,
            }]}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="buttonText" label="Button Text">
            <Input />
          </Form.Item>
          <Form.Item name="buttonLink" label="Button Link">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
