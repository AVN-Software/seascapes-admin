"use client";

import Modal from "./Modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenityName: string;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  amenityName,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-700">Confirm Deletion</h2>

        <p className="text-sm text-slate-600">
          Are you sure you want to delete <strong>{amenityName}</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
