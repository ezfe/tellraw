import { GroupSnippet } from "../classes/Snippets/SnippetTypes/GroupSnippet";
import type { Snippet } from "../classes/Snippets/SnippetTypes/Snippet";
import { TextSnippet } from "../classes/Snippets/SnippetTypes/TextSnippet";
import type { TranslateSnippet } from "../classes/Snippets/SnippetTypes/TranslateSnippet";
import { copy_standard_attributes } from "./copy_standard_attributes";

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

function findTranslationString(enteredText: string, translationSet: TranslationSet): string {
   let translationString = enteredText;
   if (enteredText in translationSet) {
      translationString = translationSet[enteredText];
   }
   return translationString;
}

export function processParameters(enteredText: string, translationSet: TranslationSet): ParameterMatch[] {
   const translationString = findTranslationString(enteredText, translationSet);

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
   let max = 0;
   indexes.forEach(indx => {
      if (indx > max) max = indx;
   });
   return max;
}

export function previewGroupFromTranslate(snippet: TranslateSnippet, translationSet: TranslationSet): Snippet {
   const translationString = findTranslationString(snippet.translate, translationSet);
   const matches = processParameters(snippet.translate, translationSet);

   if (matches.length === 0) {
      const textSnippet = new TextSnippet(null);
      textSnippet.text = translationString;
      copy_standard_attributes(snippet, textSnippet);
      return textSnippet;
   }

   const groupSnippet = new GroupSnippet(null);
   copy_standard_attributes(snippet, groupSnippet);

   for (let i = 0; i < matches.length; i++) {
      const match = matches[i];

      if (i > 0) {
         const priorMatch = matches[i - 1];
         const middleSnippet = new TextSnippet(null);
         middleSnippet.text = translationString.slice(priorMatch.index + priorMatch.length, match.index);
         groupSnippet.children.push(middleSnippet);
      } else if (match.index > 0) {
         const firstSnippet = new TextSnippet(null);
         firstSnippet.text = translationString.slice(0, match.index);
         groupSnippet.children.push(firstSnippet);
      }

      const indexedParameter = snippet.parameters[match.matchIndex - 1];
      if (indexedParameter) {
         groupSnippet.children.push(indexedParameter);
      }
   }

   if (matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      if (lastMatch.index + lastMatch.length < translationString.length) {
         const lastSnippet = new TextSnippet(null);
         lastSnippet.text = translationString.slice(lastMatch.index + lastMatch.length, translationString.length);
         groupSnippet.children.push(lastSnippet);
      }
   }


   console.log('Transformed Translate Snippet', snippet, groupSnippet);

   return groupSnippet;
}