import React from 'react';
import './FailureView.css';

const FailureView = ({ onRetry }) => (
  <div className="failure-view">
    <img src="https://assets.ccbp.in/frontend/react-js/list-creation-failure-lg-output.png" alt="failure" />
    <button onClick={onRetry}>Try Again</button>
  </div>
);

export default FailureView;