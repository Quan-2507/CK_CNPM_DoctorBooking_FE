import React, { useState } from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    notification,
    Card,
    Typography,
    Row,
    Col
} from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

const { Title } = Typography;

const AddDoctor = () => {
    const [imgSrc, setImgSrc] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            departmentId: 0,
            phoneNumber: "",
            email: "",
            experienceYears: 0,
            degree: "",
            consultationHours: 0,
            rating: 0,
            about: "",
            imageUrl: "",
            userId: 0,
        },
        onSubmit: async (values) => {
            try {
                await axios.post(`${API_BASE_URL}/admin/doctors`, values, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                notification.success({
                    message: "Success",
                    description: "Doctor added successfully!",
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result);
                formik.setFieldValue("imageUrl", e.target.result);
            };
        }
    };

    return (
        <Row justify="center" style={{ marginTop: 40 }}>
            <Col xs={22} sm={20} md={16} lg={12}>
                <Card
                    title={<Title level={4}>Add New Doctor</Title>}
                    bordered
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "12px" }}
                >
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <Form.Item label="Full Name" required>
                            <Input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Email" required>
                            <Input
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Phone Number">
                            <Input
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Department ID">
                            <InputNumber
                                name="departmentId"
                                value={formik.values.departmentId}
                                onChange={(value) =>
                                    formik.setFieldValue("departmentId", value)
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item label="Experience (years)">
                            <InputNumber
                                name="experienceYears"
                                value={formik.values.experienceYears}
                                onChange={(value) =>
                                    formik.setFieldValue("experienceYears", value)
                                }
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item label="Degree">
                            <Input
                                name="degree"
                                value={formik.values.degree}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="Consultation Hours">
                            <InputNumber
                                name="consultationHours"
                                value={formik.values.consultationHours}
                                onChange={(value) =>
                                    formik.setFieldValue("consultationHours", value)
                                }
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item label="Rating (out of 5)">
                            <InputNumber
                                name="rating"
                                value={formik.values.rating}
                                onChange={(value) =>
                                    formik.setFieldValue("rating", value)
                                }
                                min={0}
                                max={5}
                                step={0.1}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item label="About">
                            <Input.TextArea
                                name="about"
                                value={formik.values.about}
                                onChange={formik.handleChange}
                                rows={4}
                            />
                        </Form.Item>

                        <Form.Item label="Avatar Image">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imgSrc && (
                                <img
                                    src={imgSrc}
                                    alt="Doctor"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                        marginTop: 10,
                                        border: "2px solid #f0f0f0",
                                    }}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="User ID">
                            <InputNumber
                                name="userId"
                                value={formik.values.userId}
                                onChange={(value) =>
                                    formik.setFieldValue("userId", value)
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-primary"
                                style={{ width: "100%", fontWeight: "bold" }}
                            >
                                Add Doctor
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default AddDoctor;
