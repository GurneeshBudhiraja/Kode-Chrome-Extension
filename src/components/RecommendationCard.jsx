import React from 'react';

function RecommendationCard({ key, recommendation }) {
  return (
    <div
      key={key}
      className="bg-gray-800 rounded-lg border border-gray-700 shadow-md p-2 w-full max-w-sm"
    >
      <a
        href={`https://leetcode.com/problems/${recommendation}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-gray-700 rounded-lg p-2 transition-colors"
      >
        <h2 className="text-sm font-medium font-inter text-gray-100">
          {recommendation}
        </h2>
      </a>
    </div>
  );
}

export default RecommendationCard;
