import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MultiSelect } from 'react-multi-select-component';
import Modal from 'react-modal';
import styles from './Home.module.css';
import Layout from './Layout';
import { API_BASE_URL } from '../constants/config';
import { deviceTypes } from '../constants';
import AddDevice from './AddDevice';
import EditDevice from './EditDevice';
import DeleteDevice from './DeleteDevice';
import DeviceList from './DeviceList';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 980,
  },
};
Modal.setAppElement('#root');

const multiSelectOptions = Object.keys(deviceTypes).map((deviceKey) => ({
  label: deviceTypes[deviceKey],
  value: deviceKey,
}));

function Home() {
  const [allDevices, setAllDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] =
    useState(multiSelectOptions);
  const [selectedSortBy, setSelectedSortBy] = useState('SYSTEM_NAME');

  const [addDeviceModalIsOpen, setAddDeviceModalIsOpen] = useState(false);
  const [editDeviceModalIsOpen, setEditDeviceModalIsOpen] = useState(false);
  const [deleteDeviceModalIsOpen, setDeleteDeviceModalIsOpen] = useState(false);
  const [editDeviceId, setEditDeviceId] = useState(null);

  function openAddDeviceModal() {
    setAddDeviceModalIsOpen(true);
  }

  function afterAddDeviceOpenModal() {}

  function closeAddDeviceModal(device) {
    setAddDeviceModalIsOpen(false);
    if (device) {
      getAllDevices();
    }
  }

  function openEditDeviceModal(device) {
    setEditDeviceId(device.id);
    setEditDeviceModalIsOpen(true);
  }

  function afterEditDeviceOpenModal() {}

  function closeEditDeviceModal(device) {
    setEditDeviceModalIsOpen(false);
    setEditDeviceId(null);
    if (device) {
      getAllDevices();
    }
  }

  function openDeleteDeviceModal(device) {
    setEditDeviceId(device.id);
    setDeleteDeviceModalIsOpen(true);
  }

  function afterDeleteDeviceOpenModal() {}

  function closeDeleteDeviceModal(device) {
    setDeleteDeviceModalIsOpen(false);
    setEditDeviceId(null);
    if (device) {
      getAllDevices();
    }
  }

  useEffect(() => {
    getAllDevices();
  }, []);
  useEffect(() => {
    setFilteredDevices(allDevices);
  }, [allDevices]);

  const doSorDevicestBySystemName = useCallback(() => {
    const newDevices = filteredDevices.slice().sort((a, b) => {
      return a.system_name.localeCompare(b.system_name);
    });
    if (JSON.stringify(newDevices) !== JSON.stringify(filteredDevices)) {
      setFilteredDevices(newDevices);
    }
  }, [filteredDevices]);

  const doSortDevicesByHddCapacity = useCallback(() => {
    const newDevices = filteredDevices.slice().sort((a, b) => {
      return parseInt(a.hdd_capacity) - parseInt(b.hdd_capacity);
    });
    if (JSON.stringify(newDevices) !== JSON.stringify(filteredDevices)) {
      setFilteredDevices(newDevices);
    }
  }, [filteredDevices]);

  useEffect(() => {
    if (selectedSortBy === 'SYSTEM_NAME') {
      doSorDevicestBySystemName();
    } else if (selectedSortBy === 'HDD_CAPACITY') {
      doSortDevicesByHddCapacity();
    }
  }, [
    selectedSortBy,
    allDevices,
    doSorDevicestBySystemName,
    doSortDevicesByHddCapacity,
  ]);

  const getAllDevices = async () => {
    const { data } = await axios.get(`${API_BASE_URL}/devices`);
    setAllDevices(data);
  };

  const handleDeviceTypeChange = (selectedTypes) => {
    setSelectedDeviceTypes(selectedTypes);

    const selectedTypesValues = selectedTypes.map((type) => type.value);

    const newDevices = allDevices.filter(
      (device) => selectedTypesValues.indexOf(device.type) >= 0
    );
    setFilteredDevices(newDevices);
  };
  const handleSortByChange = (e) => {
    const sortBy = e.target.value;
    setSelectedSortBy(sortBy);
  };

  return (
    <Layout>
      <div className={styles.header}>
        <div className={[styles.headerItem, styles.deviceTypes].join(' ')}>
          <label className={styles.label} htmlFor="deviceType">
            Device Type:
          </label>
          <MultiSelect
            className={styles.multiSelect}
            options={multiSelectOptions}
            value={selectedDeviceTypes}
            onChange={handleDeviceTypeChange}
            labelledBy="Select"
          />
        </div>
        <div className={styles.headerItem}>
          <label className={styles.label} htmlFor="sortBy">
            Sort By:
          </label>
          <select
            className={styles.selectInput}
            id="sortBy"
            value={selectedSortBy}
            onChange={handleSortByChange}
          >
            <option value="SYSTEM_NAME">System Name</option>
            <option value="HDD_CAPACITY">HDD Capacity</option>
          </select>
        </div>
        <div className={[styles.headerItem]}>
          <div className={styles.addDevice} onClick={openAddDeviceModal}>
            <FaPlus />
            <span>Add Device</span>
          </div>
        </div>
      </div>

      {filteredDevices.length ? (
        <DeviceList
        currentPageCount={2}
          items={filteredDevices}
          onEditDevice={openEditDeviceModal}
          onDeleteDevice={openDeleteDeviceModal}
        />
      ) : (
        <div className={styles.panel}>
          <p>No devices</p>
        </div>
      )}

      <Modal
        isOpen={addDeviceModalIsOpen}
        onAfterOpen={afterAddDeviceOpenModal}
        onRequestClose={closeAddDeviceModal}
        style={modalStyles}
        contentLabel="Add Device"
      >
        <AddDevice onDone={closeAddDeviceModal} />
      </Modal>
      <Modal
        isOpen={editDeviceModalIsOpen}
        onAfterOpen={afterEditDeviceOpenModal}
        onRequestClose={closeEditDeviceModal}
        style={modalStyles}
        contentLabel="Edit Device"
      >
        <EditDevice deviceId={editDeviceId} onDone={closeEditDeviceModal} />
      </Modal>
      <Modal
        isOpen={deleteDeviceModalIsOpen}
        onAfterOpen={afterDeleteDeviceOpenModal}
        onRequestClose={closeDeleteDeviceModal}
        style={modalStyles}
        contentLabel="Delete Device"
      >
        <DeleteDevice deviceId={editDeviceId} onDone={closeDeleteDeviceModal} />
      </Modal>
    </Layout>
  );
}

export default Home;
