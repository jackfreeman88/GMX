import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Rest from '../config/rest.config';
import API from '../config/endpoints.config';
import { isLoggedIn, getSingle, contextCookie } from '../services/Auth';
import Notifier from '../components/Notifier';
import FormValidator from '../components/FormValidator';
import { useRouter } from 'next/router';
import Meta from '../components/Meta';
import { APP_NAME } from '../config/server.config';

function ForgotPassword() {
    const [email, setEmail] = useState({
        email: ''
    });
    const noti = new Notifier();
    const validator = new FormValidator([
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter email.",
        },
    ]);
    const [validation, setValidation] = useState(validator.valid());
    const [submitted, setSubmitted] = useState(false)
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    useEffect(async () => {
        if (isLoggedIn()) {
            if (getSingle('role') === '2') {
                router.replace('/my-account-seller')
            } else {
                router.replace('/my-account')
            }
        }
    }, [])

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setEmail((prevState) => ({ [name]: value }))
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        const validation = validator.validate(email)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            setShowLoading(true)
            const response = await Rest.axiosRequest(API.forgotPassword, email)
            setShowLoading(false)
            if (response.data.status) {
                setSubmitted(false)
                noti.notify(response.data.message, "success")
            } else {
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

    let checkValidation = submitted ? validator.validate(email) : validation

    return <>
        <Meta title={`Forgot Password | ${APP_NAME}`} keywords={''} description={''} />
        <section className="bg-black">
            <Container>
                <Row>
                    <Col lg={5} md={8} className="mx-auto">
                        <Card className="card-post border-gray bs-none">
                            <Card.Body className="p-md-5 py-md-4 p-3">
                                <Card.Title className='text-center fs-26 fw-700 color-dcdcdc mt-3 mb-4'>Forgot Password</Card.Title>
                                <Form className="form-dark">
                                    <Form.Group className="mb-4">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter Email" value={email.email} onChange={onChangeHandler} />
                                        <div className={checkValidation.email.isInvalid ? 'animated fadeIn' : ''} >
                                            <div className="error">
                                                {checkValidation.email.message}
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-4 text-center">
                                        <Button variant="primary" type="submit" className="btn-wh-180-56 btn-rounded btn-right-icons" onClick={!showLoading ? handleOnSubmit : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : <>Send Link<span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span></>}</Button>
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-center">
                                        <p className="color-dcdcdc">I remembered my password back to <Link href="/sign-in" className="color-22a612 fw-500">Login</Link></p>
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

export default ForgotPassword

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