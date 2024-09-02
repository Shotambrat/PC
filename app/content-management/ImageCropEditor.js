// app/content-management/ImageCropEditor.js
"use client";

import { useState } from "react";
import { Upload, Button, Form, message, Modal, Progress } from "antd";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { updateContentBySlug } from "@/app/_utils/сontentServiсe";
import { UploadOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";

export default function ImageCropEditor({ slug, initialImage }) {
  const [image, setImage] = useState(initialImage);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file) => {
    const reader = new FileReader();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (percent) => setUploadProgress(percent),
    };

    try {
      const compressedFile = await imageCompression(file, options);
      reader.onload = () => {
        setImage(reader.result);
        setModalVisible(true);
        setUploadProgress(100); // Устанавливаем 100%, когда загрузка завершена
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      message.error("Image compression failed.");
    }
  };

  const handleCropComplete = (crop) => {
    setPreview(crop);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateContentBySlug(slug, { image: preview || image });
      message.success("Image updated successfully");
      setModalVisible(false);
    } catch (error) {
      message.error("Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Upload Image">
        <Upload
          listType="picture"
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
          maxCount={1}
          showUploadList={{ showPreviewIcon: false }}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Form.Item>

      {uploadProgress > 0 && (
        <Progress percent={uploadProgress} status={uploadProgress < 100 ? "active" : "success"} />
      )}

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="Save"
        cancelText="Cancel"
      >
        <ReactCrop
          src={image}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
        />
      </Modal>

      <Form.Item>
        <Button type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
