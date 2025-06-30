import { useState } from "react";

interface AddCarModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, model: string) => Promise<void> | void;
}

export function AddCarModal({ open, onClose, onAdd }: AddCarModalProps) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd(name, model);
      setName("");
      setModel("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">Car Name</label>
            <input
              className="w-full border rounded p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Car Model</label>
            <input
              className="w-full border rounded p-1"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-1 rounded bg-gray-300"
              onClick={() => {
                setName("");
                setModel("");
                onClose();
              }}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-teal-700 text-white"
              disabled={!name || !model || loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
