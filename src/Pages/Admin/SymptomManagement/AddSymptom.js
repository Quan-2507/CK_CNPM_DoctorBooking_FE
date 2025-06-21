import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    notification,
    Card,
    Typography,
    Row,
    Col, Select, DatePicker, TimePicker,
} from "antd";
import {useFormik} from "formik";
import {useNavigate, useNavigation} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import {Option} from "antd/es/mentions";
import {getListAccountDoctorAction} from "../redux/action/UserAction";
import {useDispatch, useSelector} from "react-redux";
import {ArrowLeftOutlined} from "@ant-design/icons";

const {Title} = Typography;

const AddSymptom = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nameVi: "",
            nameEn: "",
            description:""
        },
        onSubmit: async (values) => {
            try {
                console.log(values)
                await axios.post(`${API_BASE_URL}/admin/symptoms`, values, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                notification.success({
                    message: "Success",
                    description: "Symptom added successfully!",
                });
                navigate("/symptomManagement");
            } catch (error) {
                notification.error({
                    message: "Add Failed",
                    description: error.response?.data || "Something went wrong",
                });
            }
        },
    });
    return (
        <Row justify="center" style={{marginTop: 40}}>
            <Col xs={22} sm={20} md={16} lg={12}>
                <Card
                    title={<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => navigate(-1)} // Quay lại trang trước
                            style={{fontSize: '18px', padding: 0}}
                        />
                        <Title level={4}> Thêm triệu chứng</Title>
                    </div>
                    }
                bordered
                style={{boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px"}}
            >
                <Form layout="vertical" onFinish={formik.handleSubmit}>
                    <Form.Item label="Tên tên triệu chứng" required>
                        <Input
                            name="nameVi"
                            value={formik.values.nameVi}
                            onChange={formik.handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Tên triệu chứng(Tiếng anh)" required>
                            <Input
                                name="nameEn"
                                value={formik.values.nameEn}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Mô tả" required>
                            <Input
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-primary"
                                style={{width: "100%", fontWeight: "bold"}}
                            >
                                Thêm triệu chứng
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default AddSymptom;
