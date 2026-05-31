import React, { useEffect, useState } from 'react';
import { generatePromptFromResults } from '../../generationLogic/generatePrompt';
import ImageGenerator from '../ImageGenerator/ImageGenerator';

interface ResultProps {
  resultsByTree: Record<string, { tag: string; weight: number }[]>;
}

const Result: React.FC<ResultProps> = ({ resultsByTree }) => {
  const [prompt, setPrompt] = useState('');

  const handleGeneratePrompt = async () => {
    const generatedPrompt = await generatePromptFromResults(resultsByTree);
    setPrompt(generatedPrompt);
  };

  useEffect(() => {
    handleGeneratePrompt();
  }, [resultsByTree]);

  return (
    <div className="result-page">
      <ImageGenerator initialPrompt={prompt} />
    </div>
  );
};

export default Result;
