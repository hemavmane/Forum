import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./SuccessModal.css";

const SuccessModal = ({ show, message, type, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-box ${type}`}>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessModal;