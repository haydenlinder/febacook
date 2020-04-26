import React from 'react';
import { closeModal } from '../../../util/ui_util';

class UpdatePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {}
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const photo = Object.values(this.state.photo)[0];
        // const photos = this.state.photos
        const formData = new FormData();
        formData.append(`user[${this.props.type}_photo]`, photo);
        formData.append('user[id]', this.props.user.id);
        this.props.updateUser(formData)
            .then(() => {
                closeModal('update-photo-modal');
                closeModal('background-modal')
                this.setState({ photo: {} });
            });
    };

    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = (event) => {
            let newPhoto = { [event.target.result]: file };
            this.setState({ photo: newPhoto });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        };
    };

    render() {
        let empty = !Object.values(this.state.photo).length
        return (

            <div id="update-photo-modal" 
                className="edit-user-form modal-hide"
                onClick={e => {
                    closeModal('edit-profile-modal')
                    closeModal('update-photo-modal')
                    closeModal('background-modal')
                }}    
            >
                <div className="photo-modal-inner"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="label">
                        Choose Photo
                    </div>

                    <label for="update-photo" className="update-photo-add">+
                        <input 
                            type="file" 
                            name="update-photo" 
                            id="update-photo"
                            onChange={(e) => this.handleFile(e)}
                        />
                    </label>
                    <div className="preview-container">
                        <img className="preview-image" src={Object.keys(this.state.photo)[0]} alt=""/>
                    </div>
                    {empty ?
                    null
                    :
                    <button 
                        className="login"
                        onClick={(e) => this.handleSubmit(e)}
                    >Update</button>
                    }
                </div>
            </div>
        )
    }

};

export default UpdatePhoto;