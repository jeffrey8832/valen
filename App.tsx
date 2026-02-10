
import React, { useState, useCallback } from 'react';
import { AppState, RejectionMessage } from './types';
import { generateLoveNote } from './services/geminiService';
import ValentineUI from './components/ValentineUI';

const REJECTION_PHASES: RejectionMessage[] = [
  { text: "不要", icon: "Heart", color: "text-pink-500" },
  { text: "约会也不去吗？🥺", icon: "CalendarHeart", color: "text-pink-400" },
  { text: "我准备了惊喜哦！🎁", icon: "Gift", color: "text-red-400" },
  { text: "真的不考虑一下？💔", icon: "Frown", color: "text-orange-400" },
  { text: "美食、电影、还有我！🍿", icon: "Ticket", color: "text-yellow-600" },
  { text: "我会表现超好的！💍", icon: "Star", color: "text-blue-400" },
  { text: "心碎了一地... ✨", icon: "HeartCrack", color: "text-yellow-400" },
  { text: "求你了，点那个大的！❤️", icon: "HeartHandshake", color: "text-pink-600" },
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INVITATION);
  const [rejectionCount, setRejectionCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [loveNote, setLoveNote] = useState<string>("");
  const [isLoadingNote, setIsLoadingNote] = useState(false);

  const handleNoClick = useCallback(() => {
    setRejectionCount((prev) => Math.min(prev + 1, REJECTION_PHASES.length - 1));
    // Growth capped for usability on mobile, but still dramatic
    setYesButtonScale((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleNoHover = useCallback(() => {
    if (rejectionCount > 1) {
      // Constrain movement specifically to stay within the mobile viewport safe zone
      const rangeX = Math.min(window.innerWidth * 0.25, 100);
      const rangeY = 40; // Less vertical movement to prevent overlap with titles
      const randomX = (Math.random() - 0.5) * rangeX * 2;
      const randomY = (Math.random() - 0.5) * rangeY * 2;
      setNoButtonPos({ x: randomX, y: randomY });
    }
  }, [rejectionCount]);

  const handleYes = async () => {
    setState(AppState.SUCCESS);
    setIsLoadingNote(true);
    const note = await generateLoveNote();
    setLoveNote(note);
    setIsLoadingNote(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <ValentineUI 
        state={state}
        rejectionCount={rejectionCount}
        rejectionPhases={REJECTION_PHASES}
        noButtonPos={noButtonPos}
        yesButtonSize={yesButtonScale}
        loveNote={loveNote}
        isLoadingNote={isLoadingNote}
        onNoClick={handleNoClick}
        onNoHover={handleNoHover}
        onYesClick={handleYes}
      />
    </div>
  );
};

export default App;
