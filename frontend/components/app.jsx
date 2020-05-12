import React from 'react';
import Home from './home';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './header';
import { closeModal, toggleDropdowns, closeModals } from '../util/ui_util';

class App extends React.Component {
    constructor(props){
        super(props)
    }

    format() {
        setInterval(() => {
            let pics = document.getElementsByClassName('not-resized');
            for (let i = 0; i < pics.length; i++) {
                if (pics[i].offsetHeight > pics[i].offsetWidth) {
                    pics[i].style.width = '100%';
                    pics[i].style.height = 'auto';
                } else {
                    pics[i].style.height = '100%';
                    pics[i].style.width = 'auto';
                }
            }
        }, 200);
    }

    render(){
        this.format();
        return(
            <div 
                className="app-container"
                onClick={(e) => {
                    toggleDropdowns(e);
                    closeModals();
                }}
            >
                <div
                    id="background-modal"
                    className="modal-hide"
                    onClick={() => {
                        // closeModal('background-modal');
                        // closeModal('edit-profile-modal')
                        // closeModal('post-form-modal')
                        // closeModal('update-photo-modal')
                        closeModals();
                    }}
                ></div>
                <Header /> 

                <Switch >
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        )
    }
}


export default withRouter(App);