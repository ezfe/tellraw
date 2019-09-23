import * as React from "react"
import Button from "./generic/Button";

interface ImportingProps {
  importingString: string,
  setImportingString: (value: string) => void,
  finishImporting: (success: boolean) => void
}

const Importing: React.FunctionComponent<ImportingProps> = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 light-well" style={{ textAlign: "center" }}>
          <p className="mb-3">
            Please enter the string you were given when you exported your command
          </p>
          <input autoFocus className="form-control mb-3" id="hotfix-input-cell" value={props.importingString} onChange={(event) => { props.setImportingString(event.target.value) }} />
          <Button className="mr-3"
                  type="danger"
                  icon="times-circle"
                  onClick={() => { props.finishImporting(false) }}>
            Cancel
          </Button>
          <Button type="success"
                  icon="check-circle"
                  onClick={() => { props.finishImporting(true) }}>
            Import
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Importing;