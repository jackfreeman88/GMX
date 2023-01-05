import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row, Form, Button, Nav, Spinner } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { DropdownIndicator, react_select_lg_Styles_light } from "../components/DropDown";
// import Datetime from "react-datetime";
//import moment from "moment";
import "react-datetime/css/react-datetime.css";
import FormValidator from "../components/FormValidator";
import Rest from "../config/rest.config";
import API from "../config/endpoints.config";
import Notifier from "../components/Notifier";
import { contextCookie, isLoggedIn } from "../services/Auth";
import { Helper } from "../services/Helper";
import { useRouter } from "next/router";
import Meta from '../components/Meta';
import { APP_NAME, RECAPTCHA_SITE_KEY } from "../config/server.config";
const axios = require("axios");
import ReCAPTCHA from "react-google-recaptcha";
import CustomDatePicker from "../components/CustomDatePicker";

function SignUp(props) {
    const reCaptchaRef = useRef();
    const notifier = new Notifier();
    const passwordMatch = (confirmation, state) => {
        if ((state.password !== "" && state.confirmPassword !== "") && state.password === state.confirmPassword) {
            return false;
        } else {
            return true;
        }
    }

    const validator = new FormValidator([
        // {
        //     field: "firstName",
        //     method: "isEmpty",
        //     validWhen: false,
        //     message: "Please enter first name.",
        // },
        // {
        //     field: "lastName",
        //     method: "isEmpty",
        //     validWhen: false,
        //     message: "Please enter last name.",
        // },
        {
            field: "businessName",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter business name.",
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
            message: "Please select phone number.",
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
            message: "Please select license type.",
        },
        {
            field: "expirationDate",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter expiration date.",
        },
        {
            field: "licenseDocument",
            method: "isEmpty",
            validWhen: false,
            message: "Please upload license document.",
        }
    ]);

    const router = useRouter()
    const [state, setState] = useState({
        // firstName: "",
        // lastName: "",
        businessName: "",
        email: "",
        role: "3",
        password: "",
        confirmPassword: "",
        selectedState: "",
        zipCode: "",
        phoneNumber: "",
        licenseNumber: "",
        medRecId: "",
        expirationDate: "",
        licenseDocument: "",
    });
    const [showLoading, setShowLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [validation, setValidation] = useState(validator.valid());
    const [states, setStates] = useState([]);
    const [medRecs, setMedRecs] = useState([]);
    const [passwordType, setPasswordType] = useState({
        'password': 'password',
        'confirmPassword': 'password'
    })
    const [recaptchaMessage, setRecaptchaMessage] = useState('');

    useEffect(async () => {
        if (isLoggedIn()) {
            router.replace('/my-account')
        }

        const statesData = await Rest.axiosRequest(API.getStates, {}, 'GET')
        if (statesData && statesData.status === 200) {
            const states = [];
            statesData.data.data.map((state) => {
                states.push({ id: state.id, value: state.id, name: state.name, label: state.name });
            })
            setStates(states);
        } else {
            notifier.notify(statesData.data.message, "danger")
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
        // setState({ expirationDate: date.format("YYYY-MM-DD") })
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
                notifier.notify("Please upload Image or PDF file only.", "danger");
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
    const signUp = async () => {
        const validation = validator.validate(state)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            if (reCaptchaRef.current && reCaptchaRef.current.getValue()) {
                let formData = new FormData();
                // formData.append("firstName", state.firstName);
                // formData.append("lastName", state.lastName);
                formData.append("businessName", state.businessName);
                formData.append("email", state.email);
                formData.append("role", state.role);
                formData.append("password", state.password);
                formData.append("confirmPassword", state.confirmPassword);
                formData.append("selectedState", state.selectedState);
                formData.append("zipCode", state.zipCode);
                formData.append("phoneNumber", state.phoneNumber);
                formData.append("licenseNumber", state.licenseNumber);
                formData.append("medRecId", state.medRecId);
                formData.append("expirationDate", state.expirationDate);
                formData.append("licenseDocument", state.licenseDocument);

                setShowLoading(true)
                const jsonResponse = await Rest.axiosRequest(API.signUp, formData, "POST", true);
                const response = jsonResponse;
                if (response.status === 201) {
                    reCaptchaRef.current.reset();
                    setShowLoading(false)
                    notifier.notify("Signed up successfully you can log in now.", "success");
                    router.replace("/sign-in");
                } else {
                    notifier.notify(response.data.message, "danger");
                    setShowLoading(false)
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
    /* useEffect(() => {
        checkValidation = submitted
            ? validator.validate(state)
            : validation
    }) */
    return <>
        <Meta title={`Sign Up | ${APP_NAME}`} keyword={`Sign Up | ${APP_NAME}`} description={`Sign Up | ${APP_NAME}`} />
        <section className="bg-black">
            <Container>
                <Row>
                    <Col lg={7} md={10} className="mx-auto">
                        <Card className="card-post border-gray bs-none">
                            <Card.Body className="p-md-5 py-md-4 p-3">
                                <Card.Title className="text-center fs-26 fw-700 color-dcdcdc mt-3 mb-4">Sign Up</Card.Title>
                                <Nav variant="tabs" defaultActiveKey="/seller-sign-up" className="custom_tabs mb-4">
                                    <Link href="/sign-up" legacyBehavior>
                                        <Nav.Item>
                                            <Nav.Link href="/sign-up" className="active">Retailers</Nav.Link>
                                        </Nav.Item>
                                    </Link>
                                    <Link href="/seller/sign-up" legacyBehavior>
                                        <Nav.Item>
                                            <Nav.Link href="/seller/sign-up">Brands</Nav.Link>
                                        </Nav.Item>
                                    </Link>
                                </Nav>
                                <Form className="form-dark">
                                    <Row>
                                        {/* <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" name="firstName" onChange={onChangeHandler} placeholder="Enter First Name" />
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
                                            <Form.Group className="mb-4">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={onChangeHandler} />
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
                                        </Col> */}
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Business Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Business Name" name="businessName" onChange={onChangeHandler} />
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
                                            <Form.Group className="mb-4">
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
                                            <Form.Group className="mb-3">
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
                                                {/*   <Form.Select className="form-control">
                                                    <option>Default State</option>
                                                    <option>Default State</option>
                                                </Form.Select> */}
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Zip Code</Form.Label>
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
                                        <Col md={6}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="number" name="phoneNumber" onChange={onChangeHandler} placeholder="Enter Phone Number" min="0" minLength="10" />
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
                                            <Form.Group className="mb-4">
                                                <Form.Label>License Number</Form.Label>
                                                <Form.Control type="text" name="licenseNumber" onChange={onChangeHandler} placeholder="Enter License Number" />
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
                                                <Form.Label>Expiration Date</Form.Label>
                                                {/* <Form.Control
                                                    type="date"
                                                    name='expirationDate'
                                                    onChange={onChangeHandler}
                                                    placeholder="Enter Expiration Date" /> */}
                                                {/* <Datetime
                                                    dateFormat="DD MMM, YYYY"
                                                    timeFormat={false}
                                                    closeOnSelect={true}
                                                    inputProps={inputProps}
                                                    isValidDate={Helper.valid}
                                                    // value={moment(state.expirationDate).format(
                                                    //     "DD-MM-YYYY"
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
                                                    <Form.Label htmlFor="document_upload" className="btn btn-primary bs-none">
                                                        Choose File
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        accept="image/*,application/pdf"
                                                        name="license-upload"
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
                                                    onClick={!showLoading ? signUp : null}
                                                    disabled={showLoading}
                                                //onClick={signUp}
                                                >
                                                    {showLoading ? <Spinner animation="border" /> : "Sign Up"}
                                                    <span className="color-22a612">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </span>
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
                                        <Col md={12}>
                                            <Form.Group className="mt-4 mb-3 text-center">
                                                <p className="color-dcdcdc">
                                                    Already have an account?{" "}
                                                    <Link href="/sign-in" className="color-22a612 fw-500">
                                                        Sign In
                                                    </Link>
                                                </p>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}
export default SignUp;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: {}
    }
}