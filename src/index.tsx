import * as React from "react";
import * as ReactDOM from "react-dom";

import Tellraw from "./components/Tellraw";

import 'bootstrap';
import './styles/styles.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faPlusCircle)

ReactDOM.render(
  <Tellraw />,
  document.getElementById("app")
);