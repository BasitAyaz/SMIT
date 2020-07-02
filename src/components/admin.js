import React from "react";
import "../App.css";
import * as firebase from "firebase";
import logo from "../SMIT-logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import GoogleFontLoader from "react-google-font-loader";
import QRCode from "qrcode.react";
import proimg from "../profileDummy.jpg";
import searchico from "../searchicon.png";

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminform: true,
      popup: false,
      popuperror: false,
      popupmsg: "",
      adminpanal: false,
      signUpFormStatus: false,
      signupformToggle: false,
      addTeacherForm: false,
      teacherName: "",
      teacherCourse: "",
      teacherBatch: "",
      teacherContact: "",
      teacherCNIC: "",
      teacherEmail: "",
      teacherPassword: "",
      course: [],
      courses: false,
      studentsData: [],
      searchStudent:[],
      students: false,
      DBcource: "",
      DBroll: "",
    };
  }

  componentDidMount() {
    console.log(this.state.course, "<================= course from state");
    {
      firebase
        .database()
        .ref("/")
        .child(`students/`)
        .once("value", (corse) => {
          const course = corse.val();
          console.log(course);
          for (const property in course) {
            this.state.course.push(property);
          }
        });
    }

    {
      firebase
        .database()
        .ref("/")
        .child(`signUpFormStatus/`)
        .once("value", (formStatus) => {
          const formstate = formStatus.val();
          console.log(formstate);
          {
            formstate.Form == "open"
              ? this.setState({ signupformToggle: true })
              : this.setState({ signupformToggle: false });
          }
        });
    }
  }

  adminSignIn(e) {
    e.preventDefault();
    let email = this.state.adminEmail;
    let password = this.state.adminPassword;
    let obj = {
      email,
      password,
    };
    console.log(obj);
    firebase
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then((snap) => {
        console.log(snap);
        this.setState({ adminEmail: "" });
        this.setState({ adminPassword: "" });
        this.setState({ popup: true });
        this.setState({ popupmsg: "Admin Successfully Login" });
        this.setState({ adminform: false });
        this.setState({ adminpanal: true });
        // this.setState({ courses: true });
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

  popup(msg) {
    this.setState({ popupmsg: { msg } });
    this.setState({ popup: true });
  }

  closepopup() {
    this.setState({ popup: false });
    this.setState({ popupmsg: "" });
  }

  openForm() {
    {
      this.state.signupformToggle
        ? this.setState({ signupformToggle: false })
        : this.setState({ signupformToggle: true });
    }
    {
      this.state.signupformToggle
        ? firebase.database().ref("signUpFormStatus/").set({
            Form: "close",
          })
        : firebase.database().ref("signUpFormStatus/").set({
            Form: "open",
            DBcourse: this.state.DBcource,
            DBStartingRollNumber: this.state.DBroll,
          });
    }
  }

  courseOpen(e) {
    let courseid = e.target.id;
    this.setState({ studentsData: [] });
    firebase
      .database()
      .ref("/")
      .child(`students/${courseid}`)
      .on("child_added", (students) => {
        const dt = students.val();
        this.state.studentsData.push(dt);
        this.setState({ studentsData: this.state.studentsData });
        console.log(this.state.studentsData);
      });
    this.setState({ students: true });
  }
  addTeacher(e) {
    let {
      teacherName,
      teacherCourse,
      teacherBatch,
      teacherContact,
      teacherCNIC,
      teacherEmail,
      teacherPassword,
    } = this.state;
    e.preventDefault();
    if (this.state.teacherName === "") {
      this.setState({ popupmsg: "Please Enter Name" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherCourse === "") {
      this.setState({ popupmsg: "Please Enter course" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherBatch === "") {
      this.setState({ popupmsg: "Please Enter Batch" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherContact === "") {
      this.setState({ popupmsg: "Please Enter Contact" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherCNIC === "") {
      this.setState({ popupmsg: "Please Enter CNIC" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherEmail === "") {
      this.setState({ popupmsg: "Please Enter email" });
      this.setState({ popuperror: true });
      return false;
    } else if (this.state.teacherPassword === "") {
      this.setState({ popupmsg: "Please Enter Password" });
      this.setState({ popuperror: true });
      return false;
    }
    let obj = {
      teacherName,
      teacherCourse,
      teacherBatch,
      teacherContact,
      teacherCNIC,
      teacherEmail,
      teacherPassword,
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(obj.teacherEmail, obj.teacherPassword)
      .then((success) => {
        console.log(success.user.uid);
        obj.uid = success.user.uid;
        console.log(obj);
        firebase
          .database()
          .ref("/")
          .child(`teachers/${obj.uid}`)
          .set(obj)
          .then((data) => {
            this.setState({ popup: true });
            this.setState({ popupmsg: "Teacher Added Successfully" });
            setTimeout(() => {
              this.setState({ popup: false });
              this.setState({ popupmsg: "" });
            }, 3000);
          })
          .catch((error) => {
            this.setState({ popuperror: true });
            this.setState({ popupmsg: error });
          });
      })
      .catch((error) => {
        this.setState({ popuperror: true });
        this.setState({ popupmsg: error });
      });
    this.setState({
      teacherName: "",
      teacherCourse: "",
      teacherBatch: "",
      teacherContact: "",
      teacherCNIC: "",
      teacherEmail: "",
      teacherPassword: "",
    });
  }

  logOut(e) {
    e.preventDefault();
  }

  createPDF(e) {
    this.props.history.push('/cardtoprint',this.state.studentsData)
    // html2canvas(document.getElementById("divIdToPrint")).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, "PNG", 0, 0);
    //   pdf.save("SMIT.pdf");
    // });
  }
  printStudentCard(e) {
    console.log(e);
    this.setState({ studentsData: [e] });
  }
  searchStudent(e) {
    let searchedData =this.state.studentsData.filter(
      (student => this.state.studentsData.roll = e.target)
      );
      this.setState({searchStudent:searchedData})
      console.log(this.state.searchStudent);
  }

  render() {
    return (
      <div className="Input-details">
        {this.state.adminform ? (
          <div className="Input-details">
            <div className="logoDiv">
              <img src={logo} width="150px" />
            </div>
            <div className="form">
              <form>
                <p style={{ fontSize: "2em", padding: "20px 0" }}>
                  Admin Sign In
                </p>
                <input
                  id="adminEmail"
                  className="inp"
                  value={this.state.adminEmail}
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(e) =>
                    this.setState({ adminEmail: e.target.value })
                  }
                />
                <br />
                <input
                  id="adminPassword"
                  className="inp"
                  value={this.state.adminPassword}
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) =>
                    this.setState({ adminPassword: e.target.value })
                  }
                />
                <br />
                <button
                  className="sbmtbtn"
                  onClick={(e) => this.adminSignIn(e)}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        ) : (
          false
        )}
        {this.state.adminpanal ? (
          <div className="Input-details">
            <div className="adminParent">
              <div className="lightgrey">
                <div style={{ padding: "50px" }} className="logoDiv">
                  <img src={logo} width="150px" />
                </div>
                <ul>
                  <li
                    className="sidebar"
                    onClick={() =>
                      this.setState({
                        courses: true,
                        addTeacherForm: false,
                        signUpFormStatus: false,
                      })
                    }
                  >
                    Course
                  </li>
                  <li
                    className="sidebar"
                    onClick={() =>
                      this.setState({
                        addTeacherForm: true,
                        courses: false,
                        signUpFormStatus: false,
                      })
                    }
                  >
                    Add Teacher
                  </li>
                  <li
                    className="sidebar"
                    onClick={() =>
                      this.setState({
                        signUpFormStatus: true,
                        courses: false,
                        addTeacherForm: false,
                      })
                    }
                  >
                    Open Form
                  </li>
                  <li className="sidebarLogout" onClick={(e) => this.logOut(e)}>
                    Logout
                  </li>
                </ul>
              </div>
              <div className="white" style={{ backgroundColor: "transparent" }}>
                {/* Add Teacher */}
                {this.state.addTeacherForm ? (
                  <div className="Input-details">
                    <div style={{ marginTop: "10px" }} className="form">
                      <form onSubmit={(e) => this.addTeacher(e)}>
                        <p style={{ fontSize: "2em", padding: "20px 0" }}>
                          Add Teacher
                        </p>
                        <br />
                        <input
                          id="name"
                          className="inp"
                          value={this.state.teacherName}
                          placeholder="Enter Name"
                          onChange={(e) =>
                            this.setState({ teacherName: e.target.value })
                          }
                        />

                        <br />
                        <select
                          className="inp"
                          onChange={(e) =>
                            this.setState({ teacherCourse: e.target.value })
                          }
                        >
                          <option selected style={{ color: "grey" }}>
                            Select Your Course
                          </option>
                          <option>Web & Mobile</option>
                          <option>Graphics Designing</option>
                          <option>Video Editing</option>
                          <option>CCNA</option>
                          <option>CCA</option>
                          <option>CCO</option>
                        </select>
                        <br />
                        <input
                          id="batch"
                          className="inp"
                          value={this.state.teacherBatch}
                          placeholder="Enter Batch"
                          onChange={(e) =>
                            this.setState({ teacherBatch: e.target.value })
                          }
                        />

                        <br />

                        <input
                          id="contact"
                          className="inp"
                          pattern="\d*"
                          maxLength="11"
                          value={this.state.teacherContact}
                          placeholder="Enter Contact"
                          onChange={(e) =>
                            this.setState({ teacherContact: e.target.value })
                          }
                        />
                        <br />
                        <input
                          id="CNIC"
                          className="inp"
                          value={this.state.teacherCNIC}
                          placeholder="Enter CNIC"
                          onChange={(e) =>
                            this.setState({ teacherCNIC: e.target.value })
                          }
                        />
                        <br />
                        <input
                          type="email"
                          id="email"
                          className="inp"
                          value={this.state.teacherEmail}
                          placeholder="Enter email Address"
                          onChange={(e) =>
                            this.setState({ teacherEmail: e.target.value })
                          }
                        />
                        <br />
                        <input
                          type="password"
                          id="password"
                          className="inp"
                          value={this.state.teacherPassword}
                          placeholder="Enter Password"
                          onChange={(e) =>
                            this.setState({ teacherPassword: e.target.value })
                          }
                        />
                        <br />
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
                    </div>
                  </div>
                ) : (
                  false
                )}
                {/* courses  */}
                {this.state.courses ? (
                  <div
                    style={{
                      padding: "30px 10px",
                      background:
                        "linear-gradient(rgb(44, 124, 172),rgb(28, 79, 109))",
                      transition: ".5s",
                    }}
                  >
                    <div className="main">
                      <p style={{ fontSize: "2em", color: "white" }}>
                        Our Courses
                      </p>
                      {this.state.course.map((item, i) => {
                        return (
                          <div
                            id={i}
                            className="course"
                            onClick={(e) => {
                              this.courseOpen(e);
                            }}
                            id={item}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  false
                )}
                {/* students */}
                {this.state.students ? (
                  <div>
                    <div className="main">
                      <p
                        style={{
                          color: "grey",
                          fontSize: "3em",
                          padding: "20px",
                        }}
                      >
                        course
                      </p>
                      <table className="courseTable">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <input
                            title="Search Student Here"
                            style={{ backgroundImage: `url(${searchico})` }}
                            className="searchbar"
                            placeholder="Search Student Data"
                            onChange={(e) => this.searchStudent(e)}
                          />
                          <button className="btn">Import Excel</button>
                        </div>
                        <tr
                          style={{
                            borderBottom: "1px solid",
                            backgroundColor: "#235591",
                            color: "white",
                            padding: "12px",
                          }}
                        >
                          <th>Roll No</th>
                          <th>Name</th>
                          <th>Father Name</th>
                          <th>Course</th>
                          <th>Batch</th>
                          <th>Contact</th>
                          <th>CNIC</th>
                        </tr>
                        {this.state.studentsData.map((item, i) => {
                          return (
                            <tr
                              onClick={(e) => this.printStudentCard(item)}
                              id={i}
                            >
                              <td>{item.roll}</td>
                              <td>{item.name}</td>
                              <td>{item.fatherName}</td>
                              <td>{item.course}</td>
                              <td>{item.batch}</td>
                              <td>{item.contact}</td>
                              <td>{item.CNIC}</td>
                            </tr>
                          );
                        })}
                        <button
                          className="btn"
                          onClick={(e) => this.createPDF(e)}
                        >
                          create card PDF
                        </button>
                      </table>
                      <div id="divIdToPrint">
                        <div>
                          {this.state.studentsData.map((item, i) => {
                            return (
                              // new card

                              <div id={i} class="mainparent">
                                <GoogleFontLoader
                                  fonts={[
                                    {
                                      font: "Archivo Narrow",
                                      weights: [400, "400i"],
                                    },
                                  ]}
                                  subsets={["cyrillic-ext", "greek"]}
                                />
                                <div
                                  style={{
                                    fontFamily: "Archivo Narrow",
                                  }}
                                  className="idcard-new"
                                >
                                  <div className="logo">
                                    <img src={logo} width="70px" alt="" />
                                  </div>
                                  <p className="line"></p>
                                  <p className="lineshadow"></p>
                                  <div className="profile-img">
                                    <div className="proImg">
                                      <img
                                        style={{
                                          borderRadius: "5px",
                                          boxShadow: "0 10px 12px lightgray",
                                          position: "relative",
                                          border: "3px solid #1b6290",
                                        }}
                                        src={item.imageUrl}
                                        width="100px"
                                        height="110px"
                                        alt=""
                                      />
                                      
                                    </div>
                                  </div>
                                  <div className="short-detail">
                                    <p className="name">{item.name}</p>
                                    <p
                                      style={{
                                        fontFamily: "Archivo Narrow",
                                        color: "rgb(35, 129, 190)",
                                        fontSize: "1.2em",
                                      }}
                                    >
                                      {item.course}
                                    </p>
                                  </div>
                                  <div className="roll">
                                    <p className="color"></p>
                                    <p className="grey">{item.roll}</p>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontFamily: "Archivo Narrow",
                                  }}
                                  className="idcard-back"
                                >
                                  <div className="personaldetail">
                                    <table>
                                      <tr>
                                        <td>Father Name</td>
                                        <td>: {item.fatherName}</td>
                                      </tr>
                                      <tr>
                                        <td>Course</td>
                                        <td>: {item.course}</td>
                                      </tr>
                                      <tr>
                                        <td>Roll Number</td>
                                        <td>: {item.roll}</td>
                                      </tr>
                                      <tr>
                                        <td>Batch</td>
                                        <td>: {item.batch}</td>
                                      </tr>
                                      <tr>
                                        <td>CNIC</td>
                                        <td>: {item.CNIC}</td>
                                      </tr>
                                      <tr>
                                        <td>Contact</td>
                                        <td>: {item.contact}</td>
                                      </tr>
                                    </table>
                                  </div>
                                  <div className="QR">
                                    <QRCode
                                      style={{
                                        padding: "5px",
                                        width: "40px",
                                        height: "40px",
                                        margin: "3px",
                                        backgroundColor: "white",
                                      }}
                                      value={item.roll}
                                    />{" "}
                                  </div>
                                  <div className="social">
                                    <p>
                                      <i className="fab fa-facebook-square"></i>{" "}
                                      /SaylaniMassTraining
                                    </p>
                                    <p>
                                      <i className="fas fa-envelope-square"></i>{" "}
                                      education@saylaniwelfare.com
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  false
                )}
                {/* open Form  */}
                {this.state.signUpFormStatus ? (
                  <div style={{ marginTop: "10px" }} className="form">
                    <div className="toggle">
                      <p style={{ fontSize: "2em" }}>
                        Open Form
                        <input
                          className="inp"
                          style={{ fontSize: "16px" }}
                          value={this.state.DBcource}
                          placeholder="Enter Course"
                          onChange={(e) =>
                            this.setState({ DBcource: e.target.value })
                          }
                        />
                        <input
                          className="inp"
                          style={{ fontSize: "16px" }}
                          value={this.state.DBroll}
                          placeholder="Starting Roll No"
                          onChange={(e) =>
                            this.setState({ DBroll: e.target.value })
                          }
                        />
                        <input
                          type="number"
                          className="inp"
                          style={{ fontSize: "16px" }}
                          // value={this.state.DBroll}
                          placeholder="Batch No"
                          // onChange={(e) => this.setState({ DBroll: e.target.value })}
                        />
                        <div
                          style={{
                            width: "fit-content",
                            margin: "15px auto",
                            cursor: "pointer",
                            color: "#3575d3",
                          }}
                          onClick={(e) => {
                            this.openForm(e);
                          }}
                        >
                          {this.state.signupformToggle ? (
                            <i class="fas fa-toggle-on"></i>
                          ) : (
                            <i class="fas fa-toggle-off"></i>
                          )}
                        </div>{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  false
                )}
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

export default Admin;
