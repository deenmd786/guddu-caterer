// AdminUpdateButton.tsx
import React from 'react';

interface AdminUpdateButtonProps {
  showUpdateForm: boolean;
  onToggleUpdateForm: () => void;
}

const AdminUpdateButton: React.FC<AdminUpdateButtonProps> = ({
  showUpdateForm,
  onToggleUpdateForm,
}) => {
  return (
    <button
      onClick={onToggleUpdateForm}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition mt-4"
    >
      {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
    </button>
  );
};

export default AdminUpdateButton;
