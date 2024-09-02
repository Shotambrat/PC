import { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import axios from 'axios';

export default function ContactsEditor({ slug }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await axios.get(`/api/content/${slug}`);
        setLocations(response.data.locations || []);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch contacts');
      }
    }
    fetchContacts();
  }, [slug]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/content/${slug}`, { locations });
      message.success('Contacts updated successfully');
    } catch (error) {
      message.error('Failed to update contacts');
    }
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index][field] = value;
    setLocations(updatedLocations);
  };

  const handleAddLocation = () => {
    setLocations([...locations, { name: '', phone: '', address: '' }]);
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  return (
    <Form layout="vertical">
      {locations.map((location, index) => (
        <div key={index}>
          <Form.Item label="Name">
            <Input
              value={location.name}
              onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              value={location.phone}
              onChange={(e) => handleLocationChange(index, 'phone', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={location.address}
              onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
            />
          </Form.Item>
          <Button type="danger" onClick={() => handleRemoveLocation(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="dashed" onClick={handleAddLocation}>
        Add Location
      </Button>
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
}
