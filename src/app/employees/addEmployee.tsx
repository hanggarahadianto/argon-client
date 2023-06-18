"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:9000/employee", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        position: position,
      }),
    });

    setIsMutating(false);

    setFirst_name("");
    setLast_name("");
    setPhone("");
    setPosition("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Tambah Karyawan
      </button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-7">Tambah Karyawan Baru</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama Depan</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nama depan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Nama Belakang</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nama belakang"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Nomor Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input w-full input-bordered"
                placeholder="nomor telepon"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Posisi</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="input w-full input-bordered"
                placeholder="posisi"
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
