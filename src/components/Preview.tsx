import * as React from 'react';
import { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { CommandType, FeatureType, isFeatureAvailable } from '../data/templates';
import { formatSnippets } from '../helpers/formatter';

interface PreviewProps {
  commandType: CommandType
  snippets: Array<Snippet>
}

const Preview: React.FunctionComponent<PreviewProps> = ({ commandType, snippets }) => {
  const isBookPreview = isFeatureAvailable(commandType, FeatureType.bookPreview)  
  const bookPreviewClass = isBookPreview  ? "book-preview" : ""
  const className = "preview " + bookPreviewClass

  return (
    <div className="row mb-2">
      <div className="col offset-sm-2">
        <div className={className}>
          { formatSnippets(snippets) }
        </div>
      </div>
    </div>
  )
}

export default Preview