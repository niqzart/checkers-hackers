import { Checker } from "../components/pieces"

export const gameTypes = {
  RANDOM: {
    height: 8,
    width: 8,
    positions: (_, i) => Math.floor(Math.random() * 5 - 2),
    isSquareAllowed: (i) => (Math.floor(i / 8) + i) % 2 === 1
  },
  RUSSIAN: {
    height: 8,
    width: 8,
    positions: (_, i) => ((Math.floor(i / 8) + i) % 2 === 1) && (i < 24 || i > 39) ?
      <Checker white={i > 32} king={false} /> : null,
    isSquareAllowed: (i) => (Math.floor(i / 8) + i) % 2 === 1
  },
  INTERNATIONAL: {
    height: 10,
    width: 10,
    positions: (_, i) => ((Math.floor(i / 10) + i) % 2 === 1) && (i < 40 || i > 59) ?
      <Checker white={i > 50} king={false} /> : null,
    isSquareAllowed: (_) => true
  },
}