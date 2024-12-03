import React from 'react';

function RecommendationCard({ key, recommendation }) {
  return (
    <div
      key={key}
      className="text-gray-900  active:bg-gray-300 hover:bg-gray-200 transition-colors  mx-auto  bg-white rounded-lg border border-gray-300 shadow-lg p-2 w-full max-w-sm my-2 text-sm font-medium font-inter "
    >
      <a
        href={`https://leetcode.com/problems/${recommendation}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg p-2 "
      >
        <h2 className="text-sm font-medium font-inter text-black">
          {recommendation}
        </h2>
      </a>
    </div>
  );
}

export default RecommendationCard;
