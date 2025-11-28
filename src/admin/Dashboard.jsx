import React from 'react';
// import DataTable from '../components/DataTable';
// import { useSectionData } from '../data/adminData';
import DataTable from './components/DataTable';
import { useSectionData } from './data/adminData';

const Dashboard = () => {
  const { title, columns, rows, add, edit, remove } = useSectionData('enquireForm');
  console.log(title, columns, rows,"find")
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <DataTable title={title} columns={columns} rows={rows} onAdd={add} onEdit={edit} onDelete={remove} />
    </div>
  );
};

export default Dashboard;