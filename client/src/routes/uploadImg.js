import React from 'react';

const UploadImg = ({ handleUpload, id, imgSrc }) => {

    function updateImg (event) {
        document.getElementById(id).src = URL.createObjectURL(event.target.files[0]);

    }

    return (
        <div>
            <input type="file" id={"file" + id} onChange={function (event) {
                handleUpload(event, id);
                updateImg(event);

            }} accept="image/*" />
            <img id={id} src={imgSrc} alt="" />
        </div>
    );
};

export default UploadImg;