import React from "react";
import "../App.css";
import GoogleFontLoader from "react-google-font-loader";
import logo1 from "../SMIT-logo.png";
import proimg from "../profil.jpg";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteCard(i) {
    this.state.cardArr.splice(i, 1);
    console.log("deleted");
    this.setState({ cardArr: this.state.cardArr });
    console.log(this.state.cardArr);
  }

  createPDF() {
    const page = document.getElementById("divIdToPrint");
    html2canvas(page).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("SMIT-id-card.pdf");
    });
  }
  render() {
    return (
      <div>
        create card
        {/* card selection */}
        {/* <div>
            <div>
              <p
                style={{
                  fontSize: "1.5em",
                  margin: "20px"
                }}
              >
                Select Your card Type
              </p>
              <img
                id="SMIT"
                onClick={e => this.cardType(e)}
                width="120px"
                height="200px"
                className="cardType"
                src={nvttcSample}
                alt=""
              />
              <img
                id="navttc"
                onClick={e => this.cardType(e)}
                width="200px"
                height="120px"
                className="cardType"
                src={SMITSample}
                alt=""
              />
            </div>
          </div> */}
        <div id="divIdToPrint">
          {this.state.cardArr.map((item, index) => {
            return (
              // <div id={i} className="id-card">
              //   <button
              //     className="dltbtn"
              //     style={{
              //       marginTop: "-20px",
              //       position: "absolute",
              //       backgroundColor: "#d11c19",
              //       color: "white",
              //       border: "none",
              //       padding: "5px"
              //     }}
              //     onClick={i => {
              //       this.deleteCard(i);
              //     }}
              //   >
              //     X
              //   </button>
              //   <div className="heading">
              //     <p>
              //       <img src={logo} width="130px" />
              //     </p>
              //     <p
              //       style={{
              //         fontWeight: "bold"
              //       }}
              //     >
              //       SAYLANI MASSTRAINING <br /> JOB CREATION PROGRAM
              //     </p>
              //   </div>
              //   <h3>Students Card</h3>
              //   <div style={{
              //      display: "inline-block",
              //      padding: "10px",
              //      width: "230px",
              //      textAlign: "left",
              //      verticalAlign: "top",
              //      color:'black'
              //   }} >
              //     <p style={{ padding: "3px", fontWeight: "bold" }}>
              //       Roll No:<span> {item.roll}</span>
              //     </p>
              //     <p style={{ padding: "3px", fontWeight: "bold" }}>
              //       Name:<span> {item.name}</span>
              //     </p>
              //     <p style={{ padding: "3px", fontWeight: "bold" }}>
              //       Course:<span> {item.course}</span>
              //     </p>
              //     <p style={{ padding: "3px", fontWeight: "bold" }}>
              //       Batch:<span> {item.batch}</span>
              //     </p>
              //     <p style={{ padding: "3px", fontWeight: "bold" }}>
              //       Authorized Sign:<span> _____________</span>
              //     </p>
              //   </div>
              //   <div className="profile-image">
              //     <div className="img"></div>
              //   </div>
              // </div>

              // navttc Card Programming

              // <div
              //   id={i}
              //   className="idcard"
              //   style={{
              //     backgroundImage: `url(${background})`,
              //     backgroundSize: "cover"
              //   }}
              // >
              //   <div
              //     style={{
              //       position: "relative"
              //     }}
              //     class="logo"
              //   >
              //     <img src={logo} width="110px" height="35px" alt="" />
              //     <img src={navttc} width="70px" alt="" />
              //   </div>
              //   <p
              //     style={{
              //       position: "relative",
              //       fontSize: "1.2em",
              //       fontWeight: "bold",
              //       marginTop: "10px"
              //     }}
              //   >
              //     Saylani Mass Training
              //   </p>
              //   <div
              //     style={{
              //       position: "relative"
              //     }}
              //     class="image"
              //   >
              //     <img
              //       style={{
              //         margin: "15px auto"
              //       }}
              //       src={white}
              //       width="110px"
              //       height="110px"
              //       alt=""
              //       class="profile"
              //     />
              //   </div>

              //   <div class="detail">
              //     <p
              //       style={{
              //         position: "relative",
              //         fontSize: "1.2em",
              //         fontWeight: "bold",
              //         color: "white"
              //       }}
              //     >
              //       {item.name}
              //     </p>
              //     <p
              //       style={{
              //         color: "white"
              //       }}
              //     >
              //       Qamar Zaman
              //     </p>
              //     <p
              //       style={{
              //         color: "white"
              //       }}
              //     >
              //       {item.course}
              //     </p>
              //     <p
              //       style={{
              //         color: "white"
              //       }}
              //     >
              //       Roll Number: {item.roll}
              //     </p>
              //   </div>
              //   <div class="QR-code">
              //     {/* <img src={QR} width="70px" alt="" /> */}
              //     <QRCode
              //       style={{
              //         padding: "5px",
              //         width: "40px",
              //         height: "40px",
              //         margin: "3px",
              //         backgroundColor: "white"
              //       }}
              //       value={item.roll}
              //     />
              //     ,
              //   </div>
              // </div>

              // new card

              <div class="mainparent">
                <GoogleFontLoader
                  fonts={[
                    {
                      font: "Archivo Narrow",
                      weights: [400, "400i"]
                    }
                  ]}
                  subsets={["cyrillic-ext", "greek"]}
                />
                <div
                  id={index}
                  style={{
                    fontFamily: "Archivo Narrow"
                  }}
                  className="idcard-new"
                >
                  <div className="logo">
                    <img src={logo1} width="70px" alt="" />
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
                          border: "3px solid #1b6290"
                        }}
                        src={proimg}
                        width="100px"
                        height="110px"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="short-detail">
                    <p className="name">{item.name}</p>
                    <p className="course">{item.course}</p>
                  </div>
                  <div className="roll">
                    <p className="color"></p>
                    <p className="grey">{item.roll}</p>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Archivo Narrow"
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
                        backgroundColor: "white"
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
    );
  }
}

export default Card;
