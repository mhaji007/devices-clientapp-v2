import React, { useEffect, useState } from 'react';
import styles from './DeviceList.module.css';
import ReactPaginate from 'react-paginate';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { deviceTypes } from '../constants';

const itemsPerPage = 5;

function DeviceList({ items, onEditDevice, onDeleteDevice }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const renderDevice = (device) => (
    <li key={device.id}>
      <div className={styles.deviceControls}>
        <FaTrashAlt onClick={() => onDeleteDevice(device)} />
        <FaPencilAlt onClick={() => onEditDevice(device)} />
      </div>
      <p className={styles.deviceItemSystemName}>{device.system_name}</p>
      <p className={styles.deviceItemDeviceType}>{deviceTypes[device.type]}</p>
      <p className={styles.deviceItemCapacity}>{device.hdd_capacity} GB</p>
    </li>
  );

  return (
    <div>
      {currentItems && <ul className={styles.deviceList}>{currentItems.map(renderDevice)}</ul>}
      <ReactPaginate
        breakLabel="..."
        nextLabel="&raquo;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="&laquo;"
        renderOnZeroPageCount={null}

        containerClassName={styles.pagination} 
        activeClassName={styles.active} 
        disabledClassName={styles.disabled} 
        
      />
    </div>
  );
}

export default DeviceList;
