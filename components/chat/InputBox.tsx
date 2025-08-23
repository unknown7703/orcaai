// components/chat/InputBox.tsx
"use client";
import { Waypoints, CirclePlay, ArrowUpRight, Component } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface InputBoxProps {
  inputValue: string;
  onInputValueChange: (value: string) => void;
  isLoading: boolean;
  activeMode: ActiveMode;
  onActiveModeChange: (mode: ActiveMode) => void;
  selectedModel: Model;
  onSelectedModelChange: (model: Model) => void;
  onSubmit: () => void;
}

export function InputBox({
  inputValue,
  onInputValueChange,
  isLoading,
  activeMode,
  onActiveModeChange,
  selectedModel,
  onSelectedModelChange,
  onSubmit,
}: InputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState<boolean>(false);
  const modelSelectorRef = useRef<HTMLDivElement>(null);

  const models: Model[] = ['llama3-70b-8192', 'deepseek-r1-distilled-llama-70b', 'llama3-8b-8192'];

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modelSelectorRef.current && !modelSelectorRef.current.contains(event.target as Node)) {
        setIsModelSelectorOpen(false);
      }
    }
    if (isModelSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModelSelectorOpen]);

  const handleModelSelect = (model: Model) => {
    onSelectedModelChange(model);
    setIsModelSelectorOpen(false);
  };

  return (
    <div className="w-full bg-muted py-3 px-6 rounded-2xl flex flex-col">
      <div className="w-full">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => onInputValueChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          rows={1}
          disabled={isLoading}
          className="min-h-10 w-full resize-none border-none bg-transparent focus:outline-none focus:ring-0 p-0 text-white placeholder-gray-400 max-h-48 overflow-y-auto disabled:opacity-60"
          placeholder={`What would you like me to do?`}
        />
      </div>
      <div className="flex flex-row justify-between items-center pt-2">
        <div className="flex flex-row gap-2">
          <button
            onClick={() => onActiveModeChange('plan')}
            disabled={isLoading}
            className={`transition-colors p-2 rounded-lg flex items-center gap-2 disabled:opacity-60 ${activeMode === 'plan' ? 'bg-white text-black' : 'bg-background-two text-white hover:bg-background-two/80'}`}
          >
            <Waypoints className="w-4 h-4" />
          </button>
          <button
            onClick={() => onActiveModeChange('execute')}
            disabled={isLoading}
            className={`transition-colors p-2 rounded-lg flex items-center gap-2 disabled:opacity-60 ${activeMode === 'execute' ? 'bg-white text-black' : 'bg-background-two text-white hover:bg-background-two/80'}`}
          >
            <CirclePlay className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="relative flex flex-row gap-2 items-center" ref={modelSelectorRef}>
            <p className="text-xs text-gray-400">model - {selectedModel}</p>
            <button
              onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
              disabled={isLoading}
              className="bg-background-two hover:bg-background-two/80 transition-colors p-2 rounded-lg disabled:opacity-60"
            >
              <Component className="w-4 h-4" />
            </button>
            {isModelSelectorOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-max bg-background-two border border-white/10 shadow-lg rounded-lg p-1 z-10">
                <ul>
                  {models.map((model) => (
                    <li key={model}><button onClick={() => handleModelSelect(model)} className="w-full text-left text-sm p-2 rounded-md hover:bg-white/10 transition-colors">{model}</button></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={onSubmit}
            disabled={isLoading || !inputValue.trim()}
            className="bg-accent hover:bg-accent/90 transition-colors px-3 py-2 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>) : (<ArrowUpRight className="text-black w-6 h-6" />)}
          </button>
        </div>
      </div>
    </div>
  );
}
