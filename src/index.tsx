import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faClone, faEdit, faExclamationTriangle, faFileAlt, faFileDownload, faFileExport, faFileImport, faKeyboard, faList, faPlusCircle, faTachometerAlt, faTimesCircle, faTrashAlt, faTrophy, faUserTag, faWifi, faCheckCircle, faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap';
import * as React from "react";
import * as ReactDOM from "react-dom";
import Tellraw from "./components/Tellraw";
import { legacyStatePreparation } from "./helpers/loaders";
import './styles/styles.scss';



// Then we add the icons to the library object
library.add(
  faEdit,
  faPlusCircle,
  faCheckCircle,
  faTimesCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
  faKeyboard,
  faTrophy,
  faUserTag,
  faTrashAlt,
  faClone,
  faFileAlt,
  faFileImport,
  faFileExport,
  faExclamationTriangle,
  faList,
  faTwitter,
  faWifi,
  faFileDownload,
  faTachometerAlt
)

// load legacy!
// this includes ALL localStorage key transformations
// and should happen first
legacyStatePreparation()

// Increment load count
localStorage.setItem("loadCount", (1 + parseInt(localStorage.getItem("loadCount") || "0")).toString())

// Set initial load
if (localStorage.getItem("initialTimestamp") === null) {
  localStorage.setItem("initialTimestamp", new Date().getTime().toString());
}

if (localStorage.getItem("donateStatus") === null) {
  localStorage.setItem("donateStatus", "unprompted");
}

ReactDOM.render(
  <Tellraw />,
  document.getElementById("app")
);