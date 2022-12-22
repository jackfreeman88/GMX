import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Card, Col, Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import API from '../../../config/endpoints.config';
import { contextCookie, decodeData, getSingle } from '../../../services/Auth';
import FormValidator from "../../../components/FormValidator";
// import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Select from "react-select";
import { DropdownIndicator, react_select_lg_Styles } from "../../../components/DropDown";
import Rest from '../../../config/rest.config';
import Notifier from '../../../components/Notifier';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { SkeletonOptions } from '../../../services/SkeletonOptions';
import { ASSETS_URL, REACT_APP_API_BASE_URL } from "../../../config/server.config";
import CustomDatePicker from '../../../components/CustomDatePicker';
import { saveAs } from 'file-saver'

function EditProduct({ editProductData }) {
    const router = useRouter();
    const noti = new Notifier();
    const { slug } = router.query;
    // const validateImage = (confirmation, state) => {
    // 	if(slug !== undefined && state.imagesExistArr.length === 0 && state.productImages.length === 0){
    // 		return true;
    // 	}else{
    // 		return false;
    // 	}
    // }

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
        // {
        //     field: "price",
        //     method: "isEmpty",
        //     validWhen: false,
        //     message: "Please enter price per lb.",
        // },
        {
            field: "strainId",
            method: "isEmpty",
            validWhen: false,
            message: "Please select strain.",
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
            field: "description",
            method: "isEmpty",
            validWhen: false,
            message: "Please enter description.",
        },
        // {
        //     field: "productImages",
        //     method: validateImage,
        //     validWhen: false,
        //     message: "Please upload images.",
        // },
    ]);

    const [productData, setProductData] = useState(editProductData.data);
    const [showLoading, setShowLoading] = useState(false);
    const [validation, setValidation] = useState(validator.valid());
    const [submitted, setSubmitted] = useState(false)
    const [categories, setCategories] = useState(editProductData.categories);
    const [medrec, setMedRec] = useState(editProductData.medrec);
    const [strains, setStrains] = useState(editProductData.strains);
    const [ioro, setIoro] = useState(editProductData.ioro);
    const [showSkeleton, setShowSkeleton] = useState(false);
    const [maxFiles, setMaxFiles] = useState(editProductData.maxFiles);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData((prevState) => ({ ...prevState, [name]: value }));
    }

    const getUploadParams = ({ file, headers, meta }) => {
        const url = API.productImageUpload;
        return { url, headers: { "Authorization": `Bearer ${getSingle("token")}` }, meta: { userid: getSingle("token") } }
    }

    const handleChangeStatus = ({ meta, remove, xhr }, status, files) => {
        // if(status === 'preparing'){
        //     setMaxFiles(maxFiles-1)
        // }
        if (status === "error_validation") {
            remove()
            document.getElementById('max-files-err').classList.remove('d-none')
        } else if (status === 'headers_received') {
            if (xhr) {
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        const result = JSON.parse(xhr.response);
                        setProductData((prevState) => ({ ...prevState, productImages: [...productData.productImages, result.data] }));
                        setMaxFiles(maxFiles - 1)
                        document.getElementById('max-files-err').classList.add('d-none')
                    }
                }
            }
        } else if (status === 'removed') {
            if (xhr) {
                if (xhr.response) {
                    const result = JSON.parse(xhr.response);
                    const removefilename = result.data;
                    const response = Rest.axiosRequest(API.productImageRemove, { filePath: removefilename }, 'DELETE').then(
                        () => {
                            productData.productImages = productData.productImages.filter(function (item) {
                                return item !== removefilename
                            })
                            setProductData((prevState) => ({ ...prevState, productImages: [...productData.productImages] }))
                            setMaxFiles(maxFiles + 1)
                            document.getElementById('max-files-err').classList.add('d-none')
                        }
                    )
                        .catch(
                            (err) => noti.notify(err, "danger")
                        );
                }
            }
        }
        // else if(status === "aborted") {}
    }

    const handleSelectChange = (val, e) => {
        if (val) {
            setProductData((prevState) => ({ ...prevState, [e.name]: val.value }));
        } else {
            setProductData((prevState) => ({ ...prevState, [e.name]: '' }));
        }
    };

    const handleChangeDate = (date) => {
        setProductData((prevState) => ({ ...prevState, harvested: date instanceof moment ? date.format("YYYY-MM-DD") : '' }));
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const validation = validator.validate(productData)
        setValidation(validation)
        setSubmitted(true)
        if (validation.isValid) {
            setShowLoading(true)
            let formData = new FormData();
            for (const key in productData) {
                if (Object.hasOwnProperty.call(productData, key)) {
                    if (key === 'productImages' || key === 'imagesExistArr') {
                        for (var i = 0; i < productData[key].length; i++) {
                            formData.append(key, JSON.stringify(productData[key][i]));
                        }
                    } else {
                        formData.append(key, productData[key]);
                    }
                }
            }
            let response;
            response = await Rest.axiosRequest(API.addProduct + '/' + slug, formData, 'PUT', true)
            if (response.status === 200) {
                noti.notify(response.data.message, 'success')
                setSubmitted(false);
                router.push('/product/list')
            } else {
                noti.notify(response.data.message, 'danger')
            }
            setShowLoading(false)
        }
    }

    const removeComponent = async (file_name) => {
        await Rest.axiosRequest(API.productImageRemove, { filePath: file_name }, 'DELETE').then(
            (response) => {
                if (response.status === 200) {
                    productData.imagesExistArr = productData.imagesExistArr.filter(function (item) {
                        return item.image !== file_name
                    })
                    setProductData((prevState) => ({ ...prevState, imagesExistArr: [...productData.imagesExistArr] }))
                    setMaxFiles(maxFiles + 1)
                    noti.notify('Image removed successfully', 'success')
                    document.getElementById('max-files-err').classList.add('d-none')
                } else {
                    noti.notify(response.statusText, 'danger')
                }
            }
        )
            .catch(
                (err) => noti.notify(err, "danger")
            );
    }

    let inputProps = {
        placeholder: "Select Harvested Date",
        readOnly: true
    };

    let checkValidation = submitted ? validator.validate(productData) : validation

    const downloadFile = (filePath) => {
        saveAs(REACT_APP_API_BASE_URL + '/get/file' + filePath)
    }

    const documentHandler = (event) => {
        let file = event.target.files[0];
        if (file) {
            let fileType = file.type;
            if (fileType === 'application/pdf') {
                setProductData((prevState) => ({ ...prevState, labResults: event.target.files[0] }));
            } else {
                event.target.value = null;
                setProductData((prevState) => ({ ...prevState, labResults: '' }));
                noti.notify("Please upload Image or PDF file only.", "danger");
            }
        }
    };
    return (
        <>
            <section className="bg-black p-30-0-60">
                <Container>
                    <Row>
                        <Col lg={12} className="mx-auto">
                            <Card className="card-dark border-gray p-15-20-30 br-10">
                                <Card.Header className="border-btm-gray mb-20 p-l-0 p-r-0 p-t-0 p-b-13">
                                    <Card.Title className="fs-18 fw-600 color-white mb-0">
                                        {showSkeleton ?
                                            <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                <Skeleton width={150} />
                                            </SkeletonTheme>
                                            :
                                            'Edit Product'
                                        }
                                    </Card.Title>
                                </Card.Header>

                                <Card.Body className="p-0">
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Product Name" value={productData.title} name="title" onChange={handleChange} />
                                                            <div className={checkValidation.title.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.title.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Category</Form.Label>
                                                            <Select
                                                                classNamePrefix="react-select"
                                                                className="react-select-lg"
                                                                styles={react_select_lg_Styles}
                                                                value={categories.filter((item) => item.id == productData.categoryId)}
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
                                                                isClearable={true}
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
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Med/Rec</Form.Label>
                                                            <Select
                                                                classNamePrefix="react-select"
                                                                className="react-select-lg"
                                                                styles={react_select_lg_Styles}
                                                                value={medrec.filter((item) => item.id == productData.medRecId)}
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
                                                                isClearable={true}
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
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            {/* <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Price Per lb</Form.Label>
                                                            <Form.Control type="number" placeholder="Enter Price Per lb" value={productData.price} name="price" onChange={handleChange} />
                                                            <div className={checkValidation.price.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.price.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col> */}
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Strain</Form.Label>
                                                            <Select
                                                                classNamePrefix="react-select"
                                                                className="react-select-lg"
                                                                styles={react_select_lg_Styles}
                                                                value={strains.filter((item) => item.id == productData.strainId)}
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
                                                                isClearable={true}
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
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Dominant Terpene</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Dominant Terpene" value={productData.dominant} name="dominant" onChange={handleChange} />
                                                            <div className={checkValidation.dominant.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.dominant.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>l/o</Form.Label>
                                                            <Select
                                                                classNamePrefix="react-select"
                                                                className="react-select-lg"
                                                                styles={react_select_lg_Styles}
                                                                value={ioro.filter((item) => item.id == productData.iOId)}
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
                                                                isClearable={true}
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
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Harvested</Form.Label>
                                                            {/* <Datetime
                                                                dateFormat="DD MMM, YYYY"
                                                                timeFormat={false}
                                                                closeOnSelect={true}
                                                                inputProps={inputProps}
                                                                isValidDate={(currentDate) => currentDate.isBefore(moment())}
                                                                value={productData.harvested ? moment(productData.harvested).format("DD MMM, YYYY") : ''}
                                                                onChange={(date) => handleChangeDate(date)}
                                                                closeOnTab={true}
                                                                utc={true}
                                                            /> */}
                                                            <CustomDatePicker
                                                                responsive={true}
                                                                selectedDate={productData.harvested ? moment(productData.harvested).format("DD MMM, YYYY") : ''}
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
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>THC%</Form.Label>
                                                            <Form.Control type="number" placeholder="Enter THC%" value={productData.thc} name="thc" onChange={handleChange} />
                                                            <div className={checkValidation.thc.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.thc.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Flavor</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Flavor" value={productData.flavor} name="flavor" onChange={handleChange} />
                                                            <div className={checkValidation.flavor.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.flavor.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Unit Size</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Unit Size" value={productData?.unit} name="unit" onChange={handleChange} />
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={50} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Lab Results</Form.Label>
                                                            {productData.labResultsPath ? <a className="color-f3772c curser-pointer ms-2"
                                                                onClick={() => downloadFile(productData.labResultsPath)}
                                                            >(Download File)</a> : ''}
                                                            <div className="form-control upload_file" placeholder="Choose File">
                                                                <Form.Label htmlFor="labResults" className="btn btn-primary bs-none">
                                                                    Choose File
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    accept="application/pdf"
                                                                    name="labResults"
                                                                    className="uploadImg"
                                                                    id="labResults"
                                                                    onChange={(e) => documentHandler(e)}
                                                                />
                                                                <div className='my-3'>{productData.labResults ? productData.labResults.name : null}</div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={200} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Upload Images</Form.Label>
                                                            <div className="d-flex justify-content-start align-items-center flex-wrap mt-10">
                                                                {/* <div className="upload_file upload_file_btn mr-10">
                                                                    <Form.Label for="document_upload" className="btn btn-outline-gray bs-none"><i className="icon-file-upload"></i>Upload Image</Form.Label>
                                                                    <Form.Control type="file" id="document_upload" />
                                                                </div> */}
                                                                <p className="fs-14 color-dcdcdc fw-400 mb-2">Max 5 Images That Might be Helpful in Describing About Product</p>
                                                            </div>

                                                            {(productData.imagesExistArr) && (
                                                                <div className='dzu-previewMain'>
                                                                    {productData.imagesExistArr.map((row, i) => (
                                                                        <div className="dzu-previewContainer mb-3" key={i} id={"removeImg-" + row.id}>
                                                                            <img className="dzu-previewImage" src={ASSETS_URL + row.image} alt={row.image} title={row.Image} />
                                                                            <div className="dzu-previewStatusContainer">
                                                                                <span className="dzu-previewButton" onClick={() => removeComponent(row.image)}>
                                                                                    {/* <img className="dzu-previewImage" src={require('../../assets/images/fas-fa-times.svg').default} alt="img"/> */}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <Dropzone
                                                                getUploadParams={getUploadParams}
                                                                onChangeStatus={handleChangeStatus}
                                                                inputContent="Drag files to upload"
                                                                inputWithFilesContent="Upload Image"
                                                                accept="image/*"
                                                                maxFiles={5}
                                                                validate={({ meta }) => maxFiles > 0 ? false : 'You can not upload more than 5 images'}
                                                            // styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
                                                            />
                                                            {/* <div
                                                                className={
                                                                    checkValidation.productImages.isInvalid
                                                                        ? 'animated fadeIn'
                                                                        : ''
                                                                }
                                                            >
                                                                <div className="error">
                                                                    {checkValidation.productImages.message}
                                                                </div>
                                                            </div> */}
                                                            <div className='animated fadeIn d-none' id="max-files-err">
                                                                <div className="error">
                                                                    You can not upload more than 5 images
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group className="form-dark mb-4">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton height={100} />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control as="textarea" placeholder="Enter Description" style={{ height: '107px' }} value={productData.description} name="description" onChange={handleChange} />
                                                            <div className={checkValidation.description.isInvalid ? 'animated fadeIn' : ''} >
                                                                <div className="error">
                                                                    {checkValidation.description.message}
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <div className="d-flex justify-content-center align-items-center mt-6 mbottom-5 flex-wrap">
                                                    {showSkeleton ?
                                                        <SkeletonTheme baseColor={SkeletonOptions.baseColor} highlightColor={SkeletonOptions.highlightColor}>
                                                            <Skeleton width={300} height={50} inline={true} count={2} className="m-10" />
                                                        </SkeletonTheme>
                                                        :
                                                        <>
                                                            <Link href='/product/list'><a className="btn btn-wh-160-54 btn-rounded btn-secondary btn-right-icons m-10 ">Cancel<span><FontAwesomeIcon icon={faAngleRight} /></span></a></Link>
                                                            <Button variant="primary" type="submit" className="btn-wh-150-54 btn-rounded btn-right-icons m-10" onClick={!showLoading ? addProduct : null} disabled={showLoading}>{showLoading ? <Spinner animation="border" /> : "Save"}<span className="color-22a612"><FontAwesomeIcon icon={faAngleRight} /></span></Button>
                                                        </>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default EditProduct

export async function getServerSideProps(context) {
    const isLoggedIn = contextCookie(context, 'isLogin');
    if (!isLoggedIn) {
        return {
            redirect: { destination: "/" },
        };
    }
    try {
        const { slug } = context.params;
        const token = contextCookie(context, 'token');
        let editProductData = {};
        const response = await Rest.axiosRequest(API.getMyProduct + '/' + slug, {}, 'GET', false, token)
        if (response.status === 200) {
            const data = {
                title: response.data.data.title,
                categoryId: response.data.data.categoryId,
                medRecId: response.data.data.medRecId,
                price: response.data.data.price,
                strainId: response.data.data.strainId,
                dominant: response.data.data.dominant,
                iOId: response.data.data.iOId,
                harvested: response.data.data.harvested,
                thc: response.data.data.thc,
                description: response.data.data.description,
                flavor: response.data.data.flavor,
                imagesExistArr: response.data.data.productImages,
                productImages: [],
                labResultsPath: response.data.data.labResultsPath,
                unit: response.data.data?.unit,
            }
            editProductData.data = data;
            editProductData.maxFiles = 5 - response.data.data.productImages.length
        } else {
            return {
                notFound: true
            };
        }
        const categoriesData = await Rest.axiosRequest(API.getCategories, {}, 'GET', false, token)
        if (categoriesData.status === 200) {
            const categories = [];
            categoriesData.data.data.map((category) => {
                categories.push({ id: category.id, value: category.id, name: category.title, label: category.title });
            })
            editProductData.categories = categories
        }

        const medrecData = await Rest.axiosRequest(API.getMedrec, {}, 'GET', false, token)
        if (medrecData.status === 200) {
            const medrec = [];
            medrecData.data.data.map((value) => {
                medrec.push({ id: value.id, value: value.id, name: value.title, label: value.title });
            })
            editProductData.medrec = medrec
        }

        const strainsData = await Rest.axiosRequest(API.getStrains, {}, 'GET', false, token)
        if (strainsData.status === 200) {
            const strains = [];
            strainsData.data.data.map((value) => {
                strains.push({ id: value.id, value: value.id, name: value.title, label: value.title });
            })
            editProductData.strains = strains
        }

        const ioData = await Rest.axiosRequest(API.getIO, {}, 'GET', false, token)
        if (ioData.status === 200) {
            const ioroData = [];
            ioData.data.data.map((value) => {
                ioroData.push({ id: value.id, value: value.id, name: value.title, label: value.title });
            })
            editProductData.ioro = ioroData
        }
        return {
            props: {
                editProductData
            }
        }
    } catch (e) {
        console.log(e.message)
        return {
            redirect: { destination: '/product/list' },
        }
    }
}