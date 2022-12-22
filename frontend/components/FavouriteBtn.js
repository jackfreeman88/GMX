import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { OverlayTrigger, Tooltip, } from 'react-bootstrap';
import { useState } from "react";
import API from "../config/endpoints.config";
import Rest from "../config/rest.config";
import Notifier from "./Notifier";

function FavouriteBtn(props) {
    const noti = new Notifier();
    const [checked, setChecked] = useState(props.isFavourite)
    const handleFavourite = async (slug) => {
        const response = await Rest.axiosRequest(API.addToFavourite + '/' + slug, {});
        if (response.data.status) {
            setChecked(!checked);
            noti.notify(response.data.message, 'success')
        } else {
            noti.notify(response.data.message, 'danger')
        }
    }
    const Favourites = (props) => (
        <Tooltip {...props}>Add Favourite</Tooltip>
    );

    return (
        <>  
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={Favourites}
            >
            <a className="action-btn color-22a612 fs-16" onClick={() => handleFavourite(props.productSlug)}>
                <FontAwesomeIcon icon={checked ? faSquareCheck : faSquare} />
            </a>
        </OverlayTrigger>
        </>

    );
}

export default FavouriteBtn;