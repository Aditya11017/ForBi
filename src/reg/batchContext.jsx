import { createContext, useContext, useEffect, useState } from "react";

const BatchContext = createContext();

export const BatchProvider = ({ children }) => {
  const [batches, setBatches] = useState(() => {
    const stored = localStorage.getItem("selectedBatches");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedBatches", JSON.stringify(batches));
  }, [batches]);

  const addBatch = (batch) => {
    setBatches((prev) =>
      prev.some((b) => b.batchId === batch.batchId)
        ? prev
        : [...prev, batch]
    );
  };

  const removeBatch = (batchId) => {
    setBatches((prev) => prev.filter((b) => b.batchId !== batchId));
  };

  const clearBatches = () => setBatches([]);

  return (
    <BatchContext.Provider
      value={{ batches, addBatch, removeBatch, clearBatches }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export const useBatch = () => useContext(BatchContext);
