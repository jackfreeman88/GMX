import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Helper } from "../services/Helper";
import Select from "react-select";
import { DropdownIndicator, react_select_lg_Styles } from "./DropDown";
import { CategoriesContext } from "../pages/product/list";
import FormValidator from "./FormValidator";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import Rest from "../config/rest.config";
import Notifier from './Notifier';
import API from "../config/endpoints.config";
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CustomDatePicker from "./CustomDatePicker";

const noti = new Notifier();

function ProductRow({ product: initialProduct, handleStatusChange, handleCategoryFilter, isLastRow }) {
    //Edit Row
    const menuPlacement = isLastRow ? "top" : "auto";
    const topDatepicker = isLastRow ? "top-datepicker" : "";
    const { categories, medrecData: medrec, strainsData: strains, ioData: ioro } = useContext(CategoriesContext);
    const [showLoading, setShowLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [product, setProduct] = useState(initialProduct);
    const [editableProduct, setEditableProduct] = useState({
        title: product?.title ?? "",
        categoryId: product?.categoryId ?? "",
        medRecId: product?.medRecId ?? "",
        strainId: product?.strainId ?? "",
        thc: product.thc ?? "",
        flavor: product.flavor ?? "",
        dominant: product.dominant ?? "",
        iOId: product?.iOId ?? "",
        harvested: product.harvested ?? "",
        unit: product?.unit ?? "",
    });
    const editProduct = (pId) => {
        setIsEditable(true)
    };

    const cancleEdit = () => {
        setIsEditable(false);
        setEditableProduct({
            title: product.title,
            categoryId: product.categoryId,
            medRecId: product.medRecId,
            strainId: product.strainId,
            thc: product.thc,
            flavor: product.flavor,
            dominant: product.dominant,
            iOId: product.iOId,
            harvested: product.harvested,
            unit: product?.unit,
        });
        setShowLoading(false);
    }

    const validator = new FormValidator([
        {
            field: "title",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter title.",
        },
        {
            field: "categoryId",
            method: "isEmpty",
            validWhen: false,
            message: "Please select category.",
        },
        {
            field: "medRecId",
            method: "isEmpty",
            validWhen: false,
            message: "Please select med/rec.",
        },
        {
            field: "strainId",
            method: "isEmpty",
            validWhen: false,
            message: "Please select strain.",
        },
        {
            field: "thc",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter thc%.",
        },
        {
            field: "flavor",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter flavor.",
        },
        {
            field: "dominant",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter dominant terpene.",
        },
        {
            field: "iOId",
            method: "isEmpty",
            validWhen: false,
            message: "Please select i/o.",
        },
        {
            field: "harvested",
            method: "isEmpty",
            validWhen: false,
            message: "Please select harvested date.",
        },
    ]);

    const [validation, setValidation] = useState(validator.valid());

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditableProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (val, e) => {
        if (isEditable) {
            if (val) {
                setEditableProduct((prevState) => ({ ...prevState, [e.name]: val.value }));
            } else {
                setEditableProduct((prevState) => ({ ...prevState, [e.name]: '' }));
            }
        }
    };

    const handleChangeDate = (date) => {
        setEditableProduct((prevState) => ({ ...prevState, harvested: date instanceof moment ? date.format("YYYY-MM-DD") : '' }));
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const validation = validator.validate(editableProduct);
        setValidation(validation);
        setSubmitted(true);
        if (validation.isValid) {
            setShowLoading(true)
            let response = await Rest.axiosRequest(API.quickEditProduct + '/' + product.slug, editableProduct, 'PUT')
            if (response.status === 200) {
                noti.notify(response.data.message, 'success')
                setProduct(response.data.data)
                setIsEditable(false)
            } else {
                noti.notify(response.data.message, 'danger')
            }
            setSubmitted(false);
            setShowLoading(false)
        }
    };

    let checkValidation = submitted ? validator.validate(editableProduct) : validation;

    return (isEditable === false)
        ?
        <Tr>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior>{Helper.niceString(product.title, 20, true)}</Link></Td>
            <Td>
                <a className="color-0e9bfd text-decoration-underline" onClick={() => handleCategoryFilter(product.category.id)}>{product.category?.title}</a>
            </Td>
            <Td> <Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior>{product.medRec?.title}</Link></Td>
            {/* <Td>{product.productPrice}</Td> */}
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {product.strain?.title}</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {product.thc}%</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {product.flavor}</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {Helper.niceString(product.dominant, 20, true)}</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {product.io?.title}</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {product.niceHarvested}</Link></Td>
            <Td><Link
                href={`/product/edit/${product.slug}`}
                className="text-white"
                legacyBehavior> {Helper.niceString(product.unit, 20, true)}</Link></Td>
            <Td>
                {/* <Link href="#" className="action-btn color-f3772c text-decoration-none">
                    <FontAwesomeIcon icon={faEye} />
                </Link> */}
                <span className="action-btn color-22a612" onClick={() => editProduct(product.id)}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                <Link
                    href={`/product/edit/${product.slug}`}
                    className="action-btn color-22a612"
                    legacyBehavior><FontAwesomeIcon icon={faEdit} />
                </Link>
                <a className="action-btn color-f32c2c" onClick={() => handleStatusChange(product.slug)}>
                    {+product.isActive === 1 ?
                        <i className='fa fa-ban' id={"action-" + product.slug}></i>
                        : <i className='fa fa-check' id={"action-" + product.slug}></i>}
                </a>
            </Td>
        </Tr>
        :
        <Tr>
            <Td>
                <input type="text" name="title" className="form-control mw-110" value={editableProduct.title} onChange={handleChange} />
                <div className={checkValidation.title.isInvalid ? 'animated fadeIn' : ''} >
                    <div className="error">
                        {checkValidation.title.message}
                    </div>
                </div>
            </Td>
            <Td>
                <Select
                    classNamePrefix="react-select"
                    className="react-select-lg mw-90"
                    styles={react_select_lg_Styles}
                    value={categories.filter((item) => item.id == editableProduct.categoryId)}
                    options={categories.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    }))}
                    onChange={(val, e) => handleSelectChange(val, e)}
                    placeholder="Category"
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                    }}
                    name="categoryId"
                    isClearable={false}
                    menuPlacement={menuPlacement}
                />
                <div
                    className={
                        checkValidation.categoryId.isInvalid
                            ? 'animated fadeIn'
                            : ''
                    }
                >
                    <div className="error">
                        {checkValidation.categoryId.message}
                    </div>
                </div>
            </Td>
            <Td>
                <Select
                    classNamePrefix="react-select"
                    className="react-select-lg mw-120"
                    styles={react_select_lg_Styles}
                    value={medrec.filter((item) => item.id == editableProduct.medRecId)}
                    options={medrec.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    }))}
                    onChange={(val, e) => handleSelectChange(val, e)}
                    placeholder="Med/Rec"
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                    }}
                    name="medRecId"
                    isClearable={false}
                    menuPlacement={menuPlacement}
                />
                <div
                    className={
                        checkValidation.medRecId.isInvalid
                            ? 'animated fadeIn'
                            : ''
                    }
                >
                    <div className="error">
                        {checkValidation.medRecId.message}
                    </div>
                </div>
            </Td>
            <Td>
                <Select
                    classNamePrefix="react-select"
                    className="react-select-lg mw-90"
                    styles={react_select_lg_Styles}
                    value={strains.filter((item) => item.id == editableProduct.strainId)}
                    options={strains.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    }))}
                    onChange={(val, e) => handleSelectChange(val, e)}
                    placeholder="Strain"
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                    }}
                    name="strainId"
                    isClearable={false}
                    open={false}
                    menuPlacement={menuPlacement}
                />
                <div
                    className={
                        checkValidation.strainId.isInvalid
                            ? 'animated fadeIn'
                            : ''
                    }
                >
                    <div className="error">
                        {checkValidation.strainId.message}
                    </div>
                </div>
            </Td>
            <Td>
                <input type="number" name="thc" className="form-control mw-50" value={editableProduct.thc} onChange={handleChange} size={500} />
                <div className={checkValidation.thc.isInvalid ? 'animated fadeIn' : ''} >
                    <div className="error">
                        {checkValidation.thc.message}
                    </div>
                </div>
            </Td>
            <Td>
                <input type="text" name="flavor" className="form-control mw-100" value={editableProduct.flavor} onChange={handleChange} />
                <div className={checkValidation.flavor.isInvalid ? 'animated fadeIn' : ''} >
                    <div className="error">
                        {checkValidation.flavor.message}
                    </div>
                </div>
            </Td>
            <Td>
                <input type="text" name="dominant" className="form-control mw-100" value={editableProduct.dominant} onChange={handleChange} />
                <div className={checkValidation.title.isInvalid ? 'animated fadeIn' : ''} >
                    <div className="error">
                        {checkValidation.dominant.message}
                    </div>
                </div>
            </Td>
            <Td>
                <Select
                    classNamePrefix="react-select"
                    className="react-select-lg mw-90"
                    styles={react_select_lg_Styles}
                    value={ioro.filter((item) => item.id == editableProduct.iOId)}
                    options={ioro.map(({ id, name }) => ({
                        value: id,
                        label: name,
                    }))}
                    onChange={(val, e) => handleSelectChange(val, e)}
                    placeholder="l/o"
                    components={{
                        DropdownIndicator,
                        IndicatorSeparator: () => null,
                    }}
                    name="iOId"
                    isClearable={false}
                    menuPlacement={menuPlacement}
                />
                <div
                    className={
                        checkValidation.iOId.isInvalid
                            ? 'animated fadeIn'
                            : ''
                    }
                >
                    <div className="error">
                        {checkValidation.iOId.message}
                    </div>
                </div>
            </Td>
            <Td>
                {/* <Datetime
                    className={`tbl-datepicker mw-110 ${topDatepicker}`}
                    dateFormat="DD MMM, YYYY"
                    timeFormat={false}
                    closeOnSelect={true}
                    inputProps={{ placeholder: "Select Harvested Date", readOnly: true }}
                    isValidDate={(currentDate) => currentDate.isBefore(moment())}
                    value={editableProduct.harvested ? moment(editableProduct.harvested).format("DD MMM, YYYY") : ''}
                    onChange={(date) => handleChangeDate(date)}
                    closeOnTab={true}
                    utc={true}
                /> */}
                <CustomDatePicker
                    responsive={false}
                    selectedDate={editableProduct.harvested ? moment(editableProduct.harvested).format("DD MMM, YYYY") : ''}
                    handleOnChange={(date) => handleChangeDate(date)}
                    disableFutureDates={true}
                    disablePastDates={false}
                />
                <div
                    className={
                        checkValidation.harvested.isInvalid
                            ? 'animated fadeIn'
                            : ''
                    }
                >
                    <div className="error">
                        {checkValidation.harvested.message}
                    </div>
                </div>
            </Td>
            <Td>
                <input type="text" name="unit" className="form-control mw-100" value={editableProduct.unit} onChange={handleChange} />
            </Td>
            <Td className="mw-150">
                {showLoading
                    ?
                    <Spinner animation="border" />
                    :
                    <>
                        <span className="action-btn color-22a612" onClick={saveProduct}><i className="fa fa-save" aria-hidden="true"></i></span>
                        <span className="action-btn color-22a612" onClick={cancleEdit}><i className="fa fa-times" aria-hidden="true"></i></span>
                    </>
                }
            </Td>
        </Tr >;
}

export default ProductRow