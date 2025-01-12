import { motion } from 'framer-motion';
import React, { useState } from 'react';

export function RandomizeWheel() {
    const [segments, setSegments] = useState([
        { color: 'bg-red-500', label: 'Segment 1' },
        { color: 'bg-blue-500', label: 'Segment 2' },
        { color: 'bg-green-500', label: 'Segment 3' },
        { color: 'bg-yellow-500', label: 'Segment 4' },
    ]);

    // Function to add a new segment
    const addSegment = (color: string, label: string) => {
        setSegments([...segments, { color, label }]);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="relative w-64 h-64 rounded-full overflow-hidden">
                {segments.map((segment, index) => (
                    <motion.div
                        key={index}
                        className={`absolute w-full h-full ${segment.color}`}
                        style={{
                            clipPath: `polygon(50% 50%, 100% 0%, 100% 100%)`,
                            transform: `rotate(${
                                index * (360 / segments.length)
                            }deg)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                ))}
            </div>
            <button
                onClick={() =>
                    addSegment(
                        'bg-purple-500',
                        `Segment ${segments.length + 1}`
                    )
                }
                className="mt-4 p-2 bg-gray-800 text-white rounded"
            >
                Add Segment
            </button>
        </div>
    );
}
