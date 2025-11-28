import React from 'react';
import DataTable from '../components/DataTable';
import { useSectionData } from '../data/adminData';

const FounderAdmin = () => {
  const { title, columns, rows, add, edit, remove } = useSectionData('founder');
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <DataTable title={title} columns={columns} rows={rows} onAdd={add} onEdit={edit} onDelete={remove} />
    </div>
  );
};

export default FounderAdmin;