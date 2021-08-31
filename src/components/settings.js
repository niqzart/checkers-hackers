import { Checker } from "../components/pieces"

export const gameTypes = {
  RANDOM: {
    height: 8,
    width: 8,
    positions: (_, i) => Math.floor(Math.random() * 5 - 2),
  },
  RUSSIAN: {
    height: 8,
    width: 8,
    positions: (_, i) => ((Math.floor(i / 8) + i) % 2 === 1) && (i < 24 || i > 39) ?
      <Checker white={i > 32} king={false} /> : null,
  },
  INTERNATIONAL: {
    height: 10,
    width: 10,
    positions: (_, i) => i < 40 ? -1 : i > 49 ? 1 : 0,
  },
}