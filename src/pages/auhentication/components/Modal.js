import React from 'react';
import './Modal.css';

export const Modal = ({show, close}) =>{
    const username = "Kullanıcı Adı: admin@novumare";
    const passord = "Şifre: admin ";
    
    return (
        <div className="modal-wrapper"
        style={{
            transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        }}
        ><div className="modal-header"><p>
                    {username}
                </p><p>
                    {passord}
                </p><span onClick= {close}className="close-modal-btn">x</span></div>
                 </div>
    )
};

// https://github.com/candraKriswinarto/modal-with-react