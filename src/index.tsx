import * as React from "react";
import * as ReactDOM from "react-dom";

import Tellraw from "./components/Tellraw";

import 'bootstrap';
import './styles/styles.scss';

// To use FA, we need to import the library object
import { library } from '@fortawesome/fontawesome-svg-core';
// As well as each icon we want to use
import {
  faEdit,
  faPlusCircle,
  faKeyboard,
  faTrophy,
  faUserTag,
  faTrashAlt,
  faClone,
  faTimesCircle,
  faFileAlt,
  faFileImport,
  faFileExport
} from '@fortawesome/free-solid-svg-icons';
// Then we add the icons to the library object
library.add(
  faEdit,
  faPlusCircle,
  faKeyboard,
  faTrophy,
  faUserTag,
  faTrashAlt,
  faClone,
  faTimesCircle,
  faFileAlt,
  faFileImport,
  faFileExport
)

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