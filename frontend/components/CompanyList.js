import React, { useEffect, useState } from 'react'
import { Button, Figure } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../app/slices/userSlice';
import API from '../config/endpoints.config';
import Rest from '../config/rest.config';
import { ASSETS_URL } from '../config/server.config';
import { getSingle } from '../services/Auth';
import Notifier from './Notifier';

export default function CompanyList({ company, ...props }) {
    const dispatch = useDispatch();
    const noti = new Notifier();
    const [followStatus, setFollowStatus] = useState();

    useEffect(() => {
        setFollowStatus(company.length == '1' ? 'Following' : 'Follow')
    }, [company]);

    const handleFollow = async () => {
        let formData = {
            slug: company.slug,
        };
        let response = await Rest.axiosRequest(API.follow, formData)
        response = response.data;
        if (response.status) {
            const follow = response.data.follow;
            setFollowStatus(follow ? "Following" : "Follow");
        } else {
            noti.notify(response.message, "danger");
        }
    }

    useEffect(() => {
        dispatch(fetchUserById({ userId: getSingle('userId') }))
    }, [followStatus])

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Figure className="figure figure-circle figure-40 mb-0 me-3">
                    <img className="cover" src={ASSETS_URL + company.profilePath} alt="profile" />
                </Figure>
                <h4 className="fs-16 fw-500 my-2">{company.role == "2" ? company.brandName : company.businessName}</h4>
            </div>
            {getSingle('userId') != company.id && (followStatus == "Following" ?
                <Button variant="primary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Following</Button>
                :
                <Button variant="secondary" className="btn-rounded btn-wh-130-38 btn-h-30 fs-sm" onClick={handleFollow}><span className="me-2"><i className="icon icon-add-friend"></i></span>Follow</Button>)
            }
        </div>
    )
}
