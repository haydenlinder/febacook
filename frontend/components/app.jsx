import React from 'react';
import Home from './home';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import { closeModal, toggleDropdowns } from '../util/ui_util';

setInterval(() => {
    let pics = document.getElementsByClassName('not-resized');
    for (let i = 0; i < pics.length; i++) {
        let width = pics[i].offsetWidth;
        let height = pics[i].offsetHeight;
        let wTh = width/height;
        if (height < width) {
            let parentHeight = pics[i].parentElement.offsetHeight;
            pics[i].style.height =  '100%'
            pics[i].style.width = wTh*parentHeight + 'px'
        } else {
            let parentWidth = pics[i].parentElement.offsetHeight;
            pics[i].style.width =  '100%'
            pics[i].style.height = parentWidth/wTh + 'px'
        }
        pics[i].classList.remove('not-resized');
    }
}, 200);

const App = () => (
    <div 
        className="app-container"
        onClick={toggleDropdowns}
    >
        <div
            id="background-modal"
            className="modal-hide"
            onClick={() => {
                closeModal('background-modal');
                closeModal('edit-profile-modal')
                closeModal('post-form-modal')
                closeModal('update-photo-modal')
            }}
        ></div>
        <Header /> 
        <Switch >
            <Route path="/" component={Home}/>
        </Switch>
    </div>
)

export default App;