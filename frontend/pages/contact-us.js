import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FormValidator from '../components/FormValidator';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import Notifier from '../components/Notifier';
import ReCAPTCHA from "react-google-recaptcha";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../services/SkeletonOptions';
import Meta from '../components/Meta';
import { APP_NAME, RECAPTCHA_SITE_KEY } from '../config/server.config';

function Contact({ socialDetails }) {
    const recaptchaRef = useRef()
    const notifier = new Notifier();
    const validator = new FormValidator([
        {
            field: "firstName",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter first name.",
        },
        {
            field: "lastName",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter last name.",
        },
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter email.",
        },
        {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "Please enter valid email.",
        },
        {
            field: "phoneNumber",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter phone number.",
        },
        {
            field: "contactMessage",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter message.",
        }
    ]);
    const [submitted, setSubmitted] = useState(false)
    const [showLoading, setShowLoading] = useState(false);
    const [validation, setValidation] = useState(validator.valid());
    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        contactMessage: ""
    });
    const [recaptchaMessage, setRecaptchaMessage] = useState('')
    const onChangeHandler = async (event) => {
        const { name, value } = event.target;
        const numberRegex = /^[0-9\b]+$/;

        if (name == 'phoneNumber') {
            if (value === '' || numberRegex.test(value)) {
                setContactData((prevState) => ({ ...prevState, [name]: value }));
            }
        } else {
            setContactData((prevState) => ({ ...prevState, [name]: value }));
        }

    };
    const handleSubmit = async () => {
        const validation = validator.validate(contactData)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            if (recaptchaRef.current.getValue()) {
                recaptchaRef.current.reset()
                let formData = {
                    firstName: contactData.firstName,
                    lastName: contactData.lastName,
                    email: contactData.email,
                    phoneNumber: contactData.phoneNumber,
                    message: contactData.contactMessage
                }
                setShowLoading(true)
                const response = await Rest.axiosRequest(API.postContactUs, formData);
                setShowLoading(false)
                if (response.status === 201) {
                    notifier.notify(response.data.message, "success");
                    resetForm()
                } else {
                    notifier.notify(response.data.message, "danger");
                }
            } else {
                setRecaptchaMessage('Please select captcha box.')
            }

        }
    };
    let checkValidation = submitted
        ? validator.validate(contactData)
        : validation

    const resetForm = async () => {
        setSubmitted(false)
        setContactData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            contactMessage: ""
        });
        setRecaptchaMessage("")
    }
    const capthcaHandler = () => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaRef.current.getValue()) {
            setRecaptchaMessage('')
        }
    }
    return (
        <>
            <Meta title={`Contact Us | ${APP_NAME}`} keywords={''} description={''} />
            <section className="p-0-0-60 contact-section bg-black">
                <div className="page-title-wrap mb-60 bg-black border-btm-white-light">
                    <h2 className="page-title text-center fs-26 color-dcdcdc fw-700 p-30-0 mb-0">Contact Us</h2>
                </div>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={8} md={12}>
                            <Card className="card-contact-form p-30-150-38-50 card-dark">
                                <Card.Header className="btn-block p-0 bg-transparent mb-20">
                                    <h4 className="fs-23 color-dcdcdc fw-700 mb-0">Leave us your info</h4>
                                    <p className="fs-15 fw-400 color-dcdcdc p-b-15">and we will get back to you</p>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-4 form-dark">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control value={contactData.firstName} onChange={onChangeHandler} name='firstName' type="text" placeholder="Enter Name" />
                                                <div
                                                    className={
                                                        checkValidation.firstName.isInvalid
                                                            ? 'animated fadeIn'
                                                            : ''
                                                    }
                                                >
                                                    <div className="error">
                                                        {checkValidation.firstName.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4 form-dark">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control value={contactData.lastName} onChange={onChangeHandler} name='lastName' type="text" placeholder="Enter Last Name" />
                                                <div
                                                    className={
                                                        checkValidation.lastName.isInvalid
                                                            ? 'animated fadeIn'
                                                            : ''
                                                    }
                                                >
                                                    <div className="error">
                                                        {checkValidation.lastName.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4 form-dark">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control value={contactData.email} onChange={onChangeHandler} name='email' type="email" placeholder="Enter Email Address" />
                                                <div
                                                    className={
                                                        checkValidation.email.isInvalid
                                                            ? 'animated fadeIn'
                                                            : ''
                                                    }
                                                >
                                                    <div className="error">
                                                        {checkValidation.email.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4 form-dark">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control value={contactData.phoneNumber} onChange={onChangeHandler} name='phoneNumber' type="text" placeholder="Enter Phone Number" />
                                                <div
                                                    className={
                                                        checkValidation.phoneNumber.isInvalid
                                                            ? 'animated fadeIn'
                                                            : ''
                                                    }
                                                >
                                                    <div className="error">
                                                        {checkValidation.phoneNumber.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-4 form-dark">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control value={contactData.contactMessage} onChange={onChangeHandler} name='contactMessage' as="textarea" placeholder="Enter Message" rows={5} />
                                                <div
                                                    className={
                                                        checkValidation.contactMessage.isInvalid
                                                            ? 'animated fadeIn'
                                                            : ''
                                                    }
                                                >
                                                    <div className="error">
                                                        {checkValidation.contactMessage.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="captch mb-4">
                                                <ReCAPTCHA
                                                    ref={recaptchaRef}
                                                    sitekey={RECAPTCHA_SITE_KEY}
                                                    onChange={capthcaHandler}
                                                />
                                                <div className="error">
                                                    {recaptchaMessage}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="d-flex justify-content-lg-end flex-wrap">
                                                <Button variant="primary" onClick={!showLoading ? () => handleSubmit() : null} disabled={showLoading} className="btn-wh-180-54 btn-rounded btn-right-icons">{showLoading ? <Spinner animation="border" /> : "Submit"}<span><FontAwesomeIcon icon={faAngleRight} /></span></Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={12}>
                            <Card className="card-contact-detail p-30">
                                <Card.Header className="btn-block p-0 bg-transparent mb-18">
                                    <h4 className="fs-18 color-dcdcdc fw-700 mb-12">Get In Touch</h4>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <ul className='get_in_touch'>
                                        <li>
                                            <a href="#">
                                                <span className="icon-round">
                                                    <i className="icon icon-phone"></i>
                                                </span>
                                                {socialDetails.contactNumber}
                                            </a>
                                        </li>
                                        <li>
                                            <a href={"mailto:" + socialDetails.infoEmail}>
                                                <span className="icon-round">
                                                    <i className="icon-envelop"></i>
                                            </span>{socialDetails.infoEmail}</a>
                                        </li>
                                    </ul>
                                    <ul className="social_media_links">
                                        <li>
                                            <a href={socialDetails.facebookLink} target="_blank" className="btn btn-secondery btn-wh-30">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={socialDetails.twitterLink} target="_blank" className="btn btn-secondery btn-wh-30">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={socialDetails.linkedinLink} target="_blank" className="btn btn-secondery btn-wh-30">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={socialDetails.instagramLink} target="_blank" className="btn btn-secondery btn-wh-30">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Contact;

export async function getServerSideProps(context) {
    try {
        let socialDetails = [];
        const response = await Rest.axiosRequest(API.getContactUs, {})

        if (response.data.status) {
            socialDetails = {
                infoEmail: response.data.data[0].description ?? '',
                contactNumber: response.data.data[1].description ?? '',
                facebookLink: response.data.data[3].description ?? '',
                instagramLink: response.data.data[4].description ?? '',
                twitterLink: response.data.data[5].description ?? '',
                linkedinLink: response.data.data[6].description ?? '',
                recaptcha_key: response.data.data[10].description ?? '',
            };
        }
        return {
            props: {
                socialDetails
            },
        };
    } catch (e) {
        console.log(e.message);
        return {
            redirect: { destination: '/500' },
        };
    }
}

