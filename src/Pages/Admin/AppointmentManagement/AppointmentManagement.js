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
import { getListAppointmentAction } from "../redux/action/AppointmentAction"; // file action mới
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../../../Home/Topbar";

export default function AppointmentManagement() {
    const dispatch = useDispatch();
    const { arrAppointments } = useSelector((state) => state.AppointmentReducer);

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getListAppointmentAction());
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

    const showAppointmentDetail = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedAppointment(null);
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
            title: "Ngày đặt lịch",
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            render: (date) => {
                const d = new Date(date);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}/${month}/${year}`; // format: dd/mm/yyyy
            },
        },
        {
            title: "Ngày khám",
            dataIndex: "scheduleDate",
            key: "scheduleDate",
            render: (date) => {
                const d = new Date(date);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}/${month}/${year}`; // format: dd/mm/yyyy
            },
        },

        {
            title: "Thời gian bắt đầu",
            dataIndex: "startTime",
            key: "startTime",
        },
        {
            title: "Thời gian kết thúc",
            dataIndex: "endTime",
            key: "endTime",
        },
        {
            title: "Bác sĩ",
            dataIndex: "doctorName",
            key: "doctorName",
            ...getColumnSearchProps("doctorName"),
        },
        {
            title: "Bệnh nhân",
            dataIndex: "userName",
            key: "userName",
            ...getColumnSearchProps("userName"),
        },
        {
            title: "Chi tiết",
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    onClick={() => showAppointmentDetail(record)}
                />
            ),
        },
    ];

    return (
        <>
            <Topbar />
        <section className="container-fluid row g-0">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9 p-3">
                <h3 className="text-lg mb-3">Quản lý lịch đặt khám</h3>
                <Table columns={columns} dataSource={arrAppointments} rowKey={"id"} />

                <Modal
                    title={`Chi tiết lịch hẹn ID: ${selectedAppointment?.id}`}
                    open={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600}
                >
                    {selectedAppointment && (
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="ID">{selectedAppointment.id}</Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt lịch">{new Date(selectedAppointment.appointmentDate).toLocaleString()}</Descriptions.Item>
                            <Descriptions.Item label="Ngày khám">{selectedAppointment.scheduleDate}</Descriptions.Item>
                            <Descriptions.Item label="Bắt đầu">{selectedAppointment.startTime}</Descriptions.Item>
                            <Descriptions.Item label="Kết thúc">{selectedAppointment.endTime}</Descriptions.Item>
                            <Descriptions.Item label="Bác sĩ">{selectedAppointment.doctorName}</Descriptions.Item>
                            <Descriptions.Item label="Bệnh nhân">{selectedAppointment.userName}</Descriptions.Item>
                            <Descriptions.Item label="Số thứ tự">{selectedAppointment.appointmentNumber}</Descriptions.Item>
                        </Descriptions>
                    )}
                </Modal>
            </div>
        </section>
            </>
    );
}
