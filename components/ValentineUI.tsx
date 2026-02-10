
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { AppState, RejectionMessage } from '../types';

interface ValentineUIProps {
  state: AppState;
  rejectionCount: number;
  rejectionPhases: RejectionMessage[];
  noButtonPos: { x: number; y: number };
  yesButtonSize: number;
  loveNote: string;
  isLoadingNote: boolean;
  onNoClick: () => void;
  onNoHover: () => void;
  onYesClick: () => void;
}

const ValentineUI: React.FC<ValentineUIProps> = ({
  state,
  rejectionCount,
  rejectionPhases,
  noButtonPos,
  yesButtonSize,
  loveNote,
  isLoadingNote,
  onNoClick,
  onNoHover,
  onYesClick
}) => {
  if (state === AppState.SUCCESS) {
    return (
      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full border-4 border-pink-100 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6 floating">
          <LucideIcons.Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4 animate-bounce">
          太棒了！这是一场约会！❤️
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed italic">
          “最好的礼物，是与你共度的时光。”
        </p>
        
        <div className="bg-pink-50 w-full p-5 rounded-2xl border border-pink-100 shadow-inner mb-6">
          <h3 className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] mb-2 text-center">专属浪漫寄语</h3>
          {isLoadingNote ? (
            <div className="flex justify-center items-center py-4">
              <LucideIcons.Loader2 className="animate-spin h-6 w-6 text-pink-400" />
            </div>
          ) : (
            <p className="text-lg sm:text-xl text-pink-700 font-medium leading-snug text-center">
              {loveNote}
            </p>
          )}
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="text-pink-300 hover:text-pink-500 transition-colors text-xs font-bold uppercase tracking-widest mt-4"
        >
          重新体验这份心动
        </button>
      </div>
    );
  }

  const currentPhase = rejectionPhases[rejectionCount];
  // @ts-ignore - Dynamic icon access
  const IconComponent = LucideIcons[currentPhase.icon] || LucideIcons.Heart;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full border-4 border-pink-50 relative overflow-hidden flex flex-col items-center">
      {/* Background Hearts */}
      <div className="absolute top-4 left-4 opacity-10"><LucideIcons.Heart className="w-8 h-8 text-pink-300" /></div>
      <div className="absolute bottom-4 right-4 opacity-10 rotate-12"><LucideIcons.Heart className="w-12 h-12 text-pink-400" /></div>

      <div className="mb-8 relative z-10">
        <div className="p-6 bg-pink-50 rounded-full shadow-inner inline-block transition-all duration-500">
          <IconComponent className={`w-16 h-16 sm:w-20 sm:h-20 ${currentPhase.color} transition-all duration-500 ${rejectionCount > 0 ? 'scale-110' : ''}`} strokeWidth={1.5} />
        </div>
      </div>

      <div className="z-10 relative mb-8">
        <span className="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
          浪漫邀约
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-800 leading-tight">
          你愿意接受我的 <br/>
          <span className="text-pink-600 text-4xl sm:text-5xl font-handwriting block mt-2">情人节约会</span>
          邀请吗？
        </h1>
      </div>

      {/* Button Layout for Mobile: Stacked to handle growth without overlap */}
      <div className="flex flex-col items-center justify-start w-full min-h-[300px] sm:min-h-[250px] space-y-8 py-4">
        
        {/* Yes Button - Fixed center-top position of this sub-container */}
        <div className="flex items-center justify-center w-full min-h-[80px] z-30 pointer-events-none">
          <button
            onClick={onYesClick}
            style={{ 
              transform: `scale(${yesButtonSize})`,
              transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className="pointer-events-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black py-4 px-12 rounded-full shadow-xl active:scale-95 whitespace-nowrap text-lg relative"
          >
            好呀！✨
          </button>
        </div>

        {/* No Button - Moves independently in its own space below */}
        <div className="flex items-center justify-center w-full min-h-[60px] relative">
          <button
            onClick={onNoClick}
            onMouseEnter={onNoHover}
            onTouchStart={onNoHover}
            style={{ 
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            }}
            className="bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-3 px-8 rounded-full shadow-sm transition-all duration-200 whitespace-nowrap z-20 text-sm border border-gray-100 touch-none"
          >
            {currentPhase.text}
          </button>
        </div>
      </div>

      {rejectionCount > 0 && (
        <div className="mt-4 px-4 py-2 bg-pink-50 rounded-xl inline-block border border-pink-100 animate-pulse relative z-10">
          <p className="text-pink-400 text-xs font-bold italic">
            {rejectionCount >= 5 ? "看呐，‘好呀’已经大到无法拒绝了！💖" : "心动提示：‘好呀’正在为你加速变大... ❤️"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ValentineUI;
