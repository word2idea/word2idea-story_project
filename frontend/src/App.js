// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://127.0.0.1:8000';

function App() {
  const [words, setWords] = useState([]);
  const [currentStory, setCurrentStory] = useState('');
  const [savedStories, setSavedStories] = useState([]);

  // 1. 단어 개수를 저장할 상태 변수를 새로 추가합니다. (기본값 3)
  const [wordCount, setWordCount] = useState(3);

  // 2. API 호출 함수를 수정하여 wordCount 값을 파라미터로 넘깁니다.
  const fetchWords = async () => {
    const response = await fetch(`${API_URL}/api/stories/words/?count=${wordCount}`);
    const data = await response.json();
    setWords(data.words);
  };

  const fetchStories = async () => {
    const response = await fetch(`${API_URL}/api/stories/`);
    const data = await response.json();
    setSavedStories(data);
  };

  useEffect(() => {
    fetchWords();
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 처음 한 번만 실행되도록 유지

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/stories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: currentStory }),
    });
    setCurrentStory('');
    fetchStories();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>나만의 이야기 만들기 (Django + React)</h1>

        {/* 3. 단어 개수를 선택하는 슬라이더 UI 추가 */}
        <div className="word-count-selector">
          <label htmlFor="wordCount">단어 개수 선택: {wordCount}개</label>
          <input
            type="range"
            id="wordCount"
            min="2"
            max="6"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
          />
        </div>

        <div className="word-box">
          <p>{words.join(', ')}</p>
          {/* 버튼 클릭 시 수정된 fetchWords 함수가 호출됩니다. */}
          <button onClick={fetchWords}>생각의 점 만들기</button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="story-textarea"
            rows="10"
            value={currentStory}
            onChange={(e) => setCurrentStory(e.target.value)}
            placeholder="위 단어를 모두 사용하여 이야기를 만들어보세요..."
          />
          <button type="submit" className="submit-button">이야기 저장하기</button>
        </form>

        <div className="story-list">
          <h2>저장된 이야기들</h2>
          <ul>
            {savedStories.map((story) => (
              <li key={story.id}>{story.text}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;