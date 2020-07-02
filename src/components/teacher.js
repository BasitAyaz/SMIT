import React from "react";
import "../App.css";
import * as firebase from "firebase";
import logo1 from "../SMIT-logo.png";
import proimg from "../profil.jpg";

var firebaseConfig = {
  apiKey: "AIzaSyCWTZnOXTcFERSx_CNkmYDwGX1kXZWQbnU",
  authDomain: "card-creator-973fc.firebaseapp.com",
  databaseURL: "https://card-creator-973fc.firebaseio.com",
  projectId: "card-creator-973fc",
  storageBucket: "card-creator-973fc.appspot.com",
  messagingSenderId: "473164028793",
  appId: "1:473164028793:web:668601714f09211c702da8",
  measurementId: "G-09R286MQ2F",
};

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherForm: true,
      teacherEmail: "",
      teacherPassword: "",
      popup: false,
      popuperror: false,
      popupmsg: "",
      teacherPanal: false,
      teacherData: "",
    };
  }

  componentDidMount() {}

  teacherSignIn(e) {
    e.preventDefault();
    let email = this.state.teacherEmail;
    let password = this.state.teacherPassword;
    let obj = {
      email,
      password,
    };
    console.log(obj);
    firebase
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then((snap) => {
        let uid = snap.user.uid;
        console.log(uid);
        firebase
          .database()
          .ref("/")
          .child(`teachers/${uid}`)
          .once("value", (teacher) => {
            let teacherDT = teacher.val()
            this.setState({teacherData:teacherDT})
            console.log(this.state.teacherData)
          });
        this.setState({ popup: true });
        this.setState({ popupmsg: "Teacher Successfully Login" });
        this.setState({ teacherForm: false });
        this.setState({ teacherPanal: true });
        setTimeout(() => {
          this.setState({ popup: false });
          this.setState({ popupmsg: "" });
        }, 3000);
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ popuperror: true });
        this.setState({ popupmsg: error.message });
        return false;
      });
  }

  closepopup() {
    this.setState({ popup: false });
    this.setState({ popupmsg: "" });
  }

  render() {
    let {teacherData} = this.state;
    return (
      <div>
        {this.state.teacherForm ? (
          <div className="Input-details">
            <div className='logoDiv'>
            <img src={logo1} width='150px' />
          </div>
            <div className="form">
              <form>
                <p style={{ fontSize: "2em", padding: "20px 0" }}>
                  Teacher Sign In
                </p>
                <input
                  id="teacherEmail"
                  className="inp"
                  value={this.state.teacherEmail}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(e) =>
                    this.setState({ teacherEmail: e.target.value })
                  }
                />
                <br />
                <input
                  id="teacherPassword"
                  className="inp"
                  value={this.state.teacherPassword}
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    this.setState({ teacherPassword: e.target.value })
                  }
                />
                <br />
                <button
                  className="sbmtbtn"
                  onClick={(e) => this.teacherSignIn(e)}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        ) : (
          false
        )}
        {this.state.teacherPanal ? (
          <div className="Input-details">
            <div className="main">
              <div className="profile-header">
                <div className="teacher">
                  <div className="teacher-img">
                    <img width="100px" src={proimg} alt="Teacher Name" />
                  </div>
                  <div className="teacher-name"><b>{teacherData.teacherName}</b> <br /><span style={{fontSize:'.7em'}}>{teacherData.teacherCourse} Trainer</span></div>
                </div>
                <div className="logo">
                  <img width="100px" src={logo1} alt="SMIT" />
                </div>
              </div>
              <div className="content">
                <div className="lightgrey">
                  <ul>
                    <li className="sidebar">Students</li>
                    <li className="sidebar">Quiz</li>
                    <li className="sidebar">Assignment</li>
                    <li className="sidebar">Class</li>
                    <li className="sidebarLogout">Logout</li>
                  </ul>
                </div>
                <div className="white">
                  <p style={{ fontSize: "1.5em", color: "grey" }}>
                    Teacher Content Here
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}

        {this.state.popup ? (
          <div id="popup" className="popup">
            <p id="popupMessage">{this.state.popupmsg}</p>
            <button
              id="popupBtn"
              className="popupbtn"
              onClick={() => {
                this.closepopup();
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        ) : (
          false
        )}
        {this.state.popuperror ? (
          <div id="popup" className="popuperror">
            <p id="popupMessage">{this.state.popupmsg}</p>
            <button
              id="popupBtn"
              className="popupbtn"
              onClick={() => {
                this.closepopup();
              }}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default Teacher;
