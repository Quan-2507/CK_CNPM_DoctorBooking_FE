import React, { Fragment, useEffect, useRef, useState } from "react";
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    FormOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import {
    Button,
    Input,
    Space,
    Table,
    Avatar,
    Modal,
    Descriptions,
} from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getListAccountDoctorAction,
    deleteAccountAction,
} from "../redux/action/UserAction";

import Sidebar from "../Sidebar/Sidebar";

export default function DoctorManagement() {
    const dispatch = useDispatch();
    const accountReducer = useSelector((state) => state.UserReducer) || {};
    const { arrAccountDoctor = [] } = accountReducer;

    // Phẳng hóa dữ liệu từ dạng department --> list bác sĩ
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

    const data = flattenData(arrAccountDoctor);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getListAccountDoctorAction());
    }, [dispatch]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const resetSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText("");
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => {
        const keys = dataIndex.split('.');
        return {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                        ref={searchInput}
                        placeholder={`Tìm ${keys[keys.length - 1]}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            className="bg-primary"
                            style={{ width: 90 }}
                        >
                            Tìm
                        </Button>
                        <Button
                            onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Đặt lại
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
            ),
            onFilter: (value, record) => {
                let fieldValue = record;
                for (const key of keys) {
                    fieldValue = fieldValue[key];
                    if (!fieldValue) return false;
                }
                return fieldValue.toString().toLowerCase().includes(value.toLowerCase());
            },
            render: (text, record) => {
                let fieldValue = record;
                for (const key of keys) {
                    fieldValue = fieldValue[key];
                    if (!fieldValue) return '';
                }
                return searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={fieldValue ? fieldValue.toString() : ""}
                    />
                ) : (
                    fieldValue
                );
            },
        };
    };

    const showDoctorDetail = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedDoctor(null);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "ascend",
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: "Khoa",
            key: "department",
            ...getColumnSearchProps("department.nameVi"),
            sorter: (a, b) =>
                (a.department?.nameVi || "").localeCompare(b.department?.nameVi || ""),
            render: (_, record) => record.department?.nameVi || "Chưa phân khoa",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (_, data) => (
                data.imageUrl ? (
                    <img
                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                        src={data.imageUrl}
                        alt="Doctor avatar"
                    />
                ) : (
                    <Avatar size={40}>
                        {data.email?.charAt(0).toUpperCase()}
                    </Avatar>
                )
            ),
        },
        {
            title: "Quản lý",
            width: "20%",
            render: (_, data) => (
                <div key={data.id}>
                    <Link to={`/admin/doctormng/edit/${data.id}`}>
                        <Button type="link" icon={<EditOutlined />} />
                    </Link>

                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            if (window.confirm(`Bạn chắc chắn muốn xóa ${data.name}?`)) {
                                dispatch(deleteAccountAction(data.id));
                            }
                        }}
                    />
                    <Button
                        type="link"
                        icon={<InfoCircleOutlined />}
                        onClick={() => showDoctorDetail(data)}
                        title="Chi tiết"
                    />
                    {/*<Button*/}
                    {/*    type="link"*/}
                    {/*    icon={data.clinic ? <CalendarOutlined /> : <FormOutlined />}*/}
                    {/*    href={data.clinic*/}
                    {/*        ? `/admin/doctormng/schedule/${data.id}`*/}
                    {/*        : `/admin/doctormng/assignclinic/${data.id}`}*/}
                    {/*    title={data.clinic ? "Xem lịch khám" : "Gán phòng khám"}*/}
                    {/*/>*/}
                </div>
            ),
        },
    ];

    return (
        <section className="container-fluid row g-0">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9 p-3">
                <div className="mb-3 d-flex flex-column align-items-start">
                    <h3 className="text-lg">Quản lý bác sĩ</h3>
                    <Button type="primary" className="mt-2 bg-primary">
                        <Link to="/admin/doctormng/adddoc" style={{ color: "white", textDecoration: "none" }}>
                            + Thêm bác sĩ mới
                        </Link>
                    </Button>
                </div>
                <Table columns={columns} dataSource={data} rowKey={"id"} />

                <Modal
                    title={`Thông tin bác sĩ: ${selectedDoctor?.name}`}
                    open={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600}
                >
                    {selectedDoctor && (
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Họ và tên">{selectedDoctor.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedDoctor.email}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedDoctor.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Số năm kinh nghiệm">{selectedDoctor.experienceYears}</Descriptions.Item>
                            <Descriptions.Item label="Bằng cấp">{selectedDoctor.degree}</Descriptions.Item>
                            <Descriptions.Item label="Giờ tư vấn">{selectedDoctor.consultationHours}</Descriptions.Item>
                            <Descriptions.Item label="Đánh giá">{selectedDoctor.rating}</Descriptions.Item>
                            <Descriptions.Item label="Giới thiệu">{selectedDoctor.about}</Descriptions.Item>
                            <Descriptions.Item label="Khoa">{selectedDoctor.department?.nameVi}</Descriptions.Item>
                            <Descriptions.Item label="Ảnh đại diện">
                                {selectedDoctor.imageUrl ? (
                                    <img
                                        src={selectedDoctor.imageUrl}
                                        alt="avatar"
                                        style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                                    />
                                ) : (
                                    "Không có ảnh"
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Modal>
            </div>
        </section>
    );
}
