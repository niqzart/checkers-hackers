export const gameTypes = {
  RANDOM: {
    height: 8,
    width: 8,
    positions: (x, i) => Math.floor(Math.random() * 5 - 2),
  },
  RUSSIAN: {
    height: 8,
    width: 8,
    positions: (x, i) => i < 12 ? -1 : i > 19 ? 1 : 0,
  },
  INTERNATIONAL: {
    height: 10,
    width: 10,
    positions: (x, i) => i < 20 ? -1 : i > 29 ? 1 : 0,
  },
}