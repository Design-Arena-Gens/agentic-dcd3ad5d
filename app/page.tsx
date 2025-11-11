'use client';

import { useState } from 'react';
import { Upload, FileImage, Play, AlertCircle } from 'lucide-react';

interface ABAObservation {
  timestamp: string;
  technique: string;
  description: string;
  portuguese: string;
  english: string;
}

interface AnalysisResult {
  visualDescription: string;
  observations: ABAObservation[];
  behaviorSummary: string;
  reinforcementPatterns: string[];
  recommendations: string[];
}

export default function Home() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setAnalysis(null);
  };

  const analyzeImages = async () => {
    if (selectedImages.length === 0) return;

    setIsAnalyzing(true);

    // Simulated analysis - in production this would call an AI API
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        visualDescription: "The sequence shows a young girl engaged in roller skating activities on a smooth outdoor surface. She demonstrates progressive skill development across multiple frames, moving from assisted balance work to independent skating movements. Her body positioning shows appropriate weight distribution and postural control typical of beginner-intermediate roller skating competency.",
        observations: [
          {
            timestamp: "Frame 1 (0:00-0:05)",
            technique: "Discrete Trial Training (DTT)",
            description: "Instructor provides clear, single-step instruction for initial positioning",
            portuguese: "Coloca o pé direito na frente, assim. Muito bem!",
            english: "Put your right foot forward, like this. Very good!"
          },
          {
            timestamp: "Frame 2 (0:06-0:12)",
            technique: "Physical Prompting + Positive Reinforcement",
            description: "Gentle hand guidance with immediate verbal praise following correct movement",
            portuguese: "Isso mesmo! Você está indo muito bem. Olha como você consegue!",
            english: "That's right! You're doing very well. Look how you can do it!"
          },
          {
            timestamp: "Frame 3 (0:13-0:20)",
            technique: "Verbal Behavior - Manding",
            description: "Child demonstrates requesting behavior for continued activity",
            portuguese: "Quero mais! Posso fazer de novo?",
            english: "I want more! Can I do it again?"
          },
          {
            timestamp: "Frame 4 (0:21-0:28)",
            technique: "Fading Prompts",
            description: "Gradual reduction of physical support as child gains confidence",
            portuguese: "Agora tenta sozinha. Eu estou aqui pertinho.",
            english: "Now try by yourself. I'm right here close by."
          },
          {
            timestamp: "Frame 5 (0:29-0:35)",
            technique: "Natural Environment Training (NET)",
            description: "Skills practiced in functional, motivating context of play activity",
            portuguese: "Vamos até aquela árvore! Você consegue!",
            english: "Let's go to that tree! You can do it!"
          }
        ],
        behaviorSummary: "The child exhibits strong motivation and engagement throughout the activity, demonstrating key behavioral indicators of successful learning: sustained attention, compliance with instructions, spontaneous requesting for continuation, and visible pleasure responses. Motor planning and execution improve across trials, consistent with skill acquisition trajectory.",
        reinforcementPatterns: [
          "Continuous reinforcement schedule during initial acquisition phase",
          "Social reinforcement (praise, enthusiasm) paired with activity access",
          "Natural consequences (successful movement, fun experience) as primary motivator",
          "Descriptive praise specifying correct behaviors ('you're keeping your balance')",
          "Non-contingent attention maintained throughout to support engagement"
        ],
        recommendations: [
          "Continue current reinforcement schedule; consider thinning to intermittent once skill consolidates",
          "Introduce peer models for observational learning opportunities",
          "Expand verbal behavior targets: tacting (labeling skating actions), intraverbals (answering questions about the activity)",
          "Data collection suggestion: Track number of independent pushes, duration of balance maintenance, frequency of requesting continuation",
          "Generalization planning: Vary surfaces, introduce different skating contexts, practice with different instructors",
          "Safety note: Maintain current level of physical proximity given skill level; ensure protective equipment always worn"
        ]
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 dark:text-indigo-300 mb-3">
            ABA Roller Skating Analysis
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Analyze roller skating activities with Applied Behavior Analysis methodology.
            Upload images to receive detailed behavioral observations, Portuguese transcription, and ABA technique identification.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-6">
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-3 text-indigo-500" />
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, or GIF (Multiple images supported)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 flex items-center">
                <FileImage className="w-5 h-5 mr-2" />
                Uploaded Images ({imagePreviews.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={preview}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg" />
                  </div>
                ))}
              </div>

              <button
                onClick={analyzeImages}
                disabled={isAnalyzing}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Analyze Images
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {analysis && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                Visual Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {analysis.visualDescription}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                ABA Observations & Transcriptions
              </h2>
              <div className="space-y-4">
                {analysis.observations.map((obs, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {obs.timestamp}
                      </h3>
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
                        {obs.technique}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {obs.description}
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          🇧🇷 Portuguese:
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                          "{obs.portuguese}"
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          🇬🇧 English:
                        </span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          "{obs.english}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                Behavior Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {analysis.behaviorSummary}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                Reinforcement Patterns Observed
              </h2>
              <ul className="space-y-2">
                {analysis.reinforcementPatterns.map((pattern, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{pattern}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2" />
                Recommendations
              </h2>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-600 dark:text-amber-400 mr-2 font-bold">
                      {idx + 1}.
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            This tool provides educational analysis based on Applied Behavior Analysis (ABA) principles.
          </p>
          <p>
            Note: This is a demonstration using simulated analysis. Production version would integrate with AI vision and speech recognition APIs.
          </p>
        </footer>
      </div>
    </div>
  );
}
