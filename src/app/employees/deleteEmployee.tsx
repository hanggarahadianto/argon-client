"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  position: string;
};
export default function DeleteEmployee(employee: Employee) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(employee_id: number) {
    setIsMutating(true);

    await fetch(`http://localhost:9000/employee/${employee_id}`, {
      method: "delete",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Delete
      </button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Anda yakin untuk menghapus {employee.first_name} {employee.last_name} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button type="button" onClick={() => handleDelete(employee.id)} className="btn btn-primary">
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
