import React, { Component } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Photo from './components/Photo'
import Logout from './components/Logout'
import './stylesheets/profile.css'
import firebase_storage from './utils/firebase/index'
import { connect } from 'react-redux'
import { getProfile, updateProfile } from '../../redux/actions/profileActions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      input_file_path: '',
      url: '',
      progress: Number
    }
  }
  handleChange = (e) => {
    const file = e.target.files[0]
    if(!file) return
    this.setState({
      input_file_path: (window.URL || window.webkitURL).createObjectURL(file)
    })
    //upload to firebase and fetch image url
    const uploadTask = firebase_storage.ref(`images/${file.name}`).put(file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase_storage.ref('images').child(file.name).getDownloadURL().then(url => {
          this.setState({ url });
          //send put request to update user info
          this.props.updateProfile({
            "avatar_url": url
          }).catch(err => alert("unexpected image format"))
        })
      });
  }
  componentDidMount() {
    if (!Object.keys(this.props.user).length) this.props.getProfile()
  }
  render() {
    const user = this.props.user
    if(!user) return null
    return (
      <div className="profile">
        <Header
          img={user.avatar_url||'/avatar_default.jpg'}
          input_file_path={this.state.input_file_path}
          id={user.id}
          handleChange={this.handleChange}
        />
        <div className="profile_content">
          <div className="box">
            <Photo
              img={user.avatar_url||'/avatar_default.jpg'}
              input_file_path={this.state.input_file_path}
              id={user.id}
              handleChange={this.handleChange}
            />
            {Object.keys(user).length > 0
              && !this.props.profile_loading
              &&
              <Form
                id={user.id}
                email={user.email}
                name={user.name}
                gender={user.gender}
                description={user.description}
                updateProfile={this.props.updateProfile}
              />}
              <Logout/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStoretoProps = state => ({
  user: state.profile.user,
  profile_loading: state.profile.profile_loading,
  token: state.token.token
})

export default connect(mapStoretoProps, { getProfile, updateProfile })(Profile)
