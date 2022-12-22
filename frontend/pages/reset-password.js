import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import Notifier from '../components/Notifier';
import FormValidator from "../components/FormValidator";
import { useRouter } from 'next/router';

function ResetPassword() {
    const noti = new Notifier();
    let router = useRouter();
    const params = router.query;
    const passwordMatch = (confirmation, state) => {
		if ((passwordState.password !== "" && passwordState.confirm_password !== "") && passwordState.password === passwordState.confirm_password) {
			return false;
		} else {
			return true;
		}
	}
    const validator = new FormValidator([
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
            field: "confirm_password",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter confirm password.",
        },
        {
            field: 'confirm_password',
            method: 'isLength',
            args: [6, 20],
            validWhen: true,
            message: 'Current password should be minimum 6 and maximum 20 characters.'
        },
        {
			field: 'confirm_password',
			method: passwordMatch,
			validWhen: false,
			message: 'Please enter same as new password.'
		}
    ]);

    const token = params.token ?? '';
    const [passwordState, setPasswordState] = useState({
        password: '',
        confirm_password: ''
    });
    const [showLoading, setShowLoading] = useState(false);
    const [validation, setValidation] = useState(validator.valid());
    const [submitted, setSubmitted] = useState(false)

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setPasswordState((prevState) => ({ ...prevState, [name]: value.trim() }))
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        const validation = validator.validate(passwordState)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            setShowLoading(true)
            const response = await Rest.axiosRequest(API.resetPassword, { token, ...passwordState })
            setShowLoading(false)
            if (response.data.status) {
                setSubmitted(false)
                noti.notify(response.data.message, "success")
                router.replace("/sign-in");
            } else {
                console.log('response.data.message', response.data.message);
                if (response.data.message instanceof Array) {
                    for (let msg in response.data.message) {
                        noti.notify(response.data.message[msg], "danger")
                    }
                } else {
                    noti.notify(response.data.message, "danger")
                }
            }
        }
    }

    let checkValidation = submitted ? validator.validate(passwordState) : validation

    return (
        <>
            <section className="bg-black">
                <Container>
                    <Row>
                        <Col lg={5} md={8} className="mx-auto">
                            <Card className="card-post border-gray bs-none">
                                <Card.Body className="p-md-5 py-md-4 p-4">
                                    <Card.Title className='text-center fs-26 fw-700 color-dcdcdc mt-3 mb-4'>Reset Password</Card.Title>
                                    <Form className="form-dark">
                                        <Form.Group className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Enter Password" value={passwordState.password} onChange={onChangeHandler} />
                                            <div className={checkValidation.password.isInvalid ? 'animated fadeIn' : ''} >
                                                <div className="error">
                                                    {checkValidation.password.message}
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Group className="mb-4">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" name="confirm_password" placeholder="Enter Confirm Password" value={passwordState.confirm_password} onChange={onChangeHandler} />
                                                <div className={checkValidation.confirm_password.isInvalid ? 'animated fadeIn' : ''} >
                                                    <div className="error">
                                                        {checkValidation.confirm_password.message}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Form.Group>
                                        <Form.Group className="mb-4 text-center">
                                            <Button variant="primary" type="submit" className="btn-wh-180-56 btn-rounded btn-right-icons" onClick={!showLoading ? handleOnSubmit : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : <>Reset Password<span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span></>}</Button>
                                        </Form.Group>
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

export default ResetPassword

export async function getServerSideProps(context){
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