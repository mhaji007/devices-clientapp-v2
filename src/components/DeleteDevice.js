import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import styles from './DeleteDevice.module.css';
import Button from './Button';

function DeleteDevice({deviceId, onDone}) {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_BASE_URL}/devices/${deviceId}`);
      setDevice(data);
    })();
  }, [deviceId]);

  const handleDeviceDelete = async () => {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/devices/${deviceId}`);
      if (!data) {
        throw new Error('Error deleting device');
      }
      onDone(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      {device && (
        <div>
          <p>
            <strong>Delete Device</strong>
          </p>
          <div className={styles.panel}>
            <p>
              Are you sure you want to delete{' '}
              <strong>{device.system_name}</strong> device?
            </p>
          <div>
            <Button onClick={handleDeviceDelete} danger>Delete</Button>
            <Button onClick={() => onDone()}>Cancel</Button></div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DeleteDevice;
