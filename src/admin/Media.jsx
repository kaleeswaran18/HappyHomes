// import React, { useState } from 'react';
// import IconButton from './components/IconButton';
// import Modal from './components/Modal';
// import Toast from './components/Toast';
// import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

// const Media = () => {
//   const [files, setFiles] = useState([]);
//   const [query, setQuery] = useState('');
//   const [draftName, setDraftName] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [toDelete, setToDelete] = useState(null);
//   const [toast, setToast] = useState({ message: '', type: 'success' });
//   const onUpload = (e) => {
//     const uploaded = Array.from(e.target.files || []).map((f) => ({ id: Date.now() + Math.random(), name: f.name, size: f.size }));
//     setFiles((prev) => [...prev, ...uploaded]);
//   };
//   const askDelete = (file) => { setToDelete(file); setConfirmOpen(true); };
//   const confirmDelete = () => {
//     if (!toDelete) return;
//     setFiles((prev) => prev.filter((f) => f.id !== toDelete.id));
//     setConfirmOpen(false);
//     setToDelete(null);
//     setToast({ message: 'Deleted successfully', type: 'success' });
//   };
//   const startEdit = (f) => { setEditingId(f.id); setDraftName(f.name); };
//   const confirmEdit = () => {
//     if (!editingId) return;
//     setFiles((prev) => prev.map((f) => (f.id === editingId ? { ...f, name: draftName } : f)));
//     setDraftName('');
//     setEditingId(null);
//     setToast({ message: 'Renamed successfully', type: 'success' });
//   };

//   const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

//   return (
//     <div>
//       <h2 style={{ marginBottom: 12 }}>Media Library</h2>
//       <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
//         <input type="file" multiple onChange={onUpload} />
//         <IconButton icon={FaPlus} label="Add" variant="success" onClick={() => document.querySelector('input[type=file]')?.click()} />
//         <input placeholder="Search media..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, padding: 8, border: '1px solid #d1d9e6', borderRadius: 8 }} />
//       </div>
//       <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//         {filtered.map((f) => (
//           <li key={f.id} className="admin-card" style={{ padding: 12, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <div>
//               <strong>{f.name}</strong> <span style={{ color: '#6b7280' }}>({Math.round(f.size / 1024)} KB)</span>
//             </div>
//             <div className="action-buttons">
//               <IconButton icon={FaEdit} label="Rename" variant="warning" onClick={() => startEdit(f)} />
//               <IconButton icon={FaTrash} label="Delete" variant="danger" onClick={() => askDelete(f)} />
//             </div>
//           </li>
//         ))}
//       </ul>
//       {editingId && (
//         <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//           <input value={draftName} onChange={(e) => setDraftName(e.target.value)} style={{ padding: 8, border: '1px solid #d1d9e6', borderRadius: 8 }} />
//           <IconButton label="Save" variant="success" onClick={confirmEdit} />
//           <IconButton label="Cancel" variant="warning" onClick={() => { setDraftName(''); setEditingId(null); }} />
//         </div>
//       )}

//       {confirmOpen && (
//         <Modal title="Confirm Delete" onClose={() => setConfirmOpen(false)}
//           footer={(
//             <>
//               <IconButton label="Cancel" variant="warning" onClick={() => setConfirmOpen(false)} />
//               <IconButton label="Delete" variant="danger" onClick={confirmDelete} />
//             </>
//           )}
//         >
//           <p>Are you sure you want to delete <strong>{toDelete?.name}</strong>?</p>
//         </Modal>
//       )}

//       {toast.message && (
//         <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
//       )}
//     </div>
//   );
// };

// export default Media;



// // src/pages/Media.jsx
// import React, { useState, useRef } from 'react';
// import IconButton from './components/IconButton';
// import Modal from './components/Modal';
// import Toast from './components/Toast';
// import Loader from './components/Loader';
// import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

// // local dummy list to start
// const initialFiles = [
//   { id: 1, name: 'hero-bg.jpg', url: '', size: 24512, type: 'image', uploadedAt: '2025-11-01' },
//   { id: 2, name: 'floorplan.pdf', url: '', size: 125432, type: 'file', uploadedAt: '2025-10-21' },
// ];

// const Media = () => {
//   const [files, setFiles] = useState(initialFiles);
//   const [query, setQuery] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [draftName, setDraftName] = useState('');
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [toDelete, setToDelete] = useState(null);
//   const [toast, setToast] = useState({ message: '', type: 'success' });
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef();

//   const fakeUpload = (f) => new Promise(resolve => {
//     setTimeout(() => resolve({ id: Date.now()+Math.random(), name: f.name, url: '', size: f.size, type: f.type.startsWith('image') ? 'image' : 'file', uploadedAt: new Date().toISOString().slice(0,10) }), 700);
//   });

//   const onUpload = async (e) => {
//     const selected = Array.from(e.target.files || []);
//     if (!selected.length) return;
//     setLoading(true);
//     try {
//       const uploaded = [];
//       for (const f of selected) {
//         const res = await fakeUpload(f);
//         uploaded.push(res);
//       }
//       setFiles(prev => [...prev, ...uploaded]);
//       setToast({ message: 'Uploaded successfully', type: 'success' });
//     } catch (err) {
//       setToast({ message: 'Upload failed', type: 'danger' });
//     } finally {
//       setLoading(false);
//       fileInputRef.current.value = '';
//     }
//   };

//   const askDelete = (file) => { setToDelete(file); setConfirmOpen(true); };
//   const confirmDelete = () => {
//     setFiles(prev => prev.filter(f => f.id !== toDelete.id));
//     setConfirmOpen(false);
//     setToDelete(null);
//     setToast({ message: 'Deleted successfully', type: 'success' });
//   };

//   const startEdit = (f) => { setEditingId(f.id); setDraftName(f.name); };
//   const confirmEdit = () => {
//     setFiles(prev => prev.map(f => f.id === editingId ? { ...f, name: draftName } : f));
//     setDraftName(''); setEditingId(null); setToast({ message: 'Renamed successfully', type: 'success' });
//   };

//   const filtered = files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

//   return (
//     <div>
//       <h2 style={{ marginBottom: 12 }}>Media Library</h2>
//       <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
//         <input ref={fileInputRef} type="file" multiple onChange={onUpload} style={{ display: 'none' }} />
//         <IconButton icon={FaPlus} label="Add" variant="success" onClick={() => fileInputRef.current?.click()} />
//         <input placeholder="Search media..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, padding: 8, border: '1px solid #d1d9e6', borderRadius: 8 }} />
//       </div>

//       {loading && <Loader />}

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {filtered.map(f => (
//           <li key={f.id} className="admin-card" style={{ padding: 12, height: 'auto', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
//               {f.type === 'image' ? <div style={{ width: 150, height: 150, background: '#f3f6fb', borderRadius: 6 }} /> : <div style={{ width: 72, height: 48, background: '#fff', borderRadius: 6, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PDF</div>}
//               <div>
//                 <strong>{f.name}</strong>
//                 <div style={{ color: 'var(--brand-muted)', fontSize: 13 }}>{f.uploadedAt} • {Math.round((f.size||0)/1024)} KB</div>
//               </div>
//             </div>
//             <div className="action-buttons">
//               <IconButton icon={FaEdit} label="Rename" variant="warning" onClick={() => startEdit(f)} />
//               <IconButton icon={FaTrash} label="Delete" variant="danger" onClick={() => askDelete(f)} />
//             </div>
//           </li>
//         ))}
//       </ul>

//       {editingId && (
//         <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//           <input value={draftName} onChange={(e) => setDraftName(e.target.value)} style={{ padding: 8, border: '1px solid #d1d9e6', borderRadius: 8 }} />
//           <IconButton label="Save" variant="success" onClick={confirmEdit} />
//           <IconButton label="Cancel" variant="warning" onClick={() => { setDraftName(''); setEditingId(null); }} />
//         </div>
//       )}

//       {confirmOpen && (
//         <Modal title="Confirm Delete" onClose={() => setConfirmOpen(false)}
//           footer={
//             <>
//               <IconButton label="Cancel" variant="warning" onClick={() => setConfirmOpen(false)} />
//               <IconButton label="Delete" variant="danger" onClick={confirmDelete} />
//             </>
//           }
//         >
//           <p>Are you sure you want to delete <strong>{toDelete?.name}</strong>?</p>
//         </Modal>
//       )}

//       {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />}
//     </div>
//   );
// };

// export default Media;



import React, { useState, useRef } from "react";
import IconButton from "./components/IconButton";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import Loader from "./components/Loader";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

// Dummy media list
const initialFiles = [
  { id: 1, name: "hero-bg.jpg", url: "", size: 24512, type: "image", uploadedAt: "2025-11-01" },
  { id: 2, name: "floorplan.pdf", url: "", size: 125432, type: "file", uploadedAt: "2025-10-21" },
];

// ------------------------------------------------------
// REUSABLE MEDIA RENDER FUNCTION (150x150)
// ------------------------------------------------------
const renderMediaItem = (file, startEdit, askDelete) => {
  return (
    <li
      key={file.id}
      className="admin-card"
      style={{
        padding: 12,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 'auto'
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        
        {/* 150 x 150 Preview */}
        {file.type === "image" ? (
          <div
            style={{
              width: 150,
              height: 150,
              background: "#f3f6fb",
              borderRadius: 6,
            }}
          />
        ) : (
          <div
            style={{
              width: 150,
              height: 150,
              background: "#fff",
              borderRadius: 6,
              border: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            FILE
          </div>
        )}

        <div>
          <strong>{file.name}</strong>
          <div style={{ color: "var(--brand-muted)", fontSize: 13 }}>
            {file.uploadedAt} • {Math.round((file.size || 0) / 1024)} KB
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <IconButton
          icon={FaEdit}
          label="Rename"
          variant="warning"
          onClick={() => startEdit(file)}
        />
        <IconButton
          icon={FaTrash}
          label="Delete"
          variant="danger"
          onClick={() => askDelete(file)}
        />
      </div>
    </li>
  );
};

const Media = () => {
  const [files, setFiles] = useState(initialFiles);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  // Fake Upload Simulation
  const fakeUpload = (f) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now() + Math.random(),
          name: f.name,
          url: "",
          size: f.size,
          type: f.type.startsWith("image") ? "image" : "file",
          uploadedAt: new Date().toISOString().slice(0, 10),
        });
      }, 700);
    });

  const onUpload = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setLoading(true);
    try {
      const uploaded = [];
      for (const f of selected) {
        const res = await fakeUpload(f);
        uploaded.push(res);
      }
      setFiles((prev) => [...prev, ...uploaded]);
      setToast({ message: "Uploaded successfully", type: "success" });
    } catch {
      setToast({ message: "Upload failed", type: "danger" });
    } finally {
      setLoading(false);
      fileInputRef.current.value = "";
    }
  };

  const askDelete = (file) => {
    setToDelete(file);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setFiles((prev) => prev.filter((f) => f.id !== toDelete.id));
    setConfirmOpen(false);
    setToDelete(null);
    setToast({ message: "Deleted successfully", type: "success" });
  };

  const startEdit = (file) => {
    setEditingId(file.id);
    setDraftName(file.name);
  };

  const confirmEdit = () => {
    setFiles((prev) =>
      prev.map((f) => (f.id === editingId ? { ...f, name: draftName } : f))
    );
    setDraftName("");
    setEditingId(null);
    setToast({ message: "Renamed successfully", type: "success" });
  };

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Media Library</h2>

      {/* Upload & Search */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onUpload}
          style={{ display: "none" }}
        />

        <IconButton
          icon={FaPlus}
          label="Add"
          variant="success"
          onClick={() => fileInputRef.current?.click()}
        />

        <input
          placeholder="Search media..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            border: "1px solid #d1d9e6",
            borderRadius: 8,
          }}
        />
      </div>

      {loading && <Loader />}

      {/* RENDER MEDIA LIST */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.map((file) => renderMediaItem(file, startEdit, askDelete))}
      </ul>

      {/* Edit Section */}
      {editingId && (
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            style={{
              padding: 8,
              border: "1px solid #d1d9e6",
              borderRadius: 8,
            }}
          />
          <IconButton label="Save" variant="success" onClick={confirmEdit} />
          <IconButton
            label="Cancel"
            variant="warning"
            onClick={() => {
              setDraftName("");
              setEditingId(null);
            }}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmOpen && (
        <Modal
          title="Confirm Delete"
          onClose={() => setConfirmOpen(false)}
          footer={
            <>
              <IconButton
                label="Cancel"
                variant="warning"
                onClick={() => setConfirmOpen(false)}
              />
              <IconButton
                label="Delete"
                variant="danger"
                onClick={confirmDelete}
              />
            </>
          }
        >
          <p>
            Are you sure you want to delete <strong>{toDelete?.name}</strong>?
          </p>
        </Modal>
      )}

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}
    </div>
  );
};

export default Media;
