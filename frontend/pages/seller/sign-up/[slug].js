import React, { useEffect, useRef, useState } from 'react';
/* global google */
import { cardImages, getCardTypeByValue, isExpiryInvalid, CARD_TYPES } from '../../../services/CardInput';
import { Card, Col, Container, Row, Form, Button, Nav, Spinner } from "react-bootstrap";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faEye, faEyeSlash, faLocation, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
// import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Select from "react-select";
import { DropdownIndicator, react_select_lg_Styles_light } from "../../../components/DropDown";
import FormValidator from '../../../components/FormValidator';
import InputMask from "react-input-mask";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import API from '../../../config/endpoints.config';
import Rest from '../../../config/rest.config';
import Notifier from '../../../components/Notifier';
import { contextCookie, isLoggedIn } from '../../../services/Auth';
import { Helper } from '../../../services/Helper';
import { useRouter } from 'next/router';
import Meta from '../../../components/Meta';
import { APP_NAME, RECAPTCHA_SITE_KEY } from '../../../config/server.config';
import ReCAPTCHA from 'react-google-recaptcha';
import CustomDatePicker from '../../../components/CustomDatePicker';

const axios = require("axios");

function SellerSignStep2(props) {
    const reCaptchaRef = useRef();
    const router = useRouter();
    const { slug } = router.query;
    // const params = router.query;
    const noti = new Notifier();
    const locationRef = useRef(null);
    const passwordMatch = (confirmation, state) => {
        if ((state.password !== "" && state.confirmPassword !== "") && state.password === state.confirmPassword) {
            return false;
        } else {
            return true;
        }
    }
    const validator = new FormValidator([
        {
            field: "businessName",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter name.",
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
            message: "Please enter valid email address.",
        },
        {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter password.",
        },
        {
            field: 'password',
            method: 'isLength',
            args: [6, 20],
            validWhen: true,
            message: 'Password should be minimum 6 and maximum 20 characters.'
        },
        {
            field: "confirmPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter confirm password.",
        },
        {
            field: 'confirmPassword',
            method: 'isLength',
            args: [6, 20],
            validWhen: true,
            message: 'Confirm password should be minimum 6 and maximum 20 characters.'
        },
        {
            field: 'confirmPassword',
            method: passwordMatch,
            validWhen: false,
            message: 'Please enter same as password.'
        },
        {
            field: "brandName",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter brand name.",
        },
        // {
        //     field: "website",
        //     method: "isEmpty",
        //     validWhen: false,
        //     message: "Please enter website.",
        // },
        {
            field: "selectedState",
            method: "isEmpty",
            validWhen: false,
            message: "Please select state.",
        },
        {
            field: "zipCode",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter zip code.",
        },
        {
            field: 'zipCode',
            method: 'isLength',
            args: [5, 5],
            validWhen: true,
            message: 'Zipcode should be 5 characters long.'
        },
        {
            field: "phoneNumber",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter phone number.",
        },
        {
            field: "licenseNumber",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter license number.",
        },
        {
            field: "medRecId",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter license type.",
        },
        {
            field: "expirationDate",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter license expire date.",
        },
        {
            field: "licenseDocument",
            method: "isEmpty",
            validWhen: false,
            message: "Please upload license document.",
        },
        {
            field: "address",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter address.",
        },
        {
            field: "description",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter description.",
        },
        {
            field: "cardNumber",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter card number.",
        },
        {
            field: "cardHolder",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter card holder's name.",
        },
        {
            field: "cardExpiry",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter card expiry.",
        },
        {
            field: "cardCvc",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter card cvv.",
        },
    ]);

    const [state, setState] = useState({
        /* ---- User Common Field ----*/
        businessName: "",
        // lastName: "",
        email: "",
        role: "2",
        password: "",
        confirmPassword: "",
        selectedState: "",
        zipCode: "",
        phoneNumber: "",
        licenseNumber: "",
        medRecId: "",
        expirationDate: "",
        licenseDocument: "",
        planId: atob(slug ?? ''),

        /* ---- Brand Field ---- */
        brandName: '',
        profileDocument: "",
        website: '',
        year: '',
        avgOrder: '',
        address: '',
        description: '',
        avgProductRating: '',
        reviewsProductCount: '',
        avgDOTRating: '',
        reviewsDOTCount: '',
        avgGeneralRating: '',
        reviewsGeneralCount: '',
        avgRating: '',
        // reviewsCount: '',
        /* ----Card Details */
        cardHolder: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });
    const [maskInput, setMaskInput] = useState('9999 9999 9999 9999 9999')
    const [passwordType, setPasswordType] = useState({
        'password': 'password',
        'confirmPassword': 'password'
    })

    const [card, setCard] = useState('unknown')
    const [expiryError, setExpiryError] = useState("");
    const [cardError, setCardError] = useState("");
    const [cvvError, setCvvError] = useState("");

    const [showLoading, setShowLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [validation, setValidation] = useState(validator.valid());
    const [states, setStates] = useState([]);
    const [medRecs, setMedRecs] = useState([]);
    const [recaptchaMessage, setRecaptchaMessage] = useState('');

    useEffect(async () => {
        if (isLoggedIn()) {
            router.push('/my-account')
        }

        const statesData = await Rest.axiosRequest(API.getStates, {}, 'GET')
        if (statesData.status === 200) {
            const states = [];
            statesData.data.data.map((state) => {
                states.push({ id: state.id, value: state.id, name: state.name, label: state.name });
            })
            setStates(states);
        } else {
            noti.notify(statesData.data.message, "danger")
        }

        const medRecData = await Rest.axiosRequest(API.getMedrec, {}, 'GET')
        if (medRecData && medRecData.status === 200) {
            const medRecs = [];
            medRecData.data.data.map((medRec) => {
                medRecs.push({ id: medRec.id, value: medRec.id, name: medRec.title, label: medRec.title });
            })
            setMedRecs(medRecs);
        } else {
            noti.notify(medRecData.data.message, "danger")
        }

        const autoCompleteAddress = new google.maps.places.Autocomplete(document.getElementById("address"), { componentRestrictions: { 'country': ['US'] } });
        google.maps.event.addListener(autoCompleteAddress, 'place_changed', function () {
            setState((prevState) => ({ ...prevState, address: locationRef.current.value }))
        });
    }, [])

    const handleReCaptcha = () => {
        if (reCaptchaRef.current && reCaptchaRef.current.getValue()) {
            setRecaptchaMessage('')
        }
    }

    const handleChangeSelectState = (val) => {
        if (val) {
            setState((prevState) => ({ ...prevState, selectedState: val.value }));
        } else {
            setState((prevState) => ({ ...prevState, selectedState: '' }));
        }
    };

    const handleChangeSelectLicenseType = (val) => {
        if (val) {
            setState((prevState) => ({ ...prevState, medRecId: val.value }));
        } else {
            setState((prevState) => ({ ...prevState, medRecId: '' }));
        }
    };

    const handleChangeDate = (date) => {
        setState((prevState) => ({ ...prevState, expirationDate: date.format("YYYY-MM-DD") }));
    };
    const documentHandler = (event) => {
        let file = event.target.files[0];
        if (file) {
            let fileType = file.type;
            let fileCheck = fileType.match(/image\/[A-Za-z]*/g);
            if (fileType === 'application/pdf' || (fileCheck && fileCheck.length > 0)) {
                setState((prevState) => ({ ...prevState, licenseDocument: event.target.files[0] }));
            } else {
                event.target.value = null;
                setState((prevState) => ({ ...prevState, licenseDocument: '' }));
                noti.notify("Please upload Image or PDF file only.", "danger");
            }
        }
    };

    const logoHandler = (event) => {
        let file = event.target.files[0];
        if (file) {
            let fileType = file.type;
            let fileCheck = fileType.match(/image\/[A-Za-z]*/g);
            if (fileCheck && fileCheck.length > 0) {
                setState((prevState) => ({ ...prevState, profileDocument: event.target.files[0] }));
            } else {
                event.target.value = null;
                setState((prevState) => ({ ...prevState, profileDocument: '' }));
                noti.notify("Please upload Image file only.", "danger");
            }
        }
    };

    const onChangeHandler = async (event) => {
        const { name, value } = event.target;
        if (name === 'zipCode' && value < 1) {
            return;
        }
        setState((prevState) => ({ ...prevState, [name]: (name === 'password' || name === 'confirmPassword') ? value.trim() : value }));
    };

    const cardChangeHandler = (event) => {
        setState((prevState) => ({ ...prevState, cardNumber: event.target.value }));
        let cardType = getCardTypeByValue(event.target.value) ? getCardTypeByValue(event.target.value).type : 'unknown'
        setCard(cardType)

        CARD_TYPES.map((card) => {
            if (cardType === card.type) {
                setMaskInput(card.cardInputMask)
            }
        })
        if (event.target.value.length != 0 && event.target.value.length < 15) {
            setCardError("Card number is invalid")
        } else {
            setCardError("")
        }
    }

    const dateChangeHandler = (event) => {
        const expiryDate = event.target.value
        const errorMsg = isExpiryInvalid(expiryDate)
        setState((prevState) => ({ ...prevState, cardExpiry: expiryDate }));
        if (!checkValidation.cardExpiry.isInvalid) {
            setExpiryError(errorMsg)
        } else {
            setExpiryError("")
        }
    }

    const csvChangeHandler = (event) => {
        const cvvData = event.target.value;
        const errorMsg = 'CVV is invalid'
        if (!checkValidation.cardCvc.isInvalid && cvvData !== '' && cvvData.length < 3) {
            setCvvError(errorMsg)
        } else {
            setState((prevState) => ({ ...prevState, cardCvc: event.target.value }));
            setCvvError("")
        }
        // if (event.target.value !== null || event.target.value == '') {
        // setCardError(event.target.value)
        // }
    }
    const sellerSignUp = async () => {
        const validation = validator.validate(state)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid && (expiryError === '' || expiryError === undefined) && cardError === '' && cvvError === '') {
            if (reCaptchaRef.current && reCaptchaRef.current.getValue()) {
                let formData = new FormData();
                formData.append("businessName", state.businessName);
                // formData.append("lastName", state.lastName);
                formData.append("email", state.email);
                formData.append("role", state.role);
                formData.append("password", state.password);
                formData.append("confirmPassword", state.confirmPassword);
                formData.append("selectedState", state.selectedState);
                formData.append("zipCode", state.zipCode);
                formData.append("phoneNumber", state.phoneNumber);
                formData.append("licenseNumber", state.licenseNumber);
                formData.append("expirationDate", state.expirationDate);
                formData.append("licenseDocument", state.licenseDocument);
                formData.append("planId", atob(slug));
                /* ----- brand ----- */
                formData.append("brandName", state.brandName);
                formData.append("profileDocument", state.profileDocument);
                formData.append("website", state.website);
                formData.append("year", state.year);
                formData.append("avgOrder", state.avgOrder);
                formData.append("address", state.address);
                formData.append("description", state.description);
                formData.append("medRecId", state.medRecId);
                formData.append("cardNumber", state.cardNumber);
                formData.append("cardExpiry", state.cardExpiry);
                formData.append("cardCvc", state.cardCvc);
                formData.append("cardHolder", state.cardHolder);
                setShowLoading(true)
                const jsonResponse = await Rest.axiosRequest(API.brandSignUp, formData, "POST", true);
                const response = jsonResponse;
                if (response.status === 201) {
                    reCaptchaRef.current.reset();
                    setShowLoading(false)
                    noti.notify("Signed up successfully you can log in now.", "success");
                    router.push("/sign-in");
                } else {
                    setShowLoading(false)
                    noti.notify(response.data.message, "danger");
                }
            } else {
                setRecaptchaMessage('Please verify captcha.')
            }
        }
    };
    let inputProps = {
        placeholder: "Select Expiration Date",
        readOnly: true
    };

    const showHide = (fieldName) => {
        // e.preventDefault();
        // e.stopPropagation();
        setPasswordType((prevState) => ({ ...prevState, [fieldName]: (prevState[fieldName] === "password" ? "text" : "password") }))
    }

    let checkValidation = submitted
        ? validator.validate(state)
        : validation
    return (
        <>
            <Meta title={`Sign Up | ${APP_NAME}`} keyword={`Sign Up | ${APP_NAME}`} description={`Sign Up | ${APP_NAME}`} />
            <section className="bg-black">
                <Container>
                    <Row>
                        <Col lg={8} md={10} className="mx-auto">
                            <Card className="card-post border-gray bs-none">
                                <Card.Body className="p-md-5 py-md-4 p-3">
                                    <Card.Title className='text-center fs-26 fw-700 color-dcdcdc mb-12'>Sign Up</Card.Title>
                                    <p className='text-center fs-15 fw-500 color-dcdcdc mb-2'>Already have an account? <Link href="/sign-in"><a className="color-22a612 fw-500">Sign in</a></Link></p>
                                    <Nav variant="tabs" defaultActiveKey="seller/sign-up" className="custom_tabs mb-4">
                                        <Link href="/sign-up">
                                            <Nav.Item>
                                                <Nav.Link href="/sign-up">Retailers</Nav.Link>
                                            </Nav.Item>
                                        </Link>
                                        <Link href="/seller/sign-up">
                                            <Nav.Item>
                                                <Nav.Link href="/seller/sign-up" className="active">Brands</Nav.Link>
                                            </Nav.Item>
                                        </Link>
                                    </Nav>

                                    <h3 className="fs-18 fw-700 color-dcdcdc mb-14">Personal Details</h3>
                                    <Form className="form-dark">
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" name="businessName" onChange={onChangeHandler} placeholder="Enter Name" />
                                                    <div
                                                        className={
                                                            checkValidation.businessName.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.businessName.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" name="email" onChange={onChangeHandler} placeholder="Enter Email" />
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
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control type="number" name="phoneNumber" onChange={onChangeHandler} placeholder="Enter Phone Number" min="0" />
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
                                            <Col md={6}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Password</Form.Label>
                                                    <div className="form-icon form-icon-right">
                                                        <Form.Control
                                                            type={passwordType['password']}
                                                            name="password"
                                                            onChange={onChangeHandler}
                                                            value={state.password}
                                                            placeholder="Enter Password"
                                                        />
                                                        <span className="icon" onClick={() => showHide('password')}>
                                                            {passwordType['password'] === "password" ? (
                                                                <FontAwesomeIcon icon={faEye} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faEyeSlash} />
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={
                                                            checkValidation.password.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.password.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <div className="form-icon form-icon-right">
                                                        <Form.Control
                                                            type={passwordType['confirmPassword']}
                                                            name="confirmPassword"
                                                            onChange={onChangeHandler}
                                                            value={state.confirmPassword}
                                                            placeholder="Enter confirmPassword"
                                                        />
                                                        <span className="icon" onClick={() => showHide('confirmPassword')}>
                                                            {passwordType['confirmPassword'] === "password" ? (
                                                                <FontAwesomeIcon icon={faEye} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faEyeSlash} />
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={
                                                            checkValidation.confirmPassword.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.confirmPassword.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <h3 className="fs-18 fw-700 color-dcdcdc mb-17 mt-13  ">Brand Details</h3>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Brand Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Brand Name" name="brandName" onChange={onChangeHandler} />
                                                    <div
                                                        className={
                                                            checkValidation.brandName.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.brandName.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-20">
                                                    <Form.Label>Logo<span>(optional)</span></Form.Label>
                                                    <div className="form-control upload_file" placeholder="Choose File">
                                                        <Form.Label htmlFor="document_upload" className="btn btn-primary bs-none">Choose File</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept="image/*"
                                                            name="profileDocument"
                                                            className="uploadImg"
                                                            id="document_upload"
                                                            onChange={(e) => logoHandler(e)}
                                                        />
                                                        <div className='my-3'>{state.profileDocument.name}</div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Website<span>(optional)</span></Form.Label>
                                                    <Form.Control type="text" name="website" onChange={onChangeHandler} placeholder="Enter Website" />
                                                    {/*<div 
                                                        className={
                                                            checkValidation.website.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.website.message}
                                                        </div>
                                                    </div>*/}
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Bussiness Establishment Year<span>(optional)</span></Form.Label>
                                                    <Form.Control type="number" name='year' onChange={onChangeHandler} placeholder="Enter Bussiness Establishment Year" min="0" />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Average Order Per Month<span>(optional)</span></Form.Label>
                                                    <Form.Control type="number" name='avgOrder' onChange={onChangeHandler} placeholder="Enter Averager Order Per Month" min="0" />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>License Number</Form.Label>
                                                    <Form.Control type="text" name='licenseNumber' onChange={onChangeHandler} placeholder="Enter License Number" />
                                                    <div
                                                        className={
                                                            checkValidation.licenseNumber.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.licenseNumber.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>License Type</Form.Label>
                                                    <Select
                                                        classNamePrefix="react-select"
                                                        styles={react_select_lg_Styles_light}
                                                        options={medRecs.map(({ id, name }) => ({
                                                            value: id,
                                                            label: name,
                                                        }))}
                                                        onChange={(val) => handleChangeSelectLicenseType(val)}
                                                        placeholder="Select License Type"
                                                        components={{
                                                            DropdownIndicator,
                                                            IndicatorSeparator: () => null,
                                                        }}
                                                        name="medRecId"
                                                        isClearable={true}
                                                    />
                                                    <div
                                                        className={
                                                            checkValidation.medRecId.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.medRecId.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>License Expire Date</Form.Label>
                                                    {/* <Datetime
                                                        dateFormat="DD MMM, YYYY"
                                                        timeFormat={false}
                                                        closeOnSelect={true}
                                                        inputProps={inputProps}
                                                        isValidDate={Helper.valid}
                                                        // value={moment(state.expirationDate).format(
                                                        //     "DD MMM, YYYY"
                                                        // )}
                                                        onChange={(date) => handleChangeDate(date)}
                                                        closeOnTab={true}
                                                        utc={true}
                                                        className="date_picker"
                                                    /> */}
                                                    <CustomDatePicker
                                                        responsive={true}
                                                        selectedDate={state.expirationDate}
                                                        handleOnChange={(date) => handleChangeDate(date)}
                                                        disableFutureDates={false}
                                                        disablePastDates={true}
                                                    />
                                                    <div
                                                        className={
                                                            checkValidation.expirationDate.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.expirationDate.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>License Document</Form.Label>
                                                    <div className="form-control upload_file" placeholder="Choose File">
                                                        <Form.Label htmlFor="document_upload" className="btn btn-primary bs-none">Choose File</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            accept='image/*,application/pdf'
                                                            name="image-upload"
                                                            className="uploadImg"
                                                            id="document_upload"
                                                            onChange={(e) => documentHandler(e)}
                                                        />
                                                        <div className='my-3'>{state.licenseDocument.name}</div>
                                                    </div>
                                                    <div
                                                        className={
                                                            checkValidation.licenseDocument.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.licenseDocument.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>State</Form.Label>
                                                    <Select
                                                        classNamePrefix="react-select"
                                                        styles={react_select_lg_Styles_light}
                                                        //value={state.selectedState}
                                                        options={states.map(({ id, name }) => ({
                                                            value: id,
                                                            label: name,
                                                        }))}
                                                        onChange={(val) => handleChangeSelectState(val)}
                                                        placeholder="Select State"
                                                        components={{
                                                            DropdownIndicator,
                                                            IndicatorSeparator: () => null,
                                                        }}
                                                        name="state_id"
                                                        isClearable={true}
                                                    />
                                                    <div
                                                        className={
                                                            checkValidation.selectedState.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.selectedState.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Zipcode</Form.Label>
                                                    <Form.Control type="number" name="zipCode" onChange={onChangeHandler} placeholder="Enter Zip Code" min="1" />
                                                    <div
                                                        className={
                                                            checkValidation.zipCode.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.zipCode.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Address</Form.Label>
                                                    <div className="form-icon form-icon-right">
                                                        <Form.Control type="text" name='address' onChange={onChangeHandler} placeholder="Enter Address" ref={locationRef} id='address' />
                                                        <span className="icon"><FontAwesomeIcon icon={faLocation} /></span>
                                                    </div>
                                                    <div
                                                        className={
                                                            checkValidation.address.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.address.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control as="textarea" name='description' onChange={onChangeHandler} placeholder="Enter Description" style={{ height: '100px' }} />
                                                    <div
                                                        className={
                                                            checkValidation.description.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.description.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <h3 className="fs-18 fw-700 color-dcdcdc mb-17 mt-13">Payment Details</h3>
                                            </Col>
                                            {/* <Form> */}
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Card Holder's Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name='cardHolder'
                                                        onChange={onChangeHandler}
                                                        placeholder="Enter Card Holder's Name"
                                                    />                                                     <div
                                                        className={
                                                            checkValidation.cardHolder.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.cardHolder.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Card Number</Form.Label>
                                                    <div className='card_img'>
                                                        <InputMask
                                                            name='cardNumber'
                                                            className="form-control"
                                                            placeholder='Card number'
                                                            mask={maskInput}
                                                            maskChar={null}
                                                            onChange={cardChangeHandler}
                                                            onBlur={cardChangeHandler}
                                                        />
                                                        <img src={`${cardImages[card ?? 'unknown'].src}`} style={{ width: '40px', height: 'auto' }} />
                                                    </div>

                                                    {cardError && <div className="error"> {cardError} </div>}
                                                    <div
                                                        className={
                                                            checkValidation.cardNumber.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.cardNumber.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>Expiry</Form.Label>
                                                    <InputMask
                                                        name='cardExpiry'
                                                        className="form-control"
                                                        mask="99/99"
                                                        maskChar={null}
                                                        placeholder='MM / YY'
                                                        onChange={dateChangeHandler}
                                                        onBlur={dateChangeHandler}
                                                    />
                                                    {expiryError && <div className="error"> {expiryError} </div>}
                                                    <div
                                                        className={
                                                            checkValidation.cardExpiry.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.cardExpiry.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <Form.Label>CVV
                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">CVV number on the back of the card</Tooltip>}>
                                                            <span className="d-inline-block"><FontAwesomeIcon icon={faQuestionCircle} /></span></OverlayTrigger>
                                                    </Form.Label>
                                                    <InputMask
                                                        name='cardCvc'
                                                        maskChar={null}
                                                        //maskPlaceholder={null}
                                                        className="form-control"
                                                        mask="999"
                                                        placeholder='CVV'
                                                        onChange={csvChangeHandler}
                                                        onBlur={csvChangeHandler}
                                                    />
                                                    {cvvError && <div className="error"> {cvvError} </div>}
                                                    <div
                                                        className={
                                                            checkValidation.cardCvc.isInvalid
                                                                ? 'animated fadeIn'
                                                                : ''
                                                        }
                                                    >
                                                        <div className="error">
                                                            {checkValidation.cardCvc.message}
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group className="mb-4">
                                                    <div className="recaptcha">
                                                        <ReCAPTCHA
                                                            ref={reCaptchaRef}
                                                            sitekey={RECAPTCHA_SITE_KEY}
                                                            onChange={handleReCaptcha}
                                                        />
                                                    </div>
                                                    <div className="error">
                                                        {recaptchaMessage}
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-4 text-end">
                                                    <Button
                                                        variant="primary"
                                                        //type="submit"
                                                        className="btn-wh-180-56 btn-rounded btn-right-icons"
                                                        onClick={!showLoading ? sellerSignUp : null}
                                                        disabled={showLoading}
                                                    >
                                                        {showLoading ? <Spinner animation="border" /> : "Sign Up"}
                                                        <span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span>
                                                    </Button>
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                {!checkValidation.isValid ?
                                                    <div className="error text-center">
                                                        You have missed to provide details for some mendatory fields
                                                    </div>
                                                    : null}
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SellerSignStep2

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {},
    };
}