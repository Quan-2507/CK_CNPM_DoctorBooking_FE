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
import { useFormik } from "formik";
import {useNavigate, useNavigation} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import {Option} from "antd/es/mentions";
import {  getListAccountDoctorAction} from "../redux/action/UserAction";
import { useDispatch, useSelector } from "react-redux";
import {ArrowLeftOutlined} from "@ant-design/icons";

const { Title } = Typography;

const SheduleManagement = () => {
    const navigate = useNavigate();
    const accountReducer = useSelector((state) => state.UserReducer) || {};
    const { arrAccountDoctor = [] } = accountReducer;
    const dispatch = useDispatch();

    // Phẳng hóa dữ liệu
    const flattenData = (data) => {
        return data.flatMap(department =>
            department.doctors.map(doctor => ({
                ...doctor,
                department: {
                    id: department.departmentId,
                    nameVi: department.departmentName
                }
            }))
        );
    };

    const data  = flattenData(arrAccountDoctor);
    console.log("data",data)
    useEffect(() => {
        dispatch(getListAccountDoctorAction());
    }, [dispatch]);
    const formik = useFormik({
        initialValues: {
            doctorId:0,
            date:"",
            startTime: "",
            endTime: "",
            numOfSeats: 0,
        },
        onSubmit: async (values) => {
            try {
                const formattedValues = {
                    doctorId: values.doctorId ? parseInt(values.doctorId) : null,
                    date: values.date ? values.date.format('YYYY-MM-DD') : null,
                    startTime: values.startTime ? values.startTime.format('HH:mm') : null,
                    endTime: values.endTime ? values.endTime.format('HH:mm') : null,
                    numOfSeats: values.numOfSeats,
                };
                console.log(formattedValues)
                await axios.post(`${API_BASE_URL}/admin/schedules`, formattedValues, {
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
        <Row justify="center" style={{ marginTop: 40 }}>
            <Col xs={22} sm={20} md={16} lg={12}>
                <Card
                    title={<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined/>}
                            onClick={() => navigate(-1)} // Quay lại trang trước
                            style={{fontSize: '18px', padding: 0}}
                        />
                        <Title level={4}>Thêm lịch khám</Title>
                    </div>
                    }
                bordered
                style={{boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px"}}
            >
                <Form layout="vertical" onFinish={formik.handleSubmit}>
                    <Form.Item label="Bác sĩ" required>
                        <Select
                            placeholder="Chọn bác sĩ"
                            value={formik.values.doctorId}
                            onChange={(value) => formik.setFieldValue("doctorId", value)}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {data.map((doctor) => (
                                    <Option key={doctor.id} value={doctor.id}>
                                        {doctor.name} - {doctor.department.nameVi}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Chọn ngày"
                            validateStatus={formik.errors.date ? "error" : ""}
                            help={formik.errors.date}
                            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                        >
                            <DatePicker
                                value={formik.values.date}
                                format="YYYY-MM-DD"
                                placeholder="Chọn ngày (YYYY-MM-DD)"
                                style={{ width: '100%' }}
                                onChange={(value) => formik.setFieldValue("date", value)}

                            />
                        </Form.Item>

                        <Form.Item
                            name="startTime"
                            label="Giờ bắt đầu"
                            validateStatus={formik.errors.startTime ? "error" : ""}
                            help={formik.errors.startTime}
                            rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
                        >
                            <TimePicker
                                format="HH:mm"
                                value={formik.values.startTime}
                                onChange={(value) => formik.setFieldValue("startTime", value)}
                                placeholder="Chọn giờ (HH:mm)"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="endTime"
                            label="Giờ kết thúc"
                            validateStatus={formik.errors.endTime ? "error" : ""}
                            help={formik.errors.endTime}
                            rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
                        >
                            <TimePicker
                                format="HH:mm"
                                value={formik.values.endTime}
                                onChange={(value) => formik.setFieldValue("endTime", value)}
                                placeholder="Chọn giờ (HH:mm)"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="numOfSeats"
                            label="Chọn số chỗ ngồi"
                            rules={[{ required: true, message: 'Vui lòng nhập số!' }]}
                        >
                            <InputNumber
                                min={1}
                                max={100}
                                value={formik.values.numOfSeats}
                                onChange={(value) => formik.setFieldValue("numOfSeats", value)}
                                placeholder="Nhập hoặc tăng/giảm số"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-primary"
                                style={{ width: "100%", fontWeight: "bold" }}
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

export default SheduleManagement;
