import React from 'react';
import DataTable from '../components/DataTable';
import { useSectionData } from '../data/adminData';

const HomeContent = () => {
  const { title, columns, rows, add, remove } = useSectionData('home');
  console.log(title, columns, rows,"find")
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <DataTable title={title} columns={columns} rows={rows} onAdd={add}  onDelete={remove} />
    </div>
  );
};

export default HomeContent;