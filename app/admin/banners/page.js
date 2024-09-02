// app/admin/banners/BannerManagementPage.js
"use client"

import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BannerManagementPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get('/api/banners');
        setBanners(response.data);
      } catch (error) {
        message.error('Failed to load banners');
      }
    }
    fetchBanners();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Subtitle', dataIndex: 'subtitle', key: 'subtitle' },
    { title: 'Actions', key: 'actions', render: (_, record) => (
      <>
        <Button onClick={() => handleEdit(record._id)}>Edit</Button>
        <Button type="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
      </>
    )}
  ];

  const handleEdit = (id) => {
    router.push(`/admin/banners/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/banners/${id}`);
      setBanners(banners.filter(banner => banner._id !== id));
      message.success('Banner deleted successfully');
    } catch (error) {
      message.error('Failed to delete banner');
    }
  };

  return (
    <div>
      <h1>Manage Banners</h1>
      <Button type="primary" onClick={() => router.push('/admin/banners/new')}>Create New Banner</Button>
      <Table columns={columns} dataSource={banners} rowKey="_id" loading={loading} />
    </div>
  );
}
