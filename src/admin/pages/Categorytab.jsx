import React from 'react';
import DataTable from '../components/DataTable';
import { useSectionData } from '../data/adminData';

const Categorytab = () => {
  const { title, columns, rows, add, edit, remove } = useSectionData('categorytab');
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <DataTable title={title} columns={columns} rows={rows} onAdd={add} onEdit={edit} onDelete={remove} />
    </div>
  );
};

export default Categorytab;