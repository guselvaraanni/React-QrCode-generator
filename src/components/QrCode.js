import { useState } from "react";

export const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState();
    const [qrSize, setQrSize] = useState();

    async function generateQr() {
        setLoading(true);
        setImg("");
        try {
          const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
          const response = await fetch(url);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImg(imageUrl);
        } catch (error) {
          console.error("Error generating Qr code", error);
        } finally {
          setLoading(false);
        }
      }


    function downloadQr() {
        fetch(img)
            .then((respose => respose.blob()))// blob - filetype
            .then((blob) => {
                const link = document.createElement("a");//blob in anchor tag
                link.href = URL.createObjectURL(blob);//assigning blob data to the anchortag href, blob is a binary data, when blob is converted objecturl  it is changed to image
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }
    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please wait... </p>}
            {img && <img src={img} className="qr-code-image" alt="img" />}
            <div>
                <label htmlFor="dataInput" className="input-label">Data for Qr QrCode</label>
                <input type="text" value={qrData} id="dataInput" placeholder="Enter the data" onChange={(e) => setQrData(e.target.value)} />
                <label htmlFor="sizedata" className="input-label">Image Size(Eg : 250)</label>
                <input type="text" value={qrSize} id="sizedata" placeholder="Enter Size" onChange={(e) => setQrSize(e.target.value)} />
                <button className="generate-button" disabled={loading} onClick={generateQr}>Generate QrCode</button>
                <button className="download-button" onClick={downloadQr}>Downlaod QrCode</button>
            </div>
        </div>
    );
};
