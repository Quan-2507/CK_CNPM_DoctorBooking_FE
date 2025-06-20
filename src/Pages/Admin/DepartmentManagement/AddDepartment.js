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

const {Title} = Typography;

const AddDepartment = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            doctorId: 0,
            date: "",
            startTime: "",
            endTime: "",
            numOfSeats: 0,
        },
        onSubmit: async (values) => {
            try {

                console.log(values)
                await axios.post(`${API_BASE_URL}/admin/departments`, values, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                notification.success({
                    message: "Success",
                    description: "Schedule added successfully!",
                });
                navigate("/doctorManagement");
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
                    title={<Title level={4}>Thêm khoa</Title>}
                    bordered
                    style={{boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px"}}
                >
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <Form.Item label="Tên khoa" required>
                            <Input
                                name="nameVi"
                                value={formik.values.nameVi}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Tên khoa(Tiếng anh)" required>
                            <Input
                                name="nameEn"
                                value={formik.values.nameEn}
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
                                Thêm lịch
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default AddDepartment;
