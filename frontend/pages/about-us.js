import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Figure } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { SkeletonOptions } from '../services/SkeletonOptions';
import Meta from '../components/Meta';
import Custom500 from './500';
import { useRouter } from 'next/router';
import { APP_NAME, ASSETS_URL } from '../config/server.config';
const baseColor = "#202020";
const highlightColor = "#444";

function Aboutus({ data }) {
    if(!data){
        return Custom500;
    }
    const router = useRouter()

    return (
        <>
            <Meta title={data.content ? data.content.meta_title + ` | ${APP_NAME}` : ''} keyword={data.content ? data.content.meta_keyword : ''} description={data.content ? data.content.meta_desc : ''} />
            <section className="p-0 bg-black">
                <div className="page-title-wrap mb-60 bg-black border-btm-white-light">
                    <Container className='text-center'>
                        <h2 className="page-title text-center fs-26 color-dcdcdc fw-700 p-30-0 mb-0">{data.content.section1_main_title}</h2>
                    </Container>
                </div>
                <section className="p-30-0 pt-0">
                    <Container>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className="about-img-col">
                                    <Figure className="mb-0 w-100p br-15 overflow-hidden">
                                        <img className="" src={ASSETS_URL + data.content.section1_list_image1} />
                                    </Figure>
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
                                <div className="content-box about-content-box p-t-30">
                                    <h4 className="fs-18 fw-600 color-dcdcdc o-09 mb-2">{data.content.section1_title}</h4>
                                    <div className="mb-4 color-dcdcdc" dangerouslySetInnerHTML={{ __html: data.content.section1_description }}></div>
                                    <ul className="listing-icon">
                                        <li>
                                            <Figure className="mb-0 w-40 h-40 bg-transparent">
                                                <img className="" src={"assets/images/diam.png"} />
                                            </Figure>
                                            <div className="p-t-7">
                                                <strong className="fs-18 fw-700 d-block color-dcdcdc mbottom-5">{data.content.section1_list_title1}</strong>
                                                <div dangerouslySetInnerHTML={{ __html: data.content.section1_list_description1 }}></div>
                                            </div>
                                        </li>
                                        <li>
                                            <Figure className="mb-0 w-40 h-40 bg-transparent">
                                                <img className="" src={"assets/images/dollor-hand.png"} />
                                            </Figure>
                                            <div className="p-t-7">
                                                <strong className="fs-18 fw-700 d-block color-dcdcdc mbottom-5">{data.content.section1_list_title2}</strong>
                                                <div dangerouslySetInnerHTML={{ __html: data.content.section1_list_description2 }}></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="bg-color-282828 about-tagline-section p-0-0-80-0">
                    <Container>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className="content-box p-t-100">
                                    <h4 className="fs-18 fw-600 color-dcdcdc o-09">{data.content.section2_main_title}</h4>
                                    <div dangerouslySetInnerHTML={{ __html: data.content.section2_description }}></div>
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
                                <div className="about-tagline-box">
                                    <Figure className="mb-0 w-100p br-15">
                                        <img className="" src={ASSETS_URL + data.content.section1_list_image2} />
                                    </Figure>
                                    <div className="tagline-wrap">
                                        <span className="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} /></span>
                                        <h3 className="fs-18 fw-600 color-black o-09">{data.content.section2_quote}</h3>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </section>

        </>
    )
}

export default Aboutus;

export async function getServerSideProps() {
    try {
        const response = await Rest.axiosRequest(API.getCmsData + '/about-us', {}, 'GET')
        return {
            props: { data: response.data.data ?? [] }
        };
    } catch {
        return {
            props: { data: [] }
        };
    }
};