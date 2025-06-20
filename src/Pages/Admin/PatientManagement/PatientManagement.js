import React, { useEffect, useRef, useState } from "react";
import {
    SearchOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import {
    Button,
    Input,
    Space,
    Table,
    Modal,
    Descriptions,
} from "antd";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountPatientAction } from "../redux/action/UserAction";
import Sidebar from "../Sidebar/Sidebar";

export default function PatientManagement() {
    const dispatch = useDispatch();

    // ✅ Sửa key đúng theo reducer
    const { arrAccountPatient } = useSelector((state) => state.UserReducer);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getListAccountPatientAction());
    }, [dispatch]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const resetSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText("");
        setSearchedColumn("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm ${dataIndex}`}
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
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && resetSearch(selectedKeys, confirm)}
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
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const showPatientDetail = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedPatient(null);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "ascend",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            ...getColumnSearchProps("username"),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            ...getColumnSearchProps("phoneNumber"),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"),
        },
        {
            title: "Chi tiết",
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    onClick={() => showPatientDetail(record)}
                />
            ),
        },
    ];

    return (
        <section className="container-fluid row g-0">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9 p-3">
                <h3 className="text-lg mb-3">Quản lý bệnh nhân</h3>
                <Table columns={columns} dataSource={arrAccountPatient} rowKey={"id"} /> {/* ✅ Sửa tại đây */}

                <Modal
                    title={`Thông tin bệnh nhân: ${selectedPatient?.username}`}
                    open={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600}
                >
                    {selectedPatient && (
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Họ và tên">{selectedPatient.fullName || "Chưa cập nhật"}</Descriptions.Item>
                            <Descriptions.Item label="Email">{selectedPatient.email}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedPatient.phoneNumber}</Descriptions.Item>
                            <Descriptions.Item label="Giới tính">{selectedPatient.gender || "Chưa cập nhật"}</Descriptions.Item>
                            <Descriptions.Item label="Ngày sinh">{selectedPatient.dateOfBirth || "Chưa cập nhật"}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedPatient.address || "Chưa cập nhật"}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">{selectedPatient.status}</Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">{new Date(selectedPatient.createdAt).toLocaleString()}</Descriptions.Item>
                        </Descriptions>
                    )}
                </Modal>
            </div>
        </section>
    );
}
