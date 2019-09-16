import * as React from "react"

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
          Please enter the string you were given when you exported your command
          <br/><br/>
          <input autoFocus className="form-control" id="hotfix-input-cell" value={props.importingString} onChange={(event) => { props.setImportingString(event.target.value) }} />
          <br/><br/>
          <button className="btn btn-danger mr-3" onClick={() => { props.finishImporting(false) }}>Cancel</button>
          <button className="btn btn-success" onClick={() => { props.finishImporting(true) }}>Import</button>
        </div>
      </div>
    </div>
  );
}

export default Importing;