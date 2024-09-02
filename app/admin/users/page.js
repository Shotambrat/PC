// app/admin/users/UserManagementPage.js
"use client"

import { useEffect, useState } from 'react';
import { Table, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        message.error('Failed to load users');
      }
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      await axios.put(`/api/users/${userId}`, { role: newRole });
      message.success('User role updated successfully');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      message.error('Failed to update user role');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
      render: (text, record) => (
        <Select
          defaultValue={record.role}
          onChange={(value) => handleRoleChange(record._id, value)}
          style={{ width: 120 }}
        >
          <Option value="user">User</Option>
          <Option value="editor">Editor</Option>
          <Option value="admin">Admin</Option>
          <Option value="superadmin">Superadmin</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="danger" onClick={() => handleDeleteUser(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>User Management</h1>
      <Table columns={columns} dataSource={users} rowKey="_id" loading={loading} />
    </div>
  );
}
