import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import { APP_NAME } from '../config/server.config';
function AppFooter() {
    const [socialDetails, setSocialDetails] = useState([])
    useEffect(() => {
        const getSettingsDetails = async () => {
            const response = await Rest.axiosRequest(API.getContactUs, {})
            if (response.data.status) {
                const socialData = response.data;
                setSocialDetails({
                    infoEmail: socialData.data[0].description ?? '',
                    contactNumber: socialData.data[1].description ?? '',
                    facebookLink: socialData.data[3].description ?? '',
                    instagramLink: socialData.data[4].description ?? '',
                    twitterLink: socialData.data[5].description ?? '',
                    linkedinLink: socialData.data[6].description ?? '',
                })
            }
        }
        getSettingsDetails()
    }, [])
    return (
        <>
            <footer>
                <div className="footer_top">
                    <Container>
                        <Row>
                            <Col lg={3} className="footer_box">
                                <h3 className='footer_title'>Quick Links</h3>
                                <ul className='quick_links left_padding'>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/about-us">About Us</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/contact-us">Contact Us</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/products">Products</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/brands">Brand</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/retailers">Retailers</Link>
                                    </li>
                                    <li>
                                        <i className="far fa-angle-right"></i>
                                        <Link href="/axis-point">Axis Point</Link>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg>
                                <Link href="/" passHref>
                                <Navbar.Brand className="nav_brand_logo">
                                    <img alt="logo" src="/assets/images/main-logo.png" className="h-100" />
                                </Navbar.Brand>
                                </Link>
                                <div className="text-center footer-logo-content">
                                    {/* <p>Duis auctor justo et ex iaculis ullamcorper donec rutrum malesuada scelerisque quisque ac facilisis quam, eget erat elem</p> */}
                                </div>
                            </Col>
                            <Col lg="auto" className="footer_box">
                                <h3 className='footer_title'>Get In Touch</h3>
                                <ul className='get_in_touch'>
                                    <li>
                                        <a href={` tel:${socialDetails.contactNumber}`} ><i className="icon-call"></i>{socialDetails.contactNumber}</a>
                                    </li>
                                    <li>
                                        <a href={`mailto:${socialDetails.infoEmail}`}><i className="icon-email"></i>{socialDetails.infoEmail}</a>
                                    </li>
                                </ul>
                                <ul className="social_media_links">
                                    <li>
                                        <a href={socialDetails.facebookLink} target="_blank" className="btn btn-primary btn-wh-30 br-6 me-3">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={socialDetails.twitterLink} target="_blank" className="btn btn-primary btn-wh-30 br-6 me-3">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={socialDetails.linkedinLink} target="_blank" className="btn btn-primary btn-wh-30 br-6 me-3">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={socialDetails.instagramLink} target="_blank" className="btn btn-primary btn-wh-30 br-6 ">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="footer_bottom">
                    <Container>
                        <div className='d-flex justify-content-between'>
                            <p>Copyright © {new Date().getFullYear()} {APP_NAME}</p>
                            <ul className='d-flex align-items-center'>
                                <li>
                                    <Link href="/terms-of-use">Terms of Use</Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </div>
            </footer>
        </>
    )
}

export default AppFooter
