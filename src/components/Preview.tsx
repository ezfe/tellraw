import * as React from 'react';
import { ResizableBox } from 'react-resizable';
import { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { CommandType, FeatureType, isFeatureAvailable } from '../data/templates';
import { formatSnippets } from '../helpers/formatter';

interface PreviewProps {
  commandType: CommandType
  snippets: Array<Snippet>
}

interface SubPreviewProps {
  snippets: Array<Snippet>
}

const BookPreview: React.FunctionComponent<SubPreviewProps> = ({ snippets }) => {
  let [bookPage, setBookPage] = React.useState(0)

  return (
    <div key="book-preview-div" className="preview book-preview">
      { formatSnippets(snippets, bookPage) }
    </div>
  )
}

const RegularPreview: React.FunctionComponent<SubPreviewProps> = ({ snippets }) => {
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
        { isBookPreview ? <BookPreview snippets={snippets} /> : <RegularPreview snippets={snippets} /> }
      </div>
    </div>
  )
}

export default Preview