import React from 'react'

const Cards = ({card, handSelected, isFlipped, disabled}) => {
  const handleClick = () => {
    if (!disabled && !isFlipped && !card.matched) {
      handSelected(card)
    }
  }

  return (
    <div 
      className={`relative w-[120px] h-[160px] md:w-[140px] md:h-[180px] cursor-pointer transition-all duration-300 ${
        !disabled && !isFlipped && !card.matched ? 'hover:scale-105 hover:shadow-2xl' : ''
      } ${card.matched ? 'opacity-80 cursor-default' : ''}`}
      onClick={handleClick}
    >
      <div className={`absolute inset-0 rounded-xl overflow-hidden shadow-xl border-2 border-white/50 transition-all duration-300 ${
        isFlipped || card.matched ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}>
        <img 
          className='w-full h-full object-cover' 
          src={card.path} 
          alt="card"
        />
      </div>
      <div className={`absolute inset-0 rounded-xl overflow-hidden shadow-xl border-2 border-white/50 transition-all duration-300 ${
        isFlipped || card.matched ? 'opacity-0 z-0' : 'opacity-100 z-10'
      }`}>
        <img 
          className='w-full h-full object-cover' 
          src="/img/bg.png" 
          alt="card back"
        />
      </div>
    </div>
  )
}

export default Cards