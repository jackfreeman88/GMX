import Slider from "react-slick";
import { useState } from 'react';
import { Button, Card, Container, Row, Col, Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import Rest from "../config/rest.config";
import API from "../config/endpoints.config";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SkeletonOptions } from "../services/SkeletonOptions";
import background from "../public/assets/images/banner-slide1.jpg";
import Meta from "../components/Meta";
import { APP_NAME, ASSETS_URL } from "../config/server.config";

export default function Home({data}) {

  return (
      <>
        <Meta title={data.content ? data.content.meta_title + ` | ${APP_NAME}` : ''} keywords={data.content ? data.content.meta_keyword : ''} description={data.content ? data.content.meta_desc : ''} />
        <section className="p-0">
            <section className="banner-section p-0">
                <Slider dots={true}>
                    {
                        data.content.banner_content.length > 0 ?
                            data.content.banner_content.map((slider, keyIndex) => (
                                <div key={keyIndex} className="banner-slide-wrap">
                                    <div className="banner-slide" style={{ backgroundImage: `url(${ASSETS_URL + slider.image})` }}>
                                        <div className="banner-content">
                                            <h2 className="fs-60 fw-300 text-center color-white mb-0">{slider.preTitle}</h2>
                                            <h2 className="fs-60 fw-600 text-center color-white mb-0">{slider.title}</h2>
                                            <p className="fs-17 text-center color-white">
                                                {slider.description}
                                            </p>
                                            <div className="text-center">
                                                <Button href={slider.buttonLink} type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons btn-bg-white fw-600">
                                                    {slider.buttonText}
                                                    <span className="">
                                                        <FontAwesomeIcon icon={faAngleRight} />
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <Slider dots={true}>

                                <div className="banner-slide-wrap" >
                                    <div className="banner-slide" style={{ backgroundImage: `url(${background})` }} >
                                        <div className="banner-content">
                                            <h2 className="fs-60 fw-300 text-center color-white mb-0">Curabi est felis</h2>
                                            <h2 className="fs-60 fw-600 text-center color-white mb-0">Duis Mis Sien Digni</h2>
                                            <p className="fs-17 text-center color-white">usce eros nulla euismod elementum ante vulputate venenatis ipsum suspendisse vestibulum.</p>
                                            <div className="text-center">
                                                <Button type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons btn-bg-white fw-600">Read More<span className=""><FontAwesomeIcon icon={faAngleRight} /></span></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="banner-slide-wrap" >
                                    <div className="banner-slide" style={{ backgroundImage: `url(${background})` }} >
                                        <div className="banner-content">
                                            <h2 className="fs-60 fw-300 text-center color-white mb-0">Curabi est felis</h2>
                                            <h2 className="fs-60 fw-600 text-center color-white mb-0">Duis Mis Sien Digni</h2>
                                            <p className="fs-17 text-center color-white">usce eros nulla euismod elementum ante vulputate venenatis ipsum suspendisse vestibulum.</p>
                                            <div className="text-center">
                                                <Button type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons btn-bg-white fw-600">Read More<span className=""><FontAwesomeIcon icon={faAngleRight} /></span></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                    }
                </Slider>
            </section>

            <section className="p-70-0-80 vision-section">
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto vision-img-col">
                            <div className="vision-ing-box">
                                <Figure className="mb-0 w-100p br-8 overflow-hidden">
                                    <Figure.Image className="cover" src={ASSETS_URL + data.content.section2_image} />
                                </Figure>
                            </div>
                        </Col>

                        <Col lg={6} className="mx-auto">
                            <Card className="content-box vision-box br-8 bg-color-white bs-box b-none">
                                <Card.Body className="p-0">
                                    <span className="fs-18 fw-600 color-22a612">{data.content.section2_count}</span>
                                    <h3 className="title color-dcdcdc fs-35 fw-700">{data.content.section2_main_title}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: data.content.section2_description }}></div>
                                    <Button href={data.content.section2_button_link} type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons btn-outline-primary-transparent fw-600">
                                        {" "}
                                        {data.content.section2_button_title}
                                        <span className="">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </span>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="p-80-0 brand-section">
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto">
                            <Card className="content-box brand-content b-none bs-none bg-transparent">
                                <Card.Body className="p-0">
                                    <span className="fs-18 fw-600 color-white">{data.content.section3_count}</span>
                                    <h3 className="title color-white fs-35 fw-700">{data.content.section3_main_title}</h3>
                                    <ul className="listing-icon">
                                        <li>
                                            <i className={data.content.section3_list_icon1 + " color-white fs-24"}></i>
                                            <p>
                                                <strong className="color-white fs-20 fw-500 d-block">{data.content.section3_list_title1}</strong>
                                                <span className="color-white fs-16 fw-300 d-block">{data.content.section3_list_description1}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <i className={data.content.section3_list_icon2 + " color-white fs-18"}></i>
                                            <p>
                                                <strong className="color-white fs-20 fw-500 d-block">{data.content.section3_list_title2}</strong>
                                                <span className="color-white fs-16 fw-300 d-block">{data.content.section3_list_description2}</span>
                                            </p>
                                        </li>
                                    </ul>
                                    <Button href={data.content.section3_button_link} type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons btn-bg-white fw-600">
                                        {data.content.section3_button_title}
                                        <span className="">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </span>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6} className="mx-auto">
                            {
                                <Figure className="mb-0 w-100p br-8 overflow-hidden">
                                    <Figure.Image className="cover" src={ASSETS_URL + data.content.section3_image} />
                                </Figure>
                            }
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="p-88-0-78 retailer-section">
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto retailer-img-col">
                            <div className="retailer-img-box">
                                <Figure className="mb-0 br-8 large-img">
                                    <Figure.Image className="cover" src={ASSETS_URL + data.content.section4_image} />
                                </Figure>
                                <Figure className="mb-0 br-8 small-img">
                                    <Figure.Image className="cover" src={ASSETS_URL + data.content.section4_small_image} />
                                </Figure>
                            </div>
                        </Col>

                        <Col lg={6} className="mx-auto">
                            <Card className="content-box retailer-box bs-none b-none p-l-46 bg-transparent">
                                <Card.Body className="p-0">
                                    <span className="fs-18 fw-600 color-22a612">{data.content.section4_count}</span>
                                    <h3 className="title b-btm-none color-dcdcdc fs-35 fw-700">{data.content.section4_main_title}</h3>
                                    <div dangerouslySetInnerHTML={{ __html: data.content.section4_description }}></div>
                                    <ul className="listing-icon border-top-light p-t-35 mt-8">
                                        <li>
                                            <span className={data.content.section4_list_icon1 + " fs-20"}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </span>
                                            <p>
                                                <strong className="fs-17 fw-600 color-dcdcdc">{data.content.section4_list_title1}</strong>
                                                <span className="fs-16 fw-400 color-dcdcdc">{data.content.section4_list_description1}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <span className={data.content.section4_list_icon2 + " fs-20"}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </span>
                                            <p>
                                                <strong className="fs-17 fw-600 color-dcdcdc">{data.content.section4_list_title2}</strong>
                                                <span className="fs-16 fw-400 color-dcdcdc"> {data.content.section4_list_description2}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <span className={data.content.section4_list_icon3 + " fs-20"}>
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </span>
                                            <p>
                                                <strong className="fs-17 fw-600 color-dcdcdc">{data.content.section4_list_title3}</strong>
                                                <span className="fs-16 fw-400 color-dcdcdc"> {data.content.section4_list_description3}</span>
                                            </p>
                                        </li>
                                    </ul>
                                    <Button href={data.content.section4_button_link} varient="primary" type="submit" className="btn-wh-180-54 btn-rounded btn-right-icons fw-600">
                                        {data.content.section4_button_title}
                                        <span className="">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </span>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </section>
    </>
  );
}

export async function getServerSideProps() {
    try{
        const res = await Rest.axiosRequest(API.getCmsData + "/home", {}, "GET")
        const { data, status } = res.data
        if(status){
            return {
                props: {
                    data,
                },
            }
        } else {
            return {
                redirect: {
                destination: '/500'
            }
            }
        }
    } catch {
        return {
            redirect: {
                destination: '/500'
            }
        }
    }
}