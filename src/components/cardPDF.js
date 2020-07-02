import React from "react";
import "../App.css";
import GoogleFontLoader from "react-google-font-loader";
import logo1 from "../SMIT-logo.png";
import proimg from "../profil.jpg";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactToPrint from "react-to-print";

class CardPDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentCardData: "",
    };
  }
  componentDidMount() {
    console.log(this.props.location.state);
    this.setState({ studentCardData: this.props.location.state });
  }
  render() {
    console.log(this.state.studentCardData, "card Data");
    return (
      <div>
        <h1>Card to Print</h1>
        <Example />
        <ComponentToPrint />
      </div>
    );
  }
}

class ComponentToPrint extends React.Component {
    componentDidMount(){
        console.log(this.props.location.state);
    }
  render() {
    return (
      <div>
        <p>Kutte k bache print hoja</p>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button>Print this out!</button>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}
export default CardPDF;
