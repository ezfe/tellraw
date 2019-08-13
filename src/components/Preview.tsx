import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { CommandType, FeatureType, isFeatureAvailable } from '../data/templates';
import { formatSnippets } from '../helpers/formatter';

interface PreviewProps {
  commandType: CommandType
  snippets: Array<Snippet>
}

function bookPreview(snippets: Array<Snippet>) {
  return (
    <div key="book-preview-div" className="preview book-preview">
      { formatSnippets(snippets) }
    </div>
  )
}

function regularPreview(snippets: Array<Snippet>) {
  return (
    <ResizableBox key="regular-preview-div" className="preview" width={600} height={300} axis="x">
      { formatSnippets(snippets) }
    </ResizableBox>
  )
}

const Preview: React.FunctionComponent<PreviewProps> = ({ commandType, snippets }) => {
  const isBookPreview = isFeatureAvailable(commandType, FeatureType.bookPreview)  
  const bookPreviewClass = isBookPreview  ? "book-preview" : ""
  const className = "preview " + bookPreviewClass

  return (
    <div className="row mb-2">
      <div className="col offset-sm-2">
        { isBookPreview ? bookPreview(snippets) : regularPreview(snippets) }
      </div>
    </div>
  )
}

export default Preview