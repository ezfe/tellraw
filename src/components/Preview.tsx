import * as React from 'react';
import { ResizableBox } from 'react-resizable';
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

interface BookPreviewProps {
  snippets: Array<Snippet>
  bookPage: number
}

const BookPreview: React.FunctionComponent<BookPreviewProps> = ({ snippets, bookPage }) => {
  return (
    <div key="book-preview-div" className="preview book-preview ml-3 mr-3">
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
  let [bookPage, setBookPage] = React.useState(0)

  const isBookPreview = isFeatureAvailable(commandType, FeatureType.bookPreview)  
  const bookPreviewClass = isBookPreview  ? "book-preview" : ""
  const className = "preview " + bookPreviewClass

  let [bookPreviewDisclaimerShown, setBookPreviewDisclaimerShown] = useLocalStorage("20190927-book-preview-disclaimer", false)

  return (
    <>
      <div className="row mb-2">
        <div className="col-8 offset-2 d-flex align-items-center justify-content-center">
          <div>
            {
              isBookPreview ? (
                <Button style={{ width: "150px" }}
                        type="light"
                        icon="arrow-circle-left"
                        onClick={() => {
                          if (bookPage > 0) {
                            setBookPage(bookPage - 1)
                          }
                        }}>
                  Previous
                </Button>
              ) : null
            }
          </div>
          { isBookPreview ? <BookPreview bookPage={bookPage} snippets={snippets} /> : <RegularPreview snippets={snippets} /> }
          <div>
            {
              isBookPreview ? (
                <Button style={{ width: "150px" }}
                        type="light"
                        iconRight="arrow-circle-right"
                        onClick={() => {
                          const bookLength = snippets.filter(s => { return s instanceof PagebreakSnippet }).length + 1
                          if (bookPage < bookLength) {
                            setBookPage(bookPage - 1)
                          }
                        }}>
                  Next
                </Button>
              ) : null
            }
          </div>
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