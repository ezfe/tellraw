export type TranslationSet = { [key: string]: string }
type ParameterMatch = {
   match: string,
   index: number,
   length: number,
};

function reverse(str: string): string {
   return [...str].reverse().join("");
}

export function countParameters(enteredText: string, translationSet: TranslationSet): number {
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
         index: translationString.length - execRes.index - execRes[0].length,
         length: execRes[0].length,
      });
   }
   matches = matches.reverse();

   console.log(matches);

   return matches.length;
}