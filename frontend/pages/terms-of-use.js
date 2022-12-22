import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Meta from '../components/Meta';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';

const baseColor = "#202020";
const highlightColor = "#444";


function TermsAndConditions({ cmsData }) {
    // const [cmsData, setCmsData] = useState(props.data.content ?? []);

    return (
        <>
            <Meta title={cmsData.content ? cmsData.content.meta_title : ''} keyword={cmsData.content ? cmsData.content.meta_keyword : ''} description={cmsData.content ? cmsData.content.meta_desc : ''} />
            <section className="p-0 bg-black">
                <div className="page-title-wrap mb-60 bg-black border-btm-white-light">
                    <Container>
                        <h2 className="page-title text-center fs-26 color-dcdcdc fw-700 p-30-0 mb-0">{cmsData.content.main_title}</h2>
                    </Container>
                </div>
                <div className="cms-pages">
                    <Container>
                        <div className="p-b-30 m-l-r-30">
                            <div className="content-box">
                                <div dangerouslySetInnerHTML={{ __html: cmsData.content.main_content }}></div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default TermsAndConditions;

export const getServerSideProps = async () => {
    try {
        const response = await Rest.axiosRequest(API.getCmsData + '/terms-of-use', {}, 'GET')
        const { data, status } = response.data
        if (status) {
            return {
                props: {
                    cmsData: data,
                },
            }
        }
        else {
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