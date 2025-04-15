import React from "react";

const Symptom = ({ symptom, isSelected }) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
                backgroundColor: isSelected ? "rgb(173, 216, 230)" : "rgb(239, 245, 255)",
                cursor: "pointer",
            }}
        >
            <h3>{symptom.name}</h3>
            {isSelected && <p>{symptom.description}</p>} {/* Hiển thị mô tả nếu triệu chứng được chọn */}        </div>
    );
};

export default Symptom;