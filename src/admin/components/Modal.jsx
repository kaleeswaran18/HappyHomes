// import React from 'react';
// import './Modal.css';
// import { FaTimes } from 'react-icons/fa';

// const Modal = ({ title, children, onClose, footer }) => {
//   return (
//     <section className='modal'>
//     <div className="modal-backdrop" onClick={onClose}>
//       <div className="modal-card" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <div className="modal-title">{title}</div>
//           <button className="modal-close" aria-label="Close" onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>
//         <div className="modal-body">{children}</div>
//         <div className="modal-footer">{footer}</div>
//       </div>
//     </div>
//     </section>
//   );
// };

// export default Modal;



import React from 'react';
import './Modal.css';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ title, children, onClose, footer }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;