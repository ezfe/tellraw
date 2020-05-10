import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons/faCodeBranch';
import { faDatabase } from '@fortawesome/free-solid-svg-icons/faDatabase';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons/faFileDownload';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faFileImport } from '@fortawesome/free-solid-svg-icons/faFileImport';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons/faKeyboard';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy';
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
import { faWifi } from '@fortawesome/free-solid-svg-icons/faWifi';
import 'bootstrap';
import * as React from "react";
import * as ReactDOM from "react-dom";
import Tellraw from "./components/Tellraw";
import { legacyStatePreparation } from "./helpers/loaders";
import './styles/styles.scss';
import { LSKEY_V116, LSKEY_VERSION } from './constants';
import { defaultVersion } from './helpers/versions';

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
  faTachometerAlt,
  faDatabase,
  faCodeBranch
)

// load legacy!
// this includes ALL localStorage key transformations
// and should happen first
legacyStatePreparation()

if (localStorage.getItem(LSKEY_V116) === "true" && defaultVersion == "1.15") {
  localStorage.removeItem(LSKEY_V116)
  localStorage.setItem(LSKEY_VERSION, "1.16")
}

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