import { useState } from "preact/hooks";

/** @jsxImportSource react */

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const addCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <span>{counter}</span>
      <button onClick={addCounter}>CLICK</button>
    </div>
  );
};
