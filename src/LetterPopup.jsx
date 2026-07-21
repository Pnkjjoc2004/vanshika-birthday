/* eslint-disable react/prop-types */
const LetterPopup = ({ onYes, onNo }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md animate-[bounceIn_0.5s_ease-out] rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mb-2 text-4xl">💌</div>
        <h3 className="mb-2 text-2xl font-bold text-pink-600">
          You&apos;ve got a letter!
        </h3>
        <p className="mb-6 text-slate-600">Do you want to read it?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onYes}
            className="rounded-xl bg-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-600 active:scale-95"
          >
            Yes 💕
          </button>
          <button
            onClick={onNo}
            className="rounded-xl bg-slate-200 px-8 py-3 font-semibold text-slate-600 shadow-lg transition hover:bg-slate-300 active:scale-95"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterPopup;
