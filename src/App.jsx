import React, { useEffect, useState } from 'react'
import Cards from './components/Cards'

function App() {
  const defaultCrds = [
    {
      id: 1,
      path: '/img/bici.jpg',
      matched: false,
    },
    {
      id: 2,
      path: '/img/efso.jpg',
      matched: false,
    },
    {
      id: 3,
      path: '/img/ili.jpg',
      matched: false,
    },
    {
      id: 4,
      path: '/img/kamil.jpg',
      matched: false,
    },
    {
      id: 5,
      path: '/img/mahmut.jpg',
      matched: false,
    },
    {
      id: 6,
      path: '/img/tima.jpg',
      matched: false,
    },
  ]

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const prepareCards = () => {
    const shuffledCards = [...defaultCrds, ...defaultCrds]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
      }))

    setCards(shuffledCards)
    setTurns(0)
    setScore(0)
    setGameWon(false)
    setDisabled(false)
  }

  const handleCardClick = (clickedCard) => {
    if (disabled || clickedCard.isFlipped || clickedCard.matched) return

    const newCards = cards.map((card) => {
      if (card.id === clickedCard.id) {
        return { ...card, isFlipped: true }
      }
      return card
    })

    setCards(newCards)

    const flippedCards = newCards.filter((card) => card.isFlipped && !card.matched)

    if (flippedCards.length === 2) {
      setDisabled(true)
      const [first, second] = flippedCards

      if (first.path === second.path) {
        // Eşleşme var!
        setTimeout(() => {
          setCards((prevCards) => {
            const updated = prevCards.map((card) =>
              card.path === first.path ? { ...card, matched: true, isFlipped: true } : card
            )
            return updated
          })
          setScore((prev) => prev + 10)
          setDisabled(false)
        }, 1000)
      } else {
        // Eşleşme yok, kartları geri çevir
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setDisabled(false)
        }, 1500)
      }

      setTurns((prev) => prev + 1)
    }
  }

  useEffect(() => {
    prepareCards()
  }, [])

  useEffect(() => {
    if (cards.length > 0) {
      const allMatched = cards.every((card) => card.matched)
      if (allMatched) {
        setGameWon(true)
      }
    }
  }, [cards])

  return (
    <section className='min-h-screen flex flex-col items-center justify-center gap-6 py-8 px-4'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold mb-2 text-white drop-shadow-lg'>
          🎮 1 IQ bulma oyunu
        </h1>
      </div>

      <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30'>
        <div className='flex justify-center gap-8 mb-4 text-white'>
          <div className='text-center'>
            <div className='text-2xl font-bold'>{turns}</div>
            <div className='text-sm opacity-90'>Hamle</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold'>{score}</div>
            <div className='text-sm opacity-90'>Puan</div>
          </div>
        </div>

        <button
          onClick={prepareCards}
          className='w-full px-6 py-3 bg-white text-pink-600 rounded-xl font-bold text-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          🎲 Yeni Oyun
        </button>
      </div>

      {gameWon && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-8 text-center shadow-2xl transform scale-100 animate-bounce-in'>
            <h2 className='text-4xl font-bold text-pink-600 mb-4'>🎉 Tebrikler!</h2>
            <p className='text-xl mb-2'>Oyunu tamamladın!</p>
            <p className='text-lg text-gray-600 mb-4'>
              Toplam Hamle: {turns} | Toplam Puan: {score}
            </p>
            <button
              onClick={prepareCards}
              className='px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-all duration-200'
            >
              Tekrar Oyna
            </button>
          </div>
        </div>
      )}

      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl justify-items-center'>
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            handSelected={handleCardClick}
            isFlipped={card.isFlipped}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  )
}

export default App
