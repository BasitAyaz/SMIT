import React from "react";
import "../App.css";
import * as firebase from "firebase";
import logo from "../SMIT-logo.png";
import upload from "../upload.png";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupform: false,
      name: "",
      fatherName: "",
      contact: "",
      CNIC: "",
      course: "",
      batch: "",
      roll: "",
      profileImage: "",
      cardType: "",
      popup: false,
      popuperror: false,
      popupmsg: "",
      loader: false,
      cardArr: [],
      dbCourse: [],
    };
  }

  componentDidMount() {
    {
      firebase
        .database()
        .ref("/")
        .child(`signUpFormStatus/`)
        .once("value", (formStatus) => {
          const formstate = formStatus.val();
          console.log(formstate);
          // console.log(formstate.DBcourse);
          this.state.dbCourse.push(formstate.DBcourse);
          console.log(this.state.dbCourse);
          {
            formstate.Form == "open"
              ? this.setState({ signupform: true })
              : this.setState({ signupform: false });
          }
          // {formstate.DBcourse?this.setState({dbCourse:DBcourse}):false}
        });
    }
  }
  async uploadImage(e) {
    let fileName = e.target.files[0].name;
    // let fileSize = e.target.files[0].size;
    console.log(e.target.files[0]);
    let ref = firebase.storage().ref("/").child(`images/${fileName}`);
    await ref.put(e.target.files[0]);
    ref.getDownloadURL().then((url) => {
      console.log(url);
    });
  }
  async createCard(e) {
    e.preventDefault();
    if (this.state.roll === "") {
      this.setState({ popupmsg: "Please Enter Roll Number" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.name === "") {
      this.setState({ popupmsg: "Please Enter Name" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.course === "") {
      this.setState({ popupmsg: "Please Enter course" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.batch === "") {
      this.setState({ popupmsg: "Please Enter Batch" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.fatherName === "") {
      this.setState({ popupmsg: "Please Enter Father Name" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.contact === "") {
      this.setState({ popupmsg: "Please Enter Contact" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.CNIC === "") {
      this.setState({ popupmsg: "Please Enter CNIC" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.profileImage === "") {
      this.setState({
        popupmsg:
          "Please Upload your profile pic with blue or white background with glasses your picture will be not be accepted",
      });
      this.setState({ popuperror: true });
      return false;
    }
    this.setState({ loader: true });
    let name = this.state.name;
    let course = this.state.course;
    let batch = this.state.batch;
    let roll = this.state.roll;
    let fatherName = this.state.fatherName;
    let contact = this.state.contact;
    let CNIC = this.state.CNIC;
    let profileImage = this.state.profileImage;
    // upload image
    let fileName = profileImage[0].name;
    // let fileSize = e.target.files[0].size;
    let ref = firebase.storage().ref("/").child(`images/${fileName}`);
    await ref.put(profileImage[0]);
    let imageUrl = await ref.getDownloadURL().then((url) => {
      console.log(url);
      return url;
    });

    let obj = {
      name,
      fatherName,
      contact,
      CNIC,
      course,
      batch,
      roll,
      imageUrl,
    };
    // this.state.cardArr.push(obj);
    // this.setState({ cardArr: this.state.cardArr });
    // console.log(this.state.cardArr);
    this.setState({
      roll: "",
      name: "",
      course: "",
      batch: "",
      fatherName: "",
      CNIC: "",
      contact: "",
      profileImage: "",
      loader: false,
    });
    firebase
      .database()
      .ref("/")
      .child(`students/ ${obj.course}`)
      .push(obj)
      .then((success) => {
        this.setState({ popup: true });
        this.setState({ popupmsg: "Succesfully Submitted" });
        setTimeout(() => {
          this.setState({ popup: false });
          this.setState({ popupmsg: "" });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ popuperror: true });
        this.setState({ popupmsg: error });
      });
  }

  closepopup() {
    this.setState({ popup: false });
    this.setState({ popupmsg: "" });
  }

  render() {
    console.log(this.state.profileImage);
    return (
      <div>
        <div
          className="Input-details"
          style={{
            backgroundColor: "#F0F8FF",
            padding: 0,
          }}
        >
          <div className="logoDiv">
            <img src={logo} width="150px" />
          </div>
          <div className="form">
            {this.state.signupform ? (
              <form onSubmit={(e) => this.createCard(e)}>
                <p style={{ fontSize: "2em", padding: "20px 0" }}>
                  Students Sign Up
                </p>
                <br />
                <input
                  id="roll"
                  name="Roll No"
                  className="inp"
                  value={this.state.roll}
                  type="number"
                  placeholder="Enter Roll Number"
                  onChange={(e) => this.setState({ roll: e.target.value })}
                />
                <br />
                <input
                  id="name"
                  className="inp"
                  value={this.state.name}
                  placeholder="Enter Name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <br />
                <select
                  className="inp"
                  onChange={(e) => this.setState({ course: e.target.value })}
                >
                  <option selected style={{ color: "grey" }}>
                    Select Your Course
                  </option>
                  {this.state.dbCourse.map((item, i) => {
                    return <option id={i}>{item}</option>;
                  })}
                </select>
                <br />
                <input
                  id="batch"
                  className="inp"
                  value={this.state.batch}
                  placeholder="Enter Batch"
                  onChange={(e) => this.setState({ batch: e.target.value })}
                />
                <br />
                <input
                  id="fathername"
                  className="inp"
                  value={this.state.fatherName}
                  placeholder="Enter Father Name"
                  onChange={(e) =>
                    this.setState({ fatherName: e.target.value })
                  }
                />
                <br />
                <input
                  id="contact"
                  className="inp"
                  pattern="\d*"
                  maxLength="11"
                  value={this.state.contact}
                  placeholder="Enter Contact"
                  onChange={(e) => this.setState({ contact: e.target.value })}
                />
                <br />
                <input
                  id="CNIC"
                  className="inp"
                  value={this.state.CNIC}
                  placeholder="Enter CNIC"
                  onChange={(e) => this.setState({ CNIC: e.target.value })}
                />
                <br />
                <input
                  style={{
                    backgroundImage: `url(${upload})`,
                  }}
                  type="file"
                  className="custom-file-input"
                  onChange={(e) =>
                    this.setState({ profileImage: e.target.files })
                  }
                />{" "}
                <br />
                {this.state.loader ? (
                  <div className="loaderParent">
                    <div class="loader"></div>
                  </div>
                ) : (
                  false
                )}
                <button
                  className="sbmtbtn"
                  style={{
                    padding: "10px",
                    fontSize: "1em",
                  }}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <p
                  style={{
                    color: "grey",
                    fontSize: "3em",
                    padding: "20px",
                  }}
                >
                  Form has been closed
                </p>
              </div>
            )}
          </div>
        </div>

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

export default Signup;
