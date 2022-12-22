
import moment, { format } from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

let yesterday = moment().subtract(1, "day");
export class Helper {

    static valid = (current) => {
        return current.isAfter(yesterday);
    }

    static niceString = (string, limit = 20, showTooltip = false) => {
        return ((string?.length >= limit)
            ? showTooltip
                ? <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip className="tooltip-580">{string}</Tooltip>}
                >
                    <span>{string.substring(0, limit) + ((string.length >= limit) ? '...' : '')}</span>
                </OverlayTrigger>
                : string.substring(0, limit) + ((string.length >= limit) ? '...' : '')
            : string
        )
    }
}

export const customFormat = ("DD MMM 'YY")

export const dateTimeFormat = (datetime, format) => moment(datetime).utc().format(format)

export const nicePrice = (price) => '$ ' + (Math.round(price * 100) / 100).toFixed(2)