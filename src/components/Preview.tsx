import * as React from 'react';
import { Snippet } from '../classes/Snippets/SnippetTypes/Snippet';
import { CommandType, FeatureType, isFeatureAvailable } from '../data/templates';
import { formatSnippets } from '../helpers/formatter';
import Button from './generic/Button';
import { PagebreakSnippet } from '../classes/Snippets/SnippetTypes/PagebreakSnippet';
import { useLocalStorage } from '../helpers/useLocalStorage';

interface PreviewProps {
  commandType: CommandType
  snippets: Array<Snippet>
}

interface SubPreviewProps {
  snippets: Array<Snippet>
}

const BookPreview: React.FunctionComponent<SubPreviewProps> = ({ snippets }) => {
  let [bookPage, setBookPage] = React.useState(1)
  const pageCount = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1

  return (
    <>
      <div>
        <Button style={{ width: "150px" }}
                type="light"
                icon="arrow-circle-left"
                disabled={bookPage <= 1}
                onClick={() => { setBookPage(bookPage - 1) }}>
          Previous
        </Button>
      </div>
      <div key="book-preview-div" className="preview book-preview ml-3 mr-3">
        <div style={{ overflowY: "scroll", height: "100%", width: "100%" }}>
          { formatSnippets(snippets, bookPage) }
        </div>
      </div>
      <div>
        <Button style={{ width: "150px" }}
                type="light"
                iconRight="arrow-circle-right"
                disabled={bookPage >= pageCount}
                onClick={() => { setBookPage(bookPage + 1) }}>
          Next
        </Button>
      </div>
    </>
  )
}

const RegularPreview: React.FunctionComponent<SubPreviewProps> = ({ snippets }) => {
  let [backgroundColor, setBackgroundColor] = useLocalStorage('20191003-preview-background-color', '#ffffff');

  return (
    <div className="preview" style={{ minHeight: '300px', backgroundColor }}>
      { formatSnippets(snippets) }
      <input className="preview-color-picker" type="color" value={backgroundColor} onChange={(evt) => { setBackgroundColor(evt.target.value) }} />
    </div>
  )
}

const Preview: React.FunctionComponent<PreviewProps> = ({ commandType, snippets }) => {
  const isBookPreview = isFeatureAvailable(commandType, FeatureType.bookPreview)  
  const bookPreviewClass = isBookPreview  ? "d-flex align-items-center justify-content-center" : ""

  let [bookPreviewDisclaimerShown, setBookPreviewDisclaimerShown] = useLocalStorage("20190927-book-preview-disclaimer", false)

  return (
    <>
      <div className="row mb-2">
        <div className={`col-sm-10 col-md-8 offset-sm-2 ${bookPreviewClass}`}>
          { isBookPreview ? <BookPreview snippets={snippets} /> : <RegularPreview snippets={snippets} /> }
        </div>
      </div>
      {
        (isBookPreview && !bookPreviewDisclaimerShown) ? (
          <div className="row mb-2">
            <div className="col-8 offset-2">
              <p>
                Please understand that it is difficult for me to
                replicate the same text size and wrapping behavior as in regular Minecraft.
              </p>
              <p>
                You should verify that it looks correct from time-to-time in-game as well,
                as some text may not fit when it appears as though it will here!
              </p>
              <Button icon="check-circle" type="info" onClick={() => { setBookPreviewDisclaimerShown(true) }}>OK</Button>
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default Preview