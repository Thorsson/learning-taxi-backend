import React, { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';

interface BurgerProps {
  onClick: () => void;
}

export const Burger: React.FC<BurgerProps> = ({ onClick }) => {
  return (
    <div className="burger md:hidden">
      <AnimatedHamburgerButton onClick={onClick} />
    </div>
  );
};

interface AnimatedHamburgerButtonProps {
  onClick: () => void;
}

const AnimatedHamburgerButton: React.FC<AnimatedHamburgerButtonProps> = ({ onClick }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
    onClick(); 
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={handleClick}
        className="relative h-16 w-16 rounded-full bg-white/0 transition-colors hover:bg-white/20 mb-2"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-gray-800"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-gray-800"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-10 bg-gray-800"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: '50%',
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: '50%',
    },
  },
};

const NavigationMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <h1 className="text-center my-10 text-4xl">Responsive Navigation Sidebar</h1>
      <nav className="flex flex-col md:flex-row bg-gray-200 p-5">
        <div className="flex flex-wrap justify-between items-center w-full">
          <div>
            Logo goes here...
          </div>
          <Burger onClick={toggleMenu} />
        </div>
        <ul className={`links md:flex flex-col md:flex-row text-center w-full md:justify-around ${isMenuOpen ? '' : 'hidden'}`}>
          <li>
            <a href="#" className="block p-5">
              1 item
            </a>
          </li>
          <li>
            <a href="#" className="block p-5">
              2 item
            </a>
          </li>
          <li>
            <a href="#" className="block p-5">
              3 item
            </a>
          </li>
          <li>
            <a href="#" className="block p-5">
              4th item
            </a>
          </li>
          <li>
            <a href="#" className="block p-5">
              5th item
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationMenu;