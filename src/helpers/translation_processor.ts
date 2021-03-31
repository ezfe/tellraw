export type TranslationSet = { [key: string]: string }
type ParameterMatch = {
   match: string,
   matchIndex: number,
   index: number,
   length: number,
};

function reverse(str: string): string {
   return [...str].reverse().join("");
}

export function processParameters(enteredText: string, translationSet: TranslationSet): ParameterMatch[] {
   let translationString = enteredText;
   if (enteredText in translationSet) {
      translationString = translationSet[enteredText];
   }

   // const lookbehind = /(?<![^%](?:%%)*)%(?:([0-9]+)\$)?s/g;
   const reversedExp = /s(?:\$([0-9]+))?%(?!%(?:%%)*(?:[^%]|$))/g;

   const reversed = reverse(translationString);

   let matches: ParameterMatch[] = [];
   let execRes;
   while (execRes = reversedExp.exec(reversed)) {
      console.log('Matched:', execRes, translationString.length);
      matches.push({
         match: reverse(execRes[0]),
         matchIndex: execRes[1] ? parseInt(reverse(execRes[1])) : null,
         index: translationString.length - execRes.index - execRes[0].length,
         length: execRes[0].length,
      });
   }
   matches = matches.reverse();

   let nextIndex = 1;
   for (const match of matches) {
      if (!match.matchIndex) {
         match.matchIndex = nextIndex;
         nextIndex++;
      }
   }

   return matches;
}

export function parameterIndexes(enteredText: string, translationSet: TranslationSet): Set<number> {
   const matches = processParameters(enteredText, translationSet);

   const indexes = new Set<number>(); // starting from 1
   matches.forEach(m => {
      indexes.add(m.matchIndex);
   });

   return indexes;
}

export function countParameters(enteredText: string, translationSet: TranslationSet): number {
   const indexes = parameterIndexes(enteredText, translationSet);
   return Math.max(...indexes);
}