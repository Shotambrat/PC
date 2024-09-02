// app/admin/content-management/ContentManagementPage.js
"use client"

import { useState, useEffect } from 'react';
import { message, Tabs } from 'antd';
import axios from 'axios';
import TextEditor from '@/app/content-management/TextEditor';
import SEOEditor from '@/app/content-management/SEOEditor';
import ImageCropEditor from '@/app/content-management/ImageCropEditor';

export default function ContentManagementPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await axios.get('/api/content/home-page');
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load content');
      }
    }
    fetchContent();
  }, []);

  return (
    <div>
      <h1>Content Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Text" key="1">
            <TextEditor slug="home-page" initialContent={content.content} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="SEO" key="2">
            <SEOEditor slug="home-page" initialSEOData={content.seo} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Image" key="3">
            <ImageCropEditor slug="home-page" initialImage={content.image} />
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
}
