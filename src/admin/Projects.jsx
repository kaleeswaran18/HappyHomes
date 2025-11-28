// import React, { useState } from 'react';
// import DataTable from './components/DataTable';

// const initialRows = [
//   { id: 1, name: 'Surya Garden -1', location: 'ParashakthiNagar', bhk: '2 BHK, 3 BHK & 4 BHK' },
//   { id: 2, name: 'Surya Garden -2', location: 'Thiruparankundram', bhk: '2 BHK, 3 BHK' },
// ];

// const columns = [
//   { key: 'name', label: 'Name' },
//   { key: 'location', label: 'Location' },
//   { key: 'bhk', label: 'BHK' },
// ];

// const Projects = () => {
//   const [rows, setRows] = useState(initialRows);
//   return (
//     <div>
//       <h2 style={{ marginBottom: 12 }}>Projects</h2>
//       <DataTable
//         title="Projects"
//         columns={columns}
//         rows={rows}
//         onAdd={(row) => setRows((r) => [...r, row])}
//         onEdit={(row) => setRows((r) => r.map((x) => (x.id === row.id ? row : x)))}
//         onDelete={(row) => setRows((r) => r.filter((x) => x.id !== row.id))}
//       />
//     </div>
//   );
// };

// export default Projects;

// src/pages/Projects.jsx
import React from 'react';
import DataTable from './components/DataTable';
import { useSectionData } from './data/adminData';

const Projects = () => {
  const { title, columns, rows, add, edit, remove } = useSectionData('projects');
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>{title}</h2>
      <DataTable
        title={title}
        columns={columns}
        rows={rows}
        onAdd={add}
        onEdit={edit}
        onDelete={remove}
      />
    </div>
  );
};

export default Projects;
