import React from "react";
import proimg from "./profil.jpg";
import logo1 from "./SMIT-logo.png";
import * as firebase from "firebase";
import "./App.css";

import GoogleFontLoader from "react-google-font-loader";
import QRCode from "qrcode.react";
import MyRoute from "./router";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEmail: "",
      adminPassword: "",
      adminform: true,
      adminpanal: false,
      signupform: true,
      name: "",
      fatherName: "",
      contact: "",
      CNIC: "",
      course: "",
      batch: "",
      roll: "",
      cardType: "",
      popup: false,
      popupmsg: "",
      cardArr: [],
    };
  }

  


  closepopup() {
    this.setState({ popup: false });
  }

  deleteCard(i) {
    this.state.cardArr.splice(i, 1);
    console.log("deleted");
    this.setState({ cardArr: this.state.cardArr });
    console.log(this.state.cardArr);
  }


  render() {
    return (
      <div className="App" style={{padding:0,margin:0}}>
        <MyRoute />       
        <div id="divIdToPrint">

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
      </div>
    );
  }
}

export default App;
