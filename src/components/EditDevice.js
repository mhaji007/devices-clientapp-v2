import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceForm from './DeviceForm';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';

function EditDevice({deviceId, onDone}) {
  const [device, setDevice] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices/${deviceId}`);
      setDevice(data);
    })();
  }, [deviceId]);
  const handleDeviceUpdate = async (device) => {
    const id = deviceId;
    delete device.id;
    try {
      const { data } = await axios.put(`${API_BASE_URL}/devices/${id}`, device);
      if (!data) {
        throw new Error('Error updating device');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Layout>
      <p>
        <strong>Edit Device</strong>
      </p>
      {device && <DeviceForm device={device} onSubmit={async (device) => {
        await handleDeviceUpdate(device);
        onDone(device);
      }} onClose={onDone} />}
    </Layout>
  );
}

export default EditDevice;
