import React, {useState, useEffect} from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    notification,
    Card,
    Typography,
    Row,
    Col,
    Spin,
} from "antd";
import {useFormik} from "formik";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import {ArrowLeftOutlined} from "@ant-design/icons";
const {Title} = Typography;

const EditDepartment = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(false);

    const { state } = useLocation(); // Lấy state từ router
    console.log("state", state);

    useEffect(() => {
        if (state?.department) {
            setDepartment(state.department); // Lưu dữ liệu vào state
        }
    }, [state]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            nameVi: department?.nameVi || "",
            nameEn: department?.nameEn || "",
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`${API_BASE_URL}/admin/departments/${department?.id}`, values, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                notification.success({
                    message: "Success",
                    description: "Department updated successfully!",
                });
                navigate("/departmentManagement");
            } catch (error) {
                notification.error({
                    message: "Update Failed",
                    description: error.response?.data || "Something went wrong",
                });
            }
        },
    });


    if (loading) {
        return (
            <Row justify="center" align="middle" style={{height: "100vh"}}>
                <Spin size="large"/>
            </Row>
        );
    }

    return (
        <Row justify="center" style={{marginTop: 40}}>
            <Col xs={22} sm={20} md={16} lg={12}>
                <Card
                    title={
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate(-1)} // Quay lại trang trước
                                style={{fontSize: '18px', padding: 0}}
                            />
                            <Title level={4} style={{margin: 0}}>
                                Chỉnh sửa khoa: {formik.values.nameVi}
                            </Title>
                        </div>
                    }
                    variant="outlined" // Fix warning: replace "bordered"
                    style={{
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                    }}
                >
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        <Form.Item label="Tên khoa" required>
                            <Input
                                name="nameVi"
                                value={formik.values.nameVi}
                                onChange={formik.handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Tên khoa(Tiếng Anh)" required>
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
                                Chỉnh sửa khoa
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default EditDepartment;
