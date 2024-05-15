import React from "react";

type Props = {
  toggleToken: () => void;
  loading: boolean;
};

function MiddeToggle({ toggleToken, loading }: Props) {
  return (
    <div className="w-[40px] mx-auto py-3   hover:scale-105 transition-all relative ">
      <button
        className={`bg-gradient-to-b slimeborder from-[#185a2b1a] to-neutral-800    p-2 rounded-full relative swap_loading ${
          loading ? "before:opacity-1" : "before:opacity-0"
        }`}
        onClick={() => toggleToken()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default MiddeToggle;
