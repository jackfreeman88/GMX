import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import cookie from "react-cookies";
import { Card, Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Rest from "../config/rest.config";
import FormValidator from "../components/FormValidator";
import { contextCookie, getSingle, isLoggedIn, saveData } from "../services/Auth";
import Notifier from '../components/Notifier';
import API from "../config/endpoints.config";
import { roles } from "../services/Role";
import Meta from "../components/Meta";
import { APP_NAME } from "../config/server.config";

function SignIn() {
    const noti = new Notifier();
    const router = useRouter();
    const validator = new FormValidator([
        {
            field: "username",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter email address.",
        },
        {
            field: "username",
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
            field: "password",
            method: "isLength",
            args: [6, 20],
            validWhen: true,
            message: "Password should be minimum 6 and maximum 20 characters.",
        },
    ]);
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const [showLoading, setShowLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [validation, setValidation] = useState(validator.valid());
    const [type, setType] = useState('password')
    const [remember, setRemember] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async () => {
        const validation = validator.validate(state)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            let userData = {
                username: state.username,
                password: state.password,
            };
            setShowLoading(true)
            const jsonResponse = await Rest.axiosRequest(API.signIn, userData);
            const response = jsonResponse.data;
            setShowLoading(false)
            if (response.status || !response) {
                if(response.data.user.role == roles.brand && response.data.user.isApproved != 1){
                    router.replace('/verification-pending');
                } else {
                    await saveData(response.data, remember);
                    if (response.data.user.role == roles.retailer) {
                        router.replace('/account');
                    } else {
                        router.replace('/account/seller');
                    }
                }
            } else {
                if (response.statusCode === 403) {
                    noti.notify(response.message, "danger");
                } else if (response.statusCode) {
                    noti.notify("Invalid username or password, Please try again.", "danger");
                }
            }
        }
    };
    const showHide = (e) => {
        e.preventDefault();
        setType(type === "password" ? "text" : "password")
    }
    let checkValidation = submitted ? validator.validate(state) : validation

    return <>
    <Meta title={`Sign in | ${APP_NAME}`} keywords='Sign in' description='Sign in' />
        <section className="bg-black">
            <Container>
                <Row>
                    <Col lg={5} md={8} sm={10} className="mx-auto">
                        <Card className="card-post border-gray bs-none">
                            <Card.Body className="p-md-5 py-md-4 p-3">
                                <Card.Title className="text-center fs-26 fw-700 color-dcdcdc mt-3 mb-4">Sign In</Card.Title>
                                <Form className="form-dark">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            name="username"
                                            onChange={handleChange}
                                            value={state.username}
                                        />
                                        <div
                                            className={
                                                checkValidation.username.isInvalid
                                                    ? 'animated fadeIn'
                                                    : ''
                                            }
                                        >
                                            <div className="error">
                                                {checkValidation.username.message}
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <div className="form-icon form-icon-right">
                                            <Form.Control
                                                type={type}
                                                placeholder="Enter Password"
                                                name="password"
                                                onChange={handleChange}
                                                value={state.password}
                                            />
                                            <span className="icon" onClick={showHide}>
                                                {type === "password" ? (
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
                                    <div className="d-flex justify-content-between mb-3 form-btmbox">
                                        <Form.Group className="mb-3">
                                            <Form.Check type="checkbox" label="Remember Me" id="rememberme" className="fw-500 color-white" onChange={() => setRemember(!remember)}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Link
                                                href="/forgot-password"
                                                className="color-22a612 fw-500 text-decoration-underline">
                                                Forgot Password?
                                            </Link>
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="mb-4 text-center">
                                        <Button
                                            variant="primary"
                                            className="btn-wh-180-56 btn-rounded btn-right-icons fw-500"
                                            onClick={!showLoading ? handleSubmit : null}
                                            disabled={showLoading}
                                        >
                                            {showLoading ? <Spinner animation="border" /> : "Sign In "}
                                            <span className="color-177b0b"><FontAwesomeIcon icon={faAngleRight} /></span>
                                        </Button>
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-center">
                                        <p className="color-dcdcdc">
                                            Don’t have an account yet?{" "}
                                            <Link href="/sign-up" className="color-22a612 fw-500">
                                                Sign Up
                                            </Link>
                                        </p>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default SignIn;

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    return {
        props: { },
    };
}