import * as React from 'react'
import { splitString } from '../helpers/spacer'

export const BookPreview: React.FunctionComponent = () => {
  const string = `Hello Minecraft this is a test of the word

  are you today? I'm great thank you anyways this is a test of the line wrapper`
  const split = splitString(string)
  return (
    <div className="book-preview">
      {
        split.map((text, index) => {
          return <span key={index}>{ text }<br /></span>
        })
      }
    </div>
  )
}