import React, { useEffect, useMemo, useState } from "react";
import "./DataTable.css";
import IconButton from "./IconButton";
import Modal from "./Modal";
import Loader from "./Loader";
import Toast from "./Toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const DataTable = ({ columns, rows, title }) => {
  const [query, setQuery] = useState("");
  const [internalRows, setInternalRows] = useState(rows || []);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [draft, setDraft] = useState({});
  const [current, setCurrent] = useState(null);

  const [loadingForm, setLoadingForm] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "success" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewPopup, setPreviewPopup] = useState(false);

  // Project names: separate for Add Form and Multi Upload
  const [projectNamesAddForm, setProjectNamesAddForm] = useState([]);
  const [projectNamesMultiUpload, setProjectNamesMultiUpload] = useState([]);

  // Extra popup for ProjectHouse
  const [housePopup, setHousePopup] = useState(false);
  const [houseProject, setHouseProject] = useState("");
  const [houseFiles, setHouseFiles] = useState([]);

  // ============= FETCH PROJECT NAMES FOR BOTH PURPOSES ===========
  useEffect(() => {
    const fetchAddFormNames = async () => {
      try {
        const res = await axios.get(
          "http://samplebuildapi-1.onrender.com/product/getprojectsSchema"
        );
        setProjectNamesAddForm(res.data.data || res.data || []);
      } catch (err) {
        console.error("Add Form Project Name Fetch Error:", err);
      }
    };

    const fetchMultiUploadNames = async () => {
      try {
        const res = await axios.get(
          "https://samplebuildapi-1.onrender.com/product/getAlprojectsSchema"
        );
        setProjectNamesMultiUpload(res.data.data || res.data || []);
      } catch (err) {
        console.error("Multi Upload Project Name Fetch Error:", err);
      }
    };

    if (title === "ProjectHouse") {
      fetchAddFormNames();
      fetchMultiUploadNames();
    }

  }, [title]);

  // Detect file type
  const detectFileType = (url, type) => {
    if (type) return type;
    if (!url || typeof url !== "string") return "unknown";

    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp", "avif"].includes(ext)) return "image";
    if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext)) return "video";

    return "unknown";
  };

  // Search filter
  const filtered = useMemo(() => {
    if (!query) return internalRows;
    const q = query.toLowerCase();
    return internalRows.filter((r) =>
      Object.values(r).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [internalRows, query]);

  // Update rows on API change
  useEffect(() => {
    setInternalRows(rows || []);
  }, [rows]);

  // Field detection
  const fieldTypes = useMemo(() => {
    const map = {};

    columns.forEach((c) => {
      const key = c.key.toLowerCase();

      if (key.includes("image") || key.includes("file") || key.includes("media")) {
        map[c.key] = "file";
      } else if (key === "projectplace") {
        map[c.key] = "select";
      } else {
        map[c.key] = "text";
      }
    });

    return map;
  }, [columns]);

  // Fetch data by title
  const fetchData = async () => {
    try {
      const base = "https://samplebuildapi-1.onrender.com/product";
      let apiUrl = "";

      if (title === "Home Content") apiUrl = `${base}/slidersget`;
      else if (title === "Projects") apiUrl = `${base}/getprojectsSchema`;
      else if (title === "ProjectHouse") apiUrl = `${base}/getAlprojectsSchema`;
      else if (title === "Testimonials") apiUrl = `${base}/getTestimonials`;
      else if (title === "Careers") apiUrl = `${base}/getcarrer`;
      else if (title === "Leadership Team") apiUrl = `${base}/LeadershipgetSchema`;
      else if (title === "Services") apiUrl = `${base}/getserviceSchema`;
      else if (title === "Contact") apiUrl = `${base}/getcontact`;
      else if (title === "enquireForm") apiUrl = `${base}/getform`;
      else if (title === "media") apiUrl = `${base}/gethomeimage`;
      else if (title === "founder") apiUrl = `${base}/FoundergetSchema`;
      else apiUrl = `${base}/common/get`;

      const res = await axios.get(apiUrl);
      let data = res.data.data || res.data;

      if (title === "Home Content") {
        const raw = res.data.data;
        if (Array.isArray(raw) && raw.length > 0 && raw[0].images) {
          data = raw[0].images.map((img) => ({
            file: img,
            _id: raw[0]._id,
          }));
        }
      }

      setInternalRows(data);
    } catch (err) {
      console.error("FETCH DATA ERROR:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD
  const openAdd = () => {
    setDraft(Object.fromEntries(columns.map((c) => [c.key, ""])));
    setAddOpen(true);
    setLoadingForm(true);
    setTimeout(() => setLoadingForm(false), 300);
  };

  const confirmAdd = async () => {
    const res = await sendAddRequest(draft);
    if (res.statuscode === 200) {
      await fetchData();
      setAddOpen(false);
      showToast("Added successfully", "success");
    } else showToast("Add failed", "danger");
  };

  const sendAddRequest = async (data) => {
    try {
      const base = "https://samplebuildapi-1.onrender.com/product";
      let apiUrl = "";

      if (title === "Home Content") apiUrl = `${base}/sliderscreate`;
      else if (title === "Projects") apiUrl = `${base}/create`;
      else if (title === "ProjectHouse") apiUrl = `${base}/createAlprojectsSchema`;
      else if (title === "Leadership Team") apiUrl = `${base}/Leadershipcreate`;
      else if (title === "Careers") apiUrl = `${base}/createcarrer`;
      else if (title === "Services") apiUrl = `${base}/servicecreate`;
      else if (title === "media") apiUrl = `${base}/homeimage`;
      else if (title === "Testimonials") apiUrl = `${base}/createTestimonials`;
      else if (title === "Contact") apiUrl = `${base}/createcontact`;
      else if (title === "enquireForm") apiUrl = `${base}/createform`;
      else if (title === "founder") apiUrl = `${base}/Foundercreate`;
      else apiUrl = `${base}/common/add`;

      const formData = new FormData();

      if (data.file instanceof File) formData.append("file", data.file);

      Object.keys(data).forEach((key) => {
        if (key !== "file") formData.append(key, data[key]);
      });

      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch {
      return { statuscode: 500 };
    }
  };

  // EDIT
  const openEdit = (row) => {
    setCurrent(row);
    const tmp = { ...row };
    if (tmp.file && typeof tmp.file === "object") tmp.file = "";
    setDraft(tmp);
    setEditOpen(true);
    setLoadingForm(true);
    setTimeout(() => setLoadingForm(false), 300);
  };

  const confirmEdit = async () => {
    const res = await sendEditRequest(draft);
    if (res.statuscode === 200) {
      await fetchData();
      setEditOpen(false);
      showToast("Updated successfully", "success");
    } else showToast("Update failed", "danger");
  };

  const sendEditRequest = async (data) => {
    try {
      const base = "https://samplebuildapi-1.onrender.com/product";
      let apiUrl = "";

      if (title === "Projects") apiUrl = `${base}/updateprojectsSchema`;
      else if (title === "ProjectHouse") apiUrl = `${base}/updateAlprojectsSchema`;
      else if (title === "Testimonials") apiUrl = `${base}/updateTestimonials`;
      else if (title === "Careers") apiUrl = `${base}/updatecarrer`;
      else if (title === "Leadership Team") apiUrl = `${base}/Leadershipupdate`;
      else if (title === "Services") apiUrl = `${base}/updateservice`;
      else if (title === "Contact") apiUrl = `${base}/updatecontact`;
      else if (title === "founder") apiUrl = `${base}/FounderupdateSchema`;
      else apiUrl = `${base}/common/update`;

      const formData = new FormData();
      for (let key in data) formData.append(key, data[key]);

      const res = await axios.put(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch {
      return { statuscode: 500 };
    }
  };

  // DELETE
  const askDelete = (row) => {
    setToDelete(row);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;

    const res = await sendDeleteRequest(toDelete);

    if (res.statuscode === 200) {
      await fetchData();
      showToast("Deleted successfully", "success");
    } else showToast("Delete failed", "danger");

    setConfirmOpen(false);
    setToDelete(null);
  };

  const sendDeleteRequest = async (item) => {
    try {
      const base = "https://samplebuildapi-1.onrender.com/product";
      let apiUrl = "";
      const formData = new FormData();

      if (title === "Projects") {
        apiUrl = `${base}/deleteprojectsSchema`;
        formData.append("_id", item._id);
      }

      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch {
      return { statuscode: 500 };
    }
  };

  // FORM UI
  const renderForm = () => (
    <div className="form-grid">
      {columns.map((c) => (
        <div key={c.key}>
          <label>{c.label}</label>

          {fieldTypes[c.key] === "select" ? (
            <select
              className="admin-select"
              value={draft[c.key] ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, [c.key]: e.target.value }))
              }
            >
              <option value="">-- Select Project Place --</option>

              {projectNamesAddForm.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}

            </select>
          ) : fieldTypes[c.key] === "file" ? (
            <div className="file-upload-box">
              <label className="file-upload-label">
                <span className="upload-icon">📁</span>
                <span>Click to upload file</span>

                <input
                  type="file"
                  accept="*/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setDraft((d) => ({ ...d, file }));
                      setPreviewUrl(URL.createObjectURL(file));
                      setPreviewPopup(true);
                    }
                  }}
                />
              </label>

              {draft.file && (
                <p className="file-name">
                  {draft.file instanceof File ? draft.file.name : "Existing File"}
                </p>
              )}
            </div>
          ) : (
            <input
              type="text"
              value={draft[c.key] ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, [c.key]: e.target.value }))
              }
            />
          )}
        </div>
      ))}
    </div>
  );

  const showToast = (msg, type) => {
    setToast({ message: msg, type });
  };

  return (
    <div className="admin-card table-card fade-in">

      {/* SEARCH + ADD */}
      <div className="table-toolbar">
        <input
          className="search-modern"
          placeholder={`Search ${title}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <IconButton
          icon={FaPlus}
          label="Add"
          variant="success"
          onClick={openAdd}
        />

        {/* EXTRA BUTTON FOR PROJECT HOUSE */}
        {title === "ProjectHouse" && (
          <IconButton
            icon={FaPlus}
            label="Add Photos"
            variant="primary"
            onClick={() => {
              setHouseFiles([]);
              setHouseProject("");
              setHousePopup(true);
            }}
          />
        )}
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r, idx) => (
              <tr key={idx}>
                {columns.map((c) => {
                  const value = r[c.key];

                  if (fieldTypes[c.key] !== "file") {
                    return <td key={c.key}>{String(value)}</td>;
                  }

                  const url = value?.url || value;
                  const type = value?.type;

                  const fileType =
                    typeof url === "string"
                      ? detectFileType(url, type)
                      : "unknown";

                  return (
                    <td key={c.key}>
                      {fileType === "image" ? (
                        <img src={url} className="table-image" alt="" />
                      ) : fileType === "video" ? (
                        <video src={url} className="table-video" controls />
                      ) : (
                        <span style={{ opacity: 0.6 }}>No File</span>
                      )}
                    </td>
                  );
                })}

                <td>
                  <div className="action-buttons">
                    <IconButton
                      icon={FaEdit}
                      label="Edit"
                      variant="warning"
                      onClick={() => openEdit(r)}
                    />

                    <IconButton
                      icon={FaTrash}
                      label="Delete"
                      variant="danger"
                      onClick={() => askDelete(r)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {addOpen && (
        <Modal
          title={`Add ${title}`}
          onClose={() => setAddOpen(false)}
          footer={
            <>
              <IconButton label="Cancel" variant="warning" onClick={() => setAddOpen(false)} />
              <IconButton label="Add" variant="success" onClick={confirmAdd} />
            </>
          }
        >
          {loadingForm ? <Loader /> : renderForm()}
        </Modal>
      )}

      {/* EDIT MODAL */}
      {editOpen && (
        <Modal
          title={`Edit ${title}`}
          onClose={() => setEditOpen(false)}
          footer={
            <>
              <IconButton label="Cancel" variant="warning" onClick={() => setEditOpen(false)} />
              <IconButton label="Save" variant="success" onClick={confirmEdit} />
            </>
          }
        >
          {loadingForm ? <Loader /> : renderForm()}
        </Modal>
      )}

      {/* DELETE CONFIRM */}
      {confirmOpen && (
        <Modal
          title="Confirm Delete"
          onClose={() => setConfirmOpen(false)}
          footer={
            <>
              <IconButton label="Cancel" variant="warning" onClick={() => setConfirmOpen(false)} />
              <IconButton label="Delete" variant="danger" onClick={confirmDelete} />
            </>
          }
        >
          <p>Are you sure you want to delete?</p>
        </Modal>
      )}

      {/* FILE PREVIEW */}
      {previewPopup && (
        <Modal
          title="Preview"
          onClose={() => setPreviewPopup(false)}
          footer={
            <>
              <IconButton label="Close" variant="warning" onClick={() => setPreviewPopup(false)} />
            </>
          }
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={previewUrl}
              alt="preview"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </div>
        </Modal>
      )}

      {/* MULTI UPLOAD POPUP (PROJECT HOUSE) */}
      {housePopup && (
        <Modal
          title="Upload Project House Photos"
          onClose={() => setHousePopup(false)}
          footer={
            <>
              <IconButton label="Cancel" variant="warning" onClick={() => setHousePopup(false)} />

              <IconButton
                label="Upload"
                variant="success"
                onClick={async () => {
                  const formData = new FormData();
                  formData.append("projectName", houseProject);

                  houseFiles.forEach((file) => {
                    formData.append("files", file);
                  });

                  try {
                    const res = await axios.post(
                      "https://samplebuildapi-1.onrender.com/product/multiUpload",
                      formData,
                      { headers: { "Content-Type": "multipart/form-data" } }
                    );

                    if (res.data.statuscode === 200) {
                      showToast("Uploaded Successfully", "success");
                      fetchData();
                      setHousePopup(false);
                    } else {
                      showToast("Upload Failed", "danger");
                    }
                  } catch (e) {
                    showToast("Error Uploading", "danger");
                  }
                }}
              />
            </>
          }
        >
          <label className="label">Select Project</label>
          <select
            className="admin-select"
            value={houseProject}
            onChange={(e) => setHouseProject(e.target.value)}
          >
            <option value="">-- Select Project --</option>
            {projectNamesMultiUpload.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <label className="label" style={{ marginTop: 10 }}>
            Upload up to 5 files
          </label>

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => {
              const selected = Array.from(e.target.files);
              if (selected.length > 5) {
                showToast("Only 5 files allowed", "danger");
                return;
              }
              setHouseFiles(selected);
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 15,
              overflowX: "auto",
              padding: "5px 0",
            }}
          >
            {houseFiles.map((file, i) => (
              <div key={i} style={{ minWidth: 80 }}>
                <img
                  src={URL.createObjectURL(file)}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* TOAST */}
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

export default DataTable;
