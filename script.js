
const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {

  currentQuestionIndex++

  setNextQuestion()

})

function startGame() {

  startButton.classList.add('hide')

  shuffledQuestions = questions.sort(() => Math.random() - .5)

  currentQuestionIndex = 0

  questionContainerElement.classList.remove('hide')

  setNextQuestion()

}

function setNextQuestion() {

  resetState()

  showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {

  questionElement.innerText = question.question

  question.answers.forEach(answer => {

    const button = document.createElement('button')

    button.innerText = answer.text

    button.classList.add('btn')

    if (answer.correct) {

      button.dataset.correct = answer.correct

    }

    button.addEventListener('click', selectAnswer)

    answerButtonsElement.appendChild(button)

  })

}

function resetState() {

  clearStatusClass(document.body)

  nextButton.classList.add('hide')

  while (answerButtonsElement.firstChild) {

    answerButtonsElement.removeChild(answerButtonsElement.firstChild)

  }

}

function selectAnswer(e) {

  const selectedButton = e.target

  const correct = selectedButton.dataset.correct

  setStatusClass(document.body, correct)

  Array.from(answerButtonsElement.children).forEach(button => {

    setStatusClass(button, button.dataset.correct)

  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {

    nextButton.classList.remove('hide')

  } else {

    startButton.innerText = 'Restart'

    startButton.classList.remove('hide')

  }

}

function setStatusClass(element, correct) {

  clearStatusClass(element)

  if (correct) {

    element.classList.add('correct')

  } else {

    element.classList.add('wrong')

  }

}

function clearStatusClass(element) {

  element.classList.remove('correct')

  element.classList.remove('wrong')

}

const questions = [

  {

    question: 'Why does the size of our pupil become smaller when it is really bright?',

    answers: [

      { text: 'To reduce the amount of light that enters eye as too much light will damage the retina', correct: true },

      { text: 'Because the eye is really sensitive even with low amounts of light', correct: false }

    ]

  },

  {

    question: 'Which part of the ear cannot be repaired using medicine or surgery?',

    answers: [

      { text: 'Cochlea', correct: false },

      { text: 'Auditory Nerves', correct: true },

      { text: 'Ear Canals', correct: false },

      { text: 'Ossicles', correct: false }

    ]

  },

  {

    question: 'How many layers do we have in our skin?',

    answers: [

      { text: '4', correct: false },

      { text: '3', correct: true },

      { text: '2', correct: false },

      { text: '1', correct: false }

    ]

  },

  {

    question: 'Why do people use their fingers to read braille?',

    answers: [

      { text: '1', correct: false },

      { text: '8', correct: true }

    ]

  }

]