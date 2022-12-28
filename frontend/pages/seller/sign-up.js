import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Nav } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from '../../config/endpoints.config';
import Rest from '../../config/rest.config';
import { faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import Skeleton from 'react-loading-skeleton';
import Meta from "../../components/Meta";
import { APP_NAME } from "../../config/server.config";
import { contextCookie } from "../../services/Auth";

function SellerSignStep1() {
    const [plans, setPlans] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(async () => {
        setIsLoading(true)
        const plansData = await Rest.axiosRequest(API.getPlans, {}, 'GET')
        const response = plansData.data;
        if (response.status) {
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
        setPlans(response.data)
    }, [])
    return <>
        <Meta title={`Sign Up | ${APP_NAME}`} keyword={`Sign Up | ${APP_NAME}`} description={`Sign Up | ${APP_NAME}`} />
        <section className="bg-black">
            <Container>
                <Row>
                    <Col lg={8} md={10} className="mx-auto">
                        <Card className="card-post border-gray bs-none">
                            <Card.Body className="p-md-5 py-md-4 p-3">
                                <Card.Title className="text-center fs-26 fw-700 color-dcdcdc mb-12">Sign Up</Card.Title>

                                <p className="text-center fs-15 fw-500 color-dcdcdc mb-2">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="color-22a612 fw-500">
                                        Sign in
                                    </Link>
                                </p>
                                <Nav variant="tabs" defaultActiveKey="/seller/sign-up" className="custom_tabs mb-4">
                                    <Link href="/sign-up" legacyBehavior>
                                        <Nav.Item>
                                            <Nav.Link href="/sign-up">Retailers</Nav.Link>
                                        </Nav.Item>
                                    </Link>
                                    <Link href="/seller/sign-up" legacyBehavior>
                                        <Nav.Item>
                                            <Nav.Link href="/seller/sign-up" className="active">Brands</Nav.Link>
                                        </Nav.Item>
                                    </Link>
                                </Nav>

                                <h3 className="fs-18 fw-700 color-dcdcdc mb-17">Select Plan</h3>
                                {
                                    isLoading ?
                                        <Skeleton height={400} />
                                        :
                                        plans.length > 0 ?
                                            plans.map((planData, keyIndex) => (
                                                (
                                                    <div key={keyIndex + 'plan'} className="border-white-2 bg-color-282828 p-20-20-20-39 br-15 mb-4">
                                                        <span className="fs-30 color-22a612 mb-10 d-block">
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>

                                                        <p className="mb-0 price fs-28 fw-700 color-dcdcdc">
                                                            $ {planData.price}<span className="fs-13 color-929292 fw-400">/Month</span>
                                                        </p>

                                                        <p className="plan-type fs-16 fw-500 color-dcdcdc border-bottom-light p-b-13 mb-20">{planData.title}</p>

                                                        <ul className="listing-true-false">
                                                            <li className="true fs-14 fw-400 color-dcdcdc">Ctum phare tortor convallis cursus metus, quis pharetra elit</li>

                                                            <li className="true fs-14 fw-400 color-dcdcdc">Vivam lobortis lacus morbi nec porta magna. Nam imperdiet nisi ipsum</li>

                                                            <li className="false fs-14 fw-400 color-dcdcdc">
                                                                Sapien mollis euismod bibendum congue neque, vel interdum risus. Nunc at sem fermentum
                                                            </li>

                                                            <li className="true fs-14 fw-400 color-dcdcdc">Sapien mollis euismod sodales et sit amet enim vitae commodo lobortis</li>
                                                        </ul>
                                                        <div className="text-center mt-22">
                                                            <Button variant="primary" className="btn btn-wh-150-46 btn-rounded btn-right-icons">
                                                                <Link
                                                                    href={
                                                                        '/seller/sign-up/' +
                                                                        btoa(planData.id)
                                                                    }
                                                                    legacyBehavior>
                                                                    <div>
                                                                        Select
                                                                        <span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span>
                                                                    </div>
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            ))

                                            :
                                            <div>No record found</div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    </>;
}

export default SellerSignStep1;

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