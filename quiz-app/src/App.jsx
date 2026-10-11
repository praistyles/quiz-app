import { useEffect, useState } from 'react'
import './App.css'

const LETTERS = ['A', 'B', 'C', 'D']

const ICON_BG = {
  HTML: 'html',
  CSS: 'css',
  JavaScript: 'js',
  Accessibility: 'accessibility',
}

function normalizeIcon(path) {
  if (!path) return ''
  return path.replace(/^\.\//, '/')
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <div className="theme-toggle">
      <img
        src={isDark ? '/assets/images/icon-sun-light.svg' : '/assets/images/icon-sun-dark.svg'}
        alt=""
        width={24}
        height={24}
      />
      <button
        type="button"
        className="theme-toggle__switch"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={onToggle}
      >
        <span className="theme-toggle__knob" />
      </button>
      <img
        src={isDark ? '/assets/images/icon-moon-light.svg' : '/assets/images/icon-moon-dark.svg'}
        alt=""
        width={24}
        height={24}
      />
    </div>
  )
}

function QuizHeader({ quiz, theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="app-header__subject">
        {quiz && (
          <>
            <span className={`subject-icon subject-icon--${ICON_BG[quiz.title]}`}>
              <img src={normalizeIcon(quiz.icon)} alt="" width={28} height={28} />
            </span>
            <span className="app-header__title">{quiz.title}</span>
          </>
        )}
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

function Menu({ quizzes, onSelect }) {
  return (
    <div className="layout">
      <div className="layout__intro">
        <h1 className="heading">
          <span className="heading__light">Welcome to the</span>
          <span className="heading__bold">Frontend Quiz!</span>
        </h1>
        <p className="intro-text">Pick a subject to get started.</p>
      </div>
      <ul className="option-list">
        {quizzes.map((quiz) => (
          <li key={quiz.title}>
            <button
              type="button"
              className="card-btn"
              onClick={() => onSelect(quiz)}
            >
              <span className={`subject-icon subject-icon--${ICON_BG[quiz.title]}`}>
                <img src={normalizeIcon(quiz.icon)} alt="" width={28} height={28} />
              </span>
              <span>{quiz.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Question({
  quiz,
  questionIndex,
  selectedOption,
  isSubmitted,
  showError,
  onSelectOption,
  onSubmit,
  onNext,
}) {
  const question = quiz.questions[questionIndex]
  const total = quiz.questions.length
  const progress = ((questionIndex + 1) / total) * 100
  const isCorrect = selectedOption === question.answer

  return (
    <div className="layout">
      <div className="layout__intro layout__intro--quiz">
        <p className="question-meta">
          Question {questionIndex + 1} of {total}
        </p>
        <h2 className="question-text">{question.question}</h2>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={questionIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Question ${questionIndex + 1} of ${total}`}
        >
          <div className="progress__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="layout__actions">
        <ul className="option-list">
          {question.options.map((option, index) => {
            let stateClass = ''
            if (selectedOption === option && !isSubmitted) {
              stateClass = 'is-selected'
            }
            if (isSubmitted) {
              if (option === question.answer) stateClass = 'is-correct'
              else if (selectedOption === option) stateClass = 'is-incorrect'
            }

            return (
              <li key={option}>
                <button
                  type="button"
                  className={`card-btn option-btn ${stateClass}`}
                  onClick={() => onSelectOption(option)}
                  disabled={isSubmitted}
                  aria-pressed={selectedOption === option}
                >
                  <span className="option-letter">{LETTERS[index]}</span>
                  <span className="option-text">{option}</span>
                  {isSubmitted && option === question.answer && (
                    <img
                      className="option-status"
                      src="/assets/images/icon-correct.svg"
                      alt="Correct"
                      width={30}
                      height={30}
                    />
                  )}
                  {isSubmitted &&
                    selectedOption === option &&
                    option !== question.answer && (
                      <img
                        className="option-status"
                        src="/assets/images/icon-incorrect.svg"
                        alt="Incorrect"
                        width={30}
                        height={30}
                      />
                    )}
                </button>
              </li>
            )
          })}
        </ul>

        {!isSubmitted ? (
          <button type="button" className="primary-btn" onClick={onSubmit}>
            Submit Answer
          </button>
        ) : (
          <button type="button" className="primary-btn" onClick={onNext}>
            {questionIndex === total - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}

        {showError && (
          <p className="error-msg" role="alert">
            <img src="/assets/images/icon-error.svg" alt="" width={24} height={24} />
            Please select an answer
          </p>
        )}

        {isSubmitted && (
          <p className="sr-only" role="status">
            {isCorrect ? 'Correct answer' : `Incorrect. The correct answer is ${question.answer}`}
          </p>
        )}
      </div>
    </div>
  )
}

function Results({ quiz, score, onPlayAgain }) {
  const total = quiz.questions.length

  return (
    <div className="layout">
      <div className="layout__intro">
        <h1 className="heading">
          <span className="heading__light">Quiz completed</span>
          <span className="heading__bold">You scored...</span>
        </h1>
      </div>

      <div className="layout__actions">
        <div className="score-card">
          <div className="score-card__subject">
            <span className={`subject-icon subject-icon--${ICON_BG[quiz.title]}`}>
              <img src={normalizeIcon(quiz.icon)} alt="" width={28} height={28} />
            </span>
            <span>{quiz.title}</span>
          </div>
          <p className="score-card__value">{score}</p>
          <p className="score-card__total">out of {total}</p>
        </div>
        <button type="button" className="primary-btn" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}

function App() {
  const [quizzes, setQuizzes] = useState([])
  const [screen, setScreen] = useState('menu')
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showError, setShowError] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('quiz-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('quiz-theme', theme)
  }, [theme])

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      try {
        const res = await fetch('data.json')
        if (!res.ok) throw new Error('Failed to load quiz data')
        const data = await res.json()
        if (!cancelled) {
          setQuizzes(data.quizzes)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    loadData()
    return () => {
      cancelled = true
    }
  }, [])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  function handleSelectQuiz(quiz) {
    setSelectedQuiz(quiz)
    setQuestionIndex(0)
    setSelectedOption(null)
    setIsSubmitted(false)
    setScore(0)
    setShowError(false)
    setScreen('quiz')
  }

  function handleSelectOption(option) {
    if (isSubmitted) return
    setSelectedOption(option)
    setShowError(false)
  }

  function handleSubmit() {
    if (!selectedOption) {
      setShowError(true)
      return
    }

    const current = selectedQuiz.questions[questionIndex]
    if (selectedOption === current.answer) {
      setScore((prev) => prev + 1)
    }
    setIsSubmitted(true)
    setShowError(false)
  }

  function handleNext() {
    if (questionIndex >= selectedQuiz.questions.length - 1) {
      setScreen('results')
      return
    }

    setQuestionIndex((prev) => prev + 1)
    setSelectedOption(null)
    setIsSubmitted(false)
    setShowError(false)
  }

  function handlePlayAgain() {
    setSelectedQuiz(null)
    setQuestionIndex(0)
    setSelectedOption(null)
    setIsSubmitted(false)
    setScore(0)
    setShowError(false)
    setScreen('menu')
  }

  if (loading) {
    return (
      <div className="app">
        <QuizHeader quiz={null} theme={theme} onToggleTheme={toggleTheme} />
        <main className="app-main">
          <p className="status-text">Loading quizzes…</p>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <QuizHeader quiz={null} theme={theme} onToggleTheme={toggleTheme} />
        <main className="app-main">
          <p className="status-text" role="alert">
            {error}
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <QuizHeader
        quiz={screen === 'menu' ? null : selectedQuiz}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="app-main">
        {screen === 'menu' && <Menu quizzes={quizzes} onSelect={handleSelectQuiz} />}
        {screen === 'quiz' && selectedQuiz && (
          <Question
            quiz={selectedQuiz}
            questionIndex={questionIndex}
            selectedOption={selectedOption}
            isSubmitted={isSubmitted}
            showError={showError}
            onSelectOption={handleSelectOption}
            onSubmit={handleSubmit}
            onNext={handleNext}
          />
        )}
        {screen === 'results' && selectedQuiz && (
          <Results quiz={selectedQuiz} score={score} onPlayAgain={handlePlayAgain} />
        )}
      </main>
    </div>
  )
}

export default App
