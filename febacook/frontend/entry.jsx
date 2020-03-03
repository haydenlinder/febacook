import React from 'react';
import ReactDOM from 'react-dom';
import { $createUser } from './util/user_api_util'

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")
    window.$createUser = user => $createUser(user).then((res) => console.log(res))
    ReactDOM.render( <h1>react is working</h1>, root )
})
