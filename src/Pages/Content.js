import React, { useState } from "react";
import ListSymptom from "../Symptom/ListSymptom";
import ListDoctor from "../Doctor/ListDoctor";

const Content = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const containerStyle = {
        display: 'flex',
        maxWidth: '80%',
        margin: '0 auto',
        gap: '20px',
    };

    const leftColumnStyle = {
        flex: '1',
        minWidth: '0',
    };

    const rightColumnStyle = {
        flex: '2',
        minWidth: '0',
    };

    return (
        <div style={containerStyle}>
            <div style={leftColumnStyle}>
                <ListSymptom onSelectDepartment={setSelectedDepartment} />
            </div>
            <div style={rightColumnStyle}>
                <ListDoctor selectedDepartment={selectedDepartment} />
            </div>
        </div>
    );
};

export default Content;
