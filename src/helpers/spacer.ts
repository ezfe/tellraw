import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

const defaultWidth = 5
const spacer = 1
const maxLineWidth = 114

const overrides = {
  "f": 4,
  "i": 1,
  "k": 4,
  "l": 2,
  "t": 3,
  "I": 3,
  " ": 3,
  ",": 1,
  "'": 1
}

function characterWidth(char: string): number {
  return overrides[char] || defaultWidth
}

function stringWidth(str: string): number {
  return str.split("").reduce((a, b) => {
    return a + characterWidth(b) + spacer
  }, 0)
}

interface NextStringReturned {
  found: string,
  remaining: string
}

function nextString(source: string, maxWidth: number): NextStringReturned {
  let accumulator = Array<string>()
  let accumulatorWidth = 0

  const spaceSplit = source.split(" ")
  for (const word of spaceSplit) {
    const wordWidth = stringWidth(word)
    if (wordWidth > maxLineWidth) {
      let charSplit = word.split("")

      let charAccumulator = Array<string>()
      let remWidth = maxLineWidth - accumulatorWidth

      for (const char of charSplit) {
        const charWidth = characterWidth(char) + spacer
        if (remWidth >= charWidth) {
          charAccumulator.push(char)
          remWidth -= charWidth
        } else {
          accumulator.push(charAccumulator.join(""))
          break
        }
      }
      break
    } else {
      if (accumulatorWidth + wordWidth <= maxLineWidth) {
        accumulator.push(word)
        accumulatorWidth += wordWidth
      } else {
        break
      }
    }
    accumulatorWidth += characterWidth(" ")
  }

  const found = accumulator.join(" ")
  const offset = found.length
  const found2 = source.substr(0, offset)
  const remaining = source.substr(offset)
 
  console.log("Source", source)
  console.log("Found", found, found2)
  console.log("Remain", remaining)

  return { found, remaining }
}

export function splitString(str: string): Array<string> {
  let accumulator = Array<string>()
  
  let unprocessed = str
  while (unprocessed.length > 0) {
    const next = nextString(unprocessed, maxLineWidth)
    accumulator.push(next.found)
    unprocessed = next.remaining
  }

  return accumulator
}