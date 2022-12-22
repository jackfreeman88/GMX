import React, { useState } from "react";
import { Card, Col, Container, Row, Button, Table, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rest from "../config/rest.config";
import API from "../config/endpoints.config";
import moment from "moment";
import { customFormat } from "../services/Helper";
import { contextCookie } from "../services/Auth";
import { saveAs } from 'file-saver'
import { APP_NAME, REACT_APP_API_BASE_URL } from "../config/server.config";
import Notifier from "../components/Notifier";
import Meta from "../components/Meta";
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

function ManageSubscription({ activeSubscription, pastSubscriptionsList }) {
    const noti = new Notifier();
    const [isLoading, setIsLoading] = useState(false)
    const downloadInvoice = async (id) => {
        setIsLoading(true)
        const response = await Rest.axiosRequest(API.invoice + `${id}`, {}, 'GET')
        if (response.status === 200) {
            setIsLoading(false)
            saveAs(REACT_APP_API_BASE_URL + '/get/file' + response.data.data)
        } else {
            setIsLoading(false)
            console.log(response);
            noti.notify("Something went wrong please try again!", "danger")
        }
    }
    return (
        <>
            <Meta title={`Manage Subscription | ${APP_NAME}`} keywords={''} description={''} />
            <section className="bg-black p-30-0-60">
                <Container>
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <Card className="card-dark border-gray p-8-21-30 br-10">
                                <Card.Header className="border-btm-gray mb-20 px-0">
                                    <Card.Title className="fs-18 fw-600 color-dcdcdc">My Subscriptions</Card.Title>
                                </Card.Header>

                                <Card.Body className="p-0">
                                    <div className="brown-box p-20 d-flex justify-content-between align-items-center mb-30 flex-wrap">
                                        <ul className="listing-with-title">
                                            <li>
                                                <span className="title fs-15 fw-500 color-dcdcdc">Active Plan</span>
                                                <span className="fs-15 fw-600 color-dcdcdc">{activeSubscription.activePlan}</span>
                                            </li>

                                            <li>
                                                <span className="title fs-15 fw-500 color-dcdcdc">Start Date</span>
                                                <span className="fs-15 fw-600 color-dcdcdc">{moment(activeSubscription.startDate).format(customFormat)}</span>
                                            </li>

                                            <li>
                                                <span className="title fs-15 fw-500 color-dcdcdc">End Date</span>
                                                <span className="fs-15 fw-600 color-dcdcdc">{moment(activeSubscription.endDate).format(customFormat)}</span>
                                            </li>
                                        </ul>
                                        {/* <Button className="btn-outline-secondary-transparent bs-none br-30 m-5-0">Cancel Subscription</Button> */}
                                    </div>

                                    <div className="box-dark p-20 br-15 subscribed-plan mb-30">
                                        <span className="fs-30 color-22a612 mb-10 d-block">
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>

                                        <p className="mb-0 price fs-28 fw-700 color-dcdcdc">
                                            {activeSubscription.price}
                                            <span className="fs-13 color-a5a5a5 fw-400">/Month</span>
                                        </p>

                                        <p className="plan-type fs-16 fw-500 color-dcdcdc border-btm-white-light p-b-15 mb-20">{activeSubscription.activePlan}</p>

                                        <ul className="listing-true-false">
                                            <li className="true fs-14 fw-400 color-dcdcdc">Ctum phare tortor</li>

                                            <li className="true fs-14 fw-400 color-dcdcdc">Vivam lobortis lacus</li>

                                            <li className="false fs-14 fw-400 color-dcdcdc">Sapien mollis euismod</li>

                                            <li className="true fs-14 fw-400 color-dcdcdc">Sapien mollis euismod</li>
                                        </ul>
                                    </div>

                                    <h4 className="fs-18 fw-600 color-dcdcdc mb-15">Past Subscriptions List</h4>
                                    <div className="table-wrap">
                                        {/* <Table bordered hover variant="dark" id="seller-subscription"> */}
                                        <ResponsiveTable className="table table-bordered table-hover table-dark" id="seller-subscription">
                                            <Thead>
                                                <Tr>
                                                    <Th width="13px;">Subscriptions</Th>
                                                    <Th className="text-center" width="130px;">
                                                        Price
                                                    </Th>
                                                    <Th className="text-center" width="130px;">
                                                        Start Date
                                                    </Th>
                                                    <Th className="text-center" width="130px;">
                                                        End Date
                                                    </Th>
                                                    <Th className="text-center" width="100px;">
                                                        Download Invoice
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {pastSubscriptionsList.length > 0 ? (
                                                    pastSubscriptionsList.map((rowData, keyIndex) => (
                                                        <Tr key={keyIndex + "past"}>
                                                            <Td>{rowData.plans.title}</Td>
                                                            <Td className="text-center">{rowData.plans.planPrice}/Month</Td>
                                                            <Td className="text-center">{moment(rowData.startDate).format(customFormat)}</Td>
                                                            <Td className="text-center">{moment(rowData.endDate).format(customFormat)}</Td>
                                                            <Td className="text-center">
                                                                 <a onClick={
                                                                    !isLoading
                                                                        ? () => downloadInvoice(rowData.id) : null}
                                                                    disabled={isLoading}
                                                                    className={`btn btn-outline-primary btn-wh-130-38 btn-h-30 b-w-2 br-30 p-5-21 fs-14 text-decoration-none${isLoading ? ' disabled' : ''}`}>
                                                                    {isLoading ? <Spinner animation='border' size="sm"/> : "Download"}
                                                                </a>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                ) : (
                                                    <Tr>
                                                        <Td className="text-center" colSpan={10}>
                                                            No records found!
                                                        </Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        </ResponsiveTable>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default ManageSubscription;

export async function getServerSideProps(context) {
    try {
        let activeSubscription = {};
        let pastSubscriptionsList = [];
        const token = contextCookie(context, 'token');
        const subscriptionsDetails = await Rest.axiosRequest(API.subscribedPlan, {}, "GET", false, token);
        const response = subscriptionsDetails;
        if (response.status === 200) {
            activeSubscription = {
                activePlan: response.data.data.activeSubscription ? response.data.data.activeSubscription.userSubscription[0].plans.title : [],
                price: response.data.data.activeSubscription ? response.data.data.activeSubscription.userSubscription[0].plans.planPrice : "",
                startDate: response.data.data.activeSubscription ? response.data.data.activeSubscription.userSubscription[0].startDate : "",
                endDate: response.data.data.activeSubscription ? response.data.data.activeSubscription.userSubscription[0].endDate : "",
            };
            pastSubscriptionsList = response.data.data.pastSubscriptionsList ? response.data.data.pastSubscriptionsList.userSubscription : [];
            return {
                props: {
                    activeSubscription,
                    pastSubscriptionsList,
                },
            };
        } else {
            return {
                notFound: true
            };
        }
    } catch (e) {
        console.log(e.message);
        return {
            redirect: { destination: '/500' },
        };
    }
}
