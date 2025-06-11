import React from "react";

interface CustomModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  modalRef?: React.RefObject<HTMLDivElement | null>;
}

export default function CustomModal({ id, title, children, onConfirm, modalRef }: CustomModalProps) {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      ref={modalRef} // ✅ dùng ref ở đây
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            {onConfirm && (
              <button type="button" className="btn btn-primary" onClick={onConfirm}>Lưu</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
