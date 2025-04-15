import React from "react";
import './style.css';

const Confirm = () => {
    const [code, setCode] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h2>Xác nhận Email</h2>
                    <form
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="confirm"
                            placeholder="Nhập mã xác nhận"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                        >
                            Xác nhận
                        </button>

                        <div style={{display: "flex", justifyContent: "center"}}><span
                            style={{padding: "5px", fontWeight: "500",fontSize:"medium"}}>Chưa nhập được mã xác nhận</span><a
                            style={{marginTop: "5px"}} href="#">Gửi lại</a>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Confirm;