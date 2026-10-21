/* eslint-disable react/prop-types */
import { useState } from "react";

const DIALOGUES = [
  {
    emoji: "💌",
    title: "You've got a letter!",
    subtitle: "Do you want to read it?",
    yesText: "Yes 💕",
    noText: "No",
  },
  {
    emoji: "🥺",
    title: "Are you sure?!",
    subtitle: "Aise direct mana kar diya? I wrote it with so much love... 🥺👉👈",
    yesText: "Okay, fine! 💕",
    noText: "Still no 😕",
  },
  {
    emoji: "💔",
    title: "Think again please!",
    subtitle: "Pakka na? It took me so much time to write this just for you! 😭",
    yesText: "Aww, let me read it 💖",
    noText: "Nope 🙈",
  },
  {
    emoji: "😭",
    title: "Dil toot gaya mera...",
    subtitle: "Itna bhav kyu kha rahi ho? Ek baar padh toh lo please! 💔",
    yesText: "Haan chal, padh leti hoon 🌸",
    noText: "Still saying no 😶",
  },
  {
    emoji: "🥀",
    title: "Last chance...",
    subtitle: "Are you genuinely saying no to me on your special day? Sach me? 😢",
    yesText: "Achha sorry, yes! 🥰",
    noText: "No... 🙅‍♀️",
  },
  {
    emoji: "🌧️💔",
    title: "Officially Depressed 😔",
    subtitle: "Theek hai... shayad meri feelings ki koi value hi nahi thi 🥀 Jaa raha hoon kone me rone... Bye 🚶‍♂️🌧️",
    yesText: "Arre ruko, read karna hai! 🥺❤️",
    noText: "Bye then 💔",
  },
  {
    emoji: "😤👊💖",
    title: "Aise kaise mana kar dogi?! 😤",
    subtitle: "Kholna toh padega hi aapko! Itne nakhre allowed nahi hai... ab chup-chaap khol lo! 🙈✨",
    yesText: "Theek hai baba, khol rahi hoon! 🥰💌",
    onlyYes: true,
  },
];

const LetterPopup = ({ onYes }) => {
  const [step, setStep] = useState(0);

  const current = DIALOGUES[step];
  const isOnlyYes = Boolean(current.onlyYes);

  const handleNo = () => {
    if (!isOnlyYes && step < DIALOGUES.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const yesScale = isOnlyYes ? 1 : 1 + step * 0.05;
  const noScale = Math.max(0.78, 1 - step * 0.05);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        key={step}
        className={`w-full max-w-md animate-[bounceIn_0.4s_ease-out] rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl transition-all duration-300 ${
          isOnlyYes ? "ring-4 ring-pink-400/50" : ""
        }`}
      >
        <div className="mb-2 text-4xl sm:text-5xl transition-transform duration-300 transform hover:scale-110">
          {current.emoji}
        </div>
        <h3 className="mb-2 text-xl sm:text-2xl font-bold text-pink-600 transition-colors">
          {current.title}
        </h3>
        <p className="mb-6 text-sm sm:text-base text-slate-600 leading-relaxed min-h-[48px] flex items-center justify-center">
          {current.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
            className={`rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-white shadow-lg transition-all active:scale-95 ${
              isOnlyYes
                ? "w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-[length:200%_auto] animate-pulse shadow-pink-500/50 text-base sm:text-lg hover:shadow-pink-500/80"
                : "bg-pink-500 shadow-pink-500/30 hover:bg-pink-600 hover:shadow-pink-500/50"
            }`}
          >
            {current.yesText}
          </button>
          {!isOnlyYes && (
            <button
              onClick={handleNo}
              style={{ transform: `scale(${noScale})` }}
              className="rounded-xl bg-slate-200 px-5 sm:px-7 py-2.5 sm:py-3 font-semibold text-slate-600 shadow-md transition-all hover:bg-slate-300 active:scale-95"
            >
              {current.noText}
            </button>
          )}
        </div>

        {step > 0 && (
          <p className="mt-4 text-xs text-slate-400">
            {isOnlyYes ? "No escape route available 😈💖" : `Rejection attempt: ${step} of ${DIALOGUES.length - 2} 🥺`}
          </p>
        )}
      </div>
    </div>
  );
};

export default LetterPopup;
