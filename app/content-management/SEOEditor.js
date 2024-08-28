"use client";

import { useState, useEffect } from "react";
import { Input, Button, Form, message } from "antd";
import {
  updateContentBySlug,
  fetchContentBySlug,
} from "@/app/_utils/contentService";

export default function SEOEditor({ slug }) {
  const [seoData, setSeoData] = useState({
    title: "",
    description: "",
    keywords: "",
    icon: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSEOData() {
      try {
        const content = await fetchContentBySlug(slug);
        setSeoData(content.seo || {});
      } catch (error) {
        message.error("Failed to load SEO data");
      }
    }
    fetchSEOData();
  }, [slug]);

  const validateSEOData = () => {
    if (seoData.title.length === 0 || seoData.description.length === 0) {
      message.error("Title and Description are required.");
      return false;
    }
    if (seoData.title.length > 60) {
      message.error("Title is too long. Maximum length is 60 characters.");
      return false;
    }
    if (seoData.description.length > 160) {
      message.error(
        "Description is too long. Maximum length is 160 characters."
      );
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateSEOData()) return;

    setLoading(true);
    try {
      await updateContentBySlug(slug, { seo: seoData });
      message.success("SEO data updated successfully");
    } catch (error) {
      message.error("Failed to update SEO data");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSeoData({
      title: initialSEOData.title || "",
      description: initialSEOData.description || "",
      keywords: initialSEOData.keywords || "",
      icon: initialSEOData.icon || "",
      canonical: initialSEOData.canonical || "",
      ogTitle: initialSEOData.ogTitle || "",
      ogDescription: initialSEOData.ogDescription || "",
      ogImage: initialSEOData.ogImage || "",
    });
    message.info("SEO data has been reset.");
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Title">
        <Input
          value={seoData.title}
          onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input
          value={seoData.description}
          onChange={(e) =>
            setSeoData({ ...seoData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Keywords">
        <Input
          value={seoData.keywords}
          onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Icon URL">
        <Input
          value={seoData.icon}
          onChange={(e) => setSeoData({ ...seoData, icon: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Canonical URL">
        <Input
          value={seoData.canonical}
          onChange={(e) =>
            setSeoData({ ...seoData, canonical: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Open Graph Title">
        <Input
          value={seoData.ogTitle}
          onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Open Graph Description">
        <Input
          value={seoData.ogDescription}
          onChange={(e) =>
            setSeoData({ ...seoData, ogDescription: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Open Graph Image URL">
        <Input
          value={seoData.ogImage}
          onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={handleReset}>
          Reset
        </Button>
        <Button type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
