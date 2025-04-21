import React, { useState } from 'react'

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }

  return (
    <div
        style={{
            backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            minHeight: '100vh',
            padding: '2rem',
            transition: 'all 0.3s ease'
        }}
    >
      <h1>Welcome to Dark mode Light mode</h1>
      <button onClick={toggleTheme}>
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}

export default DarkMode
