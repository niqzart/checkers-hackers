import { RandomCheckers } from "../games/test"
import { RussianCheckers, InternationalCheckers } from "../games/checkers"


export function convertGametype(number) {
  switch (number) {
    case 0: return new RandomCheckers()
    case 1: return new RussianCheckers()
    case 2: return new InternationalCheckers()
  }
}
