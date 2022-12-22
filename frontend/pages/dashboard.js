import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LinearScale
} from 'chart.js';
import Notifier from "../components/Notifier";
import API from "../config/endpoints.config";
import Rest from "../config/rest.config";
import { dateTimeFormat, Helper } from "../services/Helper";
import { Bar } from "react-chartjs-2";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meta from "../components/Meta";
import { APP_NAME } from "../config/server.config";
import { Table as ResponsiveTable, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
const moment = require('moment');

ChartJS.register(
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LinearScale
);

const options = (chartType) => {
    const opt = {
        responsive: true,
        elements: {
            point: {
                radius: 5,
            }
        },
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
        },
        scales: {
            y: {
                display: true,
                position: 'right',
                grid: {
                    lineWidth: 0,
                    borderColor: 'rgba(233,233,233,0.32)',
                },
                ticks: {
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                    color: "#969696",
                },
                title: {
                    color: 'white',
                    align: 'center',
                    display: true,
                    text: 'lbs',
                    padding: 0
                }
            },
            x: {
                grid: {
                    borderColor: 'rgba(233,233,233,0.32)',
                    lineWidth: 0,
                },
                ticks: {
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                    color: "white"
                }
            }
        },
    }
    return opt;
};

function Dashboard(props) {
    const noti = new Notifier();
    const [ordersHistory, setOrdersHistory] = useState([])
    const [strainChart, setStrainChart] = useState([])
    const [categoryChart, setCategoryChart] = useState([])
    const [soldByStrainMonth, setSoldByStrainMonth] = useState(moment().format('MMMM YYYY'));
    const [soldByCategoryMonth, setSoldByCategoryMonth] = useState(moment().format('MMMM YYYY'));
    useEffect(async () => {
        const ordersHistoryRes = await Rest.axiosRequest(API.dashboardOrdersHistory, {}, 'GET');
        if (ordersHistoryRes.data.status) {
            setOrdersHistory(ordersHistoryRes.data.data);
        } else {
            noti.notify(ordersHistoryRes.data.message, "danger")
        }
    }, [])

    useEffect(async () => {
        const productSoldByStrainRes = await Rest.axiosRequest(API.dashboardProductSoldByStrain, { selectedMonth: soldByStrainMonth });
        if (productSoldByStrainRes.data.status) {
            let chartData = {
                'labels': [],
                'data': [],
            }
            productSoldByStrainRes.data.data.map((singleData) => {
                chartData['labels'] = [...chartData['labels'], singleData['strainTitle']]
                chartData['data'] = [...chartData['data'], singleData['totalLbSold']]
            })
            setStrainChart(chartData)
        } else {
            noti.notify(productSoldByStrainRes.data.message, "danger")
        }
    }, [soldByStrainMonth])

    const updateSoldByStrainMonth = (action) => {
        let selectedMonth;
        if (action === 'prev') {
            selectedMonth = moment(soldByStrainMonth).subtract(1, 'month').format('MMMM YYYY');
        } else {
            selectedMonth = moment(soldByStrainMonth).add(1, 'month').format('MMMM YYYY');
        }
        if (moment(selectedMonth).diff(moment().format('MMMM YYYY'), 'month', true) <= 0) {
            setSoldByStrainMonth(selectedMonth);
        }
    }

    useEffect(async () => {
        const productSoldByCategoryRes = await Rest.axiosRequest(API.dashboardProductSoldByCategory, { selectedMonth: soldByCategoryMonth });
        if (productSoldByCategoryRes.data.status) {
            let chartData = {
                'labels': [],
                'data': [],
            }
            productSoldByCategoryRes.data.data.map((singleData) => {
                chartData['labels'] = [...chartData['labels'], singleData['categoryTitle']]
                chartData['data'] = [...chartData['data'], singleData['totalLbSold']]
            })
            setCategoryChart(chartData)
        } else {
            noti.notify(productSoldByCategoryRes.data.message, "danger")
        }
    }, [soldByCategoryMonth])

    const updateSoldByCategoryMonth = (action) => {
        let selectedMonth;
        if (action === 'prev') {
            selectedMonth = moment(soldByCategoryMonth).subtract(1, 'month').format('MMMM YYYY');
        } else {
            selectedMonth = moment(soldByCategoryMonth).add(1, 'month').format('MMMM YYYY');
        }
        if (moment(selectedMonth).diff(moment().format('MMMM YYYY'), 'month', true) <= 0) {
            setSoldByCategoryMonth(selectedMonth);
        }
    }

    return (
        <>
            <Meta title={`Dashboard | ${APP_NAME}`} keywords='Dashboard' description='Dashboard' />
            <section className="bg-black p-30-0-60">
                <Container>
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <Card className="card-dark border-gray p-8-21-30 br-10">
                                <Card.Header className="d-flex justify-content-between align-items-center border-btm-gray mb-20 px-0">
                                    <Card.Title className="fs-18 fw-600 color-dcdcdc">Dashboard</Card.Title>
                                </Card.Header>
                                <Card.Body className="p-0">
                                    <Row>
                                        <Col md={6} className="mb-30">
                                            <Card className="card-dark border-gray overflow-hidden h-100">
                                                <Card.Header className="bg-color-3d3d3d fs-14 fw-600 color-white border-bottom-gray-light p-13-20">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <span className="cursor-pointer">
                                                            <FontAwesomeIcon icon={faAngleLeft} onClick={() => updateSoldByStrainMonth('prev')} />
                                                        </span>
                                                        <span>{soldByStrainMonth}</span>
                                                        <span className="cursor-pointer">
                                                            <FontAwesomeIcon icon={faAngleRight} onClick={() => updateSoldByStrainMonth('next')} />
                                                        </span>
                                                    </div>
                                                </Card.Header>
                                                <div className="bg-color-191919 fs-14 fw-600 color-white o-09 border-bottom-gray-light p-13-20 color-dcdcdc">
                                                    Most Products Sold by Strain
                                                </div>
                                                <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09">
                                                    {
                                                        strainChart['data'] && strainChart['data'].length ?
                                                            <Bar id="strainChart"
                                                                options={options('soldByStrainChart')}
                                                                data={
                                                                    {
                                                                        labels: strainChart['labels'],
                                                                        datasets: [
                                                                            {
                                                                                fill: true,
                                                                                data: strainChart['data'],
                                                                                backgroundColor: '#22a612',
                                                                                pointBackgroundColor: '#fff',
                                                                            }
                                                                        ],
                                                                    }
                                                                }
                                                            />
                                                            : <div className="d-flex align-items-center justify-content-center mh-275">
                                                                <div className="data-not-found">No Data Available</div>
                                                            </div>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} className="mb-30">
                                            <Card className="card-dark border-gray overflow-hidden h-100">
                                                <Card.Header className="bg-color-3d3d3d fs-14 fw-600 color-white border-bottom-gray-light p-13-20">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <span className="cursor-pointer">
                                                            <FontAwesomeIcon icon={faAngleLeft} onClick={() => updateSoldByCategoryMonth('prev')} />
                                                        </span>
                                                        <span>{soldByCategoryMonth}</span>
                                                        <span className="cursor-pointer">
                                                            <FontAwesomeIcon icon={faAngleRight} onClick={() => updateSoldByCategoryMonth('next')} />
                                                        </span>
                                                    </div>
                                                </Card.Header>
                                                <div className="bg-color-191919 fs-14 fw-600 color-white o-09 border-bottom-gray-light p-13-20 color-dcdcdc">
                                                    Most Products Sold by Product Category
                                                </div>
                                                <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09">
                                                    {
                                                        categoryChart['data'] && categoryChart['data'].length ?
                                                            <Bar id="categoryChart"
                                                                options={options('soldByCategoryChart')}
                                                                data={
                                                                    {
                                                                        labels: categoryChart['labels'],
                                                                        datasets: [
                                                                            {
                                                                                fill: true,
                                                                                data: categoryChart['data'],
                                                                                backgroundColor: '#22a612',
                                                                                pointBackgroundColor: '#fff',
                                                                            }
                                                                        ],
                                                                    }
                                                                }
                                                            />
                                                            : <div className="d-flex align-items-center justify-content-center mh-275">
                                                                <div className="data-not-found">No Data Available</div>
                                                            </div>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={12}>
                                            <Card className="card-dark border-gray mb-30 overflow-hidden">
                                                <Card.Header className="bg-color-3d3d3d fs-18 fw-600 color-white border-bottom-gray-light p-13-20">Order History</Card.Header>
                                                <Card.Body className="bg-color-191919 fs-14 fw-30 color-white o-09">
                                                    <div className="table-wrap">
                                                        {/* <Table bordered hover variant="dark" id="seller-subscription"> */}
                                                        <ResponsiveTable className="table table-bordered table-hover table-dark" id="seller-subscription">
                                                            <Thead>
                                                                <Tr>
                                                                    <Th className="text-center" width="20px;">Order ID</Th>
                                                                    <Th className="text-center" width="80px;">
                                                                        Date
                                                                    </Th>
                                                                    <Th className="text-center" width="200px;">
                                                                        Product
                                                                    </Th>
                                                                    <Th className="text-center" width="200px;">
                                                                        Category
                                                                    </Th>
                                                                    <Th className="text-center" width="100px;">
                                                                        Quantity
                                                                    </Th>
                                                                    {/* <Th className="text-center" width="100px;">
                                                                    Price per lb
                                                                </Th> */}
                                                                    <Th className="text-center" width="100px;">
                                                                        Total
                                                                    </Th>
                                                                    <Th className="text-center" width="100px;">
                                                                        Status
                                                                    </Th>
                                                                </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                {
                                                                    ordersHistory.length > 0 ?
                                                                        ordersHistory.map((order, index) => (
                                                                            <Tr key={order.id}>
                                                                                <Td className="text-center">
                                                                                    <p className="fs-14 color-dcdcdc fw-500">#{order.orderId ?? ''}</p>
                                                                                </Td>
                                                                                <Td className="text-center">
                                                                                    <p className="fs-14 color-dcdcdc fw-500 o-08">{dateTimeFormat(order.createdAt, "DD MMM 'YY")}</p>
                                                                                </Td>
                                                                                <Td className="text-center">
                                                                                    <p className="fs-16 fw-600 color-f3772c">{order.product?.title ? Helper.niceString(order.product?.title, 15, true) : ''}</p>
                                                                                </Td>
                                                                                <Td className="text-center">
                                                                                    <p className="fs-14 fw-500 color-bfbfbf">{order.category?.title ?? ''}</p>
                                                                                </Td>
                                                                                <Td className="text-center">
                                                                                    {order.quantity ?? ''}
                                                                                </Td>
                                                                                {/* <Td className="text-center">
                                                                                    {order.product.productPrice ?? ''}
                                                                                </Td> */}
                                                                                <Td className="text-center">
                                                                                    {order.totalPrice ?? ''}
                                                                                </Td>
                                                                                <Td className="text-center">
                                                                                    {order.status === '1' ?
                                                                                        <p className="placed">Placed</p>
                                                                                        : order.status === '2' ?
                                                                                            <p className="placed">Accepted</p>
                                                                                            : order.status === '3' ?
                                                                                                <p className="cancel">Cancelled</p>
                                                                                                : order.status === '4' ?
                                                                                                    <p className="received">Delivered</p>
                                                                                                    : order.status === '5' ?
                                                                                                        <p className="received">Received</p>
                                                                                                        : order.status === '6' ?
                                                                                                            <p className="completed">Completed</p>
                                                                                                            : ''
                                                                                    }
                                                                                </Td>
                                                                            </Tr>
                                                                        ))
                                                                        // [...Array(5)].map((value, key) => (
                                                                        //     <Tr>
                                                                        //         <Td className="text-center" colSpan={7}>
                                                                        //             No records found!
                                                                        //         </Td>
                                                                        //     </Tr>
                                                                        // ))
                                                                        :
                                                                        <Tr>
                                                                            <Td className="text-center" colSpan={7}>
                                                                                No records found!
                                                                            </Td>
                                                                        </Tr>
                                                                }
                                                            </Tbody>
                                                        </ResponsiveTable>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Dashboard