import React from 'react'
import Header from '../../Pages/Header'
import Footer from '../../Pages/Footer'
import './index.css'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
const Contact = () => {
    return (
        <>
            <Header />
            <div>
                <img
                    src={require("../../Images/Group 1597884579.png")}
                    className="img_fluid1_banner"
                />
                {/* <div className='banner_text_sss'>
                    <h1 className='banner_exx'>Contact Us</h1>
                </div> */}
            </div>
            <div className="container pt-5">
                <div className='d-flex flex-wrap justify-content-between text-center text-md-start crad_idm_222_sss'>
                    {/* Phone Number */}
                    <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faPhone} size="lg" />
                        </div>
                        <div className="text-left d-flex flex-column">
                            <h4 className='ssyhgyeye'>Phone Number</h4>
                            <span className="ssyhgyey_sse">+91 72650 77755</span>
                            <span className="ssyhgyey_sse">+91 72650 77755</span>
                        </div>
                    </div>
                    <p className='sssss11'></p>
                    {/* Email Address */}
                    <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} size="lg" />
                        </div>
                        <div className="text-left d-flex flex-column">
                            <h4 className='ssyhgyeye'>Email Address</h4>
                            <span className="ssyhgyey_sse">info@crystovajewels.com</span>
                            <span className="ssyhgyey_sse">info@crystovajewels.com</span>
                        </div>
                    </div>
                    <p className='sssss11'></p>
                    {/* Office Address */}
                    <div className="col-sm-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start contact-item crad_ss_99_okw">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faLocationDot} size="lg" />
                        </div>
                        <div className="text-left d-flex flex-column">
                            <h4 className='ssyhgyeye'>Office Address</h4>
                            <span className="ssyhgyey_sse">
                                B-714 IT Park, Opp. AR Mall,<br />
                                Mota Varachha, Surat - 394101
                            </span>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-5 hdr_cs">
                    <div className='shyr_con'>
                        <div className='con_main'>
                            <h3 className='habv_www'>Have Queries?</h3>
                            <h3 className='habv_www'>We’re Here to Help!</h3>
                            <div className='pt-4'>
                                <span className='dhs_ddd'>Have questions, feedback, or need assistance? Connect with us, and we’ll ensure you get the support you need.</span>
                            </div>
                            <div className='pt-4'>
                                <span className='dhs_ddd'>Your trust and satisfaction are our treasures. Reach out to us anytime, and let us help you shine!" Whether you have a question, need assistance, or want to share feedback, we’d love to hear from you. Let’s make your jewellery shopping experience exceptional.</span>
                            </div>
                            <div className='pt-4'>
                                <div className="ssjnsec_fdd p-3 ">
                                    <span className="ens_ddds">Engagement rings, wedding bands, and anniversary gifts commemorate milestones, making the jewellery a lifelong symbol of love and commitment.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='shyr_con'>
                        {/* <div className='card h-100 con_ssss'>
                            <div className='row '>
                            </div>
                        </div> */}
                        <Card className="contact-card con_ssss">
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="my-4">
                                                <Form.Control type="text" placeholder="Your Name" className='con_filddd' />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="my-4">
                                                <Form.Control type="email" placeholder="Email Address" className='con_filddd' />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="my-4">
                                                <Form.Control type="text" placeholder="Phone No." className='con_filddd' />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="my-4">
                                                <Form.Control type="text" placeholder="Select Subject" className='con_filddd' />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="my-4">
                                        <Form.Control type="text" placeholder="Company" className='con_filddd' />
                                    </Form.Group>
                                    <Form.Group className="my-4">
                                        <Form.Control as="textarea" rows={2} placeholder="Message" className='con_filddd' />
                                    </Form.Group>
                                    <Button className="submit-btn my-3">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            {/* map here */}
            <div className="map-container hdr_csd" style={{ width: "100%", height: "600px", marginBottom: '-10rem' }}>
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.304037324984!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzU2LjciTiA3MsKwNDknNTUuNSJF!5e0!3m2!1sen!2sin!4v1648032200000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <Footer />
        </>
    )
}
export default Contact