import { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import axios from 'axios';

export default function NavigationEditor({ slug }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNavigationLinks() {
      try {
        const response = await axios.get(`/api/content/${slug}`);
        setLinks(response.data.links || []);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch navigation links');
      }
    }
    fetchNavigationLinks();
  }, [slug]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/content/${slug}`, { links });
      message.success('Navigation links updated successfully');
    } catch (error) {
      message.error('Failed to update navigation links');
    }
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  return (
    <Form layout="vertical">
      {links.map((link, index) => (
        <div key={index}>
          <Form.Item label="Name">
            <Input
              value={link.name}
              onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="URL">
            <Input
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
            />
          </Form.Item>
          <Button type="danger" onClick={() => handleRemoveLink(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="dashed" onClick={handleAddLink}>
        Add Link
      </Button>
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
}
