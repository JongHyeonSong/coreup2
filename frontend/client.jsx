import React, { useState } from 'react';
import ReactDom from 'react-dom'
import All from './components/All';

const e = React.createElement
const rootEl = document.querySelector("#root")



ReactDom.render(e(All, rootEl.dataset), rootEl)