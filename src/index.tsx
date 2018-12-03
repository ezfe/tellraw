import * as React from "react";
import * as ReactDOM from "react-dom";

import Tellraw from "./components/Tellraw";

import 'bootstrap';
import './styles/styles.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faPlusCircle)

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