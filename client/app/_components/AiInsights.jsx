import React, { useState } from 'react'
import { FaWandMagicSparkles } from 'react-icons/fa6';
import axios from 'axios';

export default function AiInsights({ filtered }) {
    const [aiInsights, setAiInsights] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAiAnalysis = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gemini`, {
                userQuery: `Analyze the following data and provide insights: ${JSON.stringify(filtered)}`
            });

            setAiInsights(response.data.intent);
        } catch (error) {
            console.error("AI Analysis Error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            {isLoading && (
                <></>
            )}

            <button
                onClick={handleAiAnalysis}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
                <FaWandMagicSparkles style={{ fontSize: 14 }} />
                {isLoading ? "Analyzing…" : "AI Analysis"}
            </button>
            {/* AI Insights result */}
            {aiInsights && (

                <div className="mt-4 border border-gray-200 rounded-xl p-5 space-y-3">

                    <p className="text-sm font-medium text-gray-800">AI insights</p>

                    <p className="text-sm text-gray-600">{aiInsights.summary}</p>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Total rows</p>
                            <p className="text-lg font-medium text-gray-900">{aiInsights.totalRows}</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Total columns</p>
                            <p className="text-lg font-medium text-gray-900">{aiInsights.totalColumns}</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Top value</p>
                            <p className="text-lg font-medium text-gray-900 truncate">{aiInsights.topValue}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Key findings</p>
                        <ul className="space-y-1">
                            {aiInsights.keyFindings?.map((f, i) => (
                                <li key={i} className="text-sm text-gray-700 flex gap-2">
                                    <span className="text-gray-300 shrink-0">—</span>{f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Interesting Insights</p>
                        <p className="text-sm text-gray-700">{aiInsights.column}</p>
                    </div> */}
                </div>
            )}
        </div>
    )
}
