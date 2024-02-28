import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export default function Slip({ setShowGenarateSlip, report, notes }) {
    const eleRef = useRef(null)
    const date = new Date(report.createdAt);

    const downloadImg = () => {
        htmlToImage.toPng(eleRef.current, { quality: 1.0, width: 355, height: 650 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${report.owner.aadhar}.png`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    const downloadPdf = () => {
        htmlToImage.toPng(eleRef.current, { quality: 1.0, width: 355, height: 650 })
            .then(function (dataUrl) {
                var pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
                pdf.save("download.pdf");
            });
    }

    return (
        <>
        <button className='fixed top-20 right-5 bg-gray-300 hover:bg-gray-400 z-30 px-4 py-2 rounded-lg'
         onClick={()=>setShowGenarateSlip(false)}
        >close</button>
        <div className='half_transparent_container grid place-content-center'>
            <div className='bg-white rounded-lg'>
                <div className='bg-white p-6 rounded-lg w-[350px]' ref={eleRef}>
                    <h1 className='text-3xl font-bold text-center'>
                        M Enterprise
                    </h1>
                    <p className='text-xl font-bold text-center my-3 ' >
                        CSC--- {report.from}
                    </p>
                    <p><strong className='mr-2'>Name :</strong> <input className="border-none outline-none" type="text" 
                    defaultValue={report.owner.name} /></p>

                    <p><strong className='mr-2'>Aadhar :</strong> <input className="border-none outline-none"  type="text" 
                    defaultValue={report.owner.aadhar} /></p>

                    <p><strong className='mr-2'>Phone :</strong> <input className="border-none outline-none"  type="text" 
                    defaultValue={report.owner.phone} /></p>


                    <p><strong className='mr-2'>Date :</strong> {date.toLocaleString()}</p>

                    <p><input type="text" className="border-none outline-none font-bold" defaultValue={`Withdrall Rs. : ${report.amount}`} /></p>

                    <p><strong className='mr-2'>Txn Ref No. :</strong> <input className="border-none outline-none w-40"  type="text" 
                    defaultValue="OK" /></p>

                    <p><input type="text" className="border-none outline-none font-bold" defaultValue={`Balance Rs. : `} /></p>
                    
                    <hr />
                    <h2 className='text-center font-bold text-lg'>Notes</h2>
                    {!isNaN(notes.fiveh) && notes.fiveh !=0 && <p><strong className='mr-2'>500 :</strong>  
                    {String(notes.fiveh).replace("-","")}</p>}

                    {!isNaN(notes.twoh) && notes.twoh !=0 && <p><strong className='mr-2'>200 :</strong> 
                    {String(notes.twoh).replace("-","")}</p>}

                    {!isNaN(notes.oneh) && notes.oneh !=0 && <p><strong className='mr-2'>100 :</strong> 
                    {String(notes.oneh).replace("-","")}</p>}

                    {!isNaN(notes.fifty) && notes.fifty !=0 && <p><strong className='mr-2'>50 :</strong> 
                    {String(notes.fifty).replace("-","")}</p>}

                    {!isNaN(notes.twenty) && notes.twenty !=0 && <p><strong className='mr-2'>20 :</strong> 
                    {String(notes.twenty).replace("-","")}</p>}

                    {!isNaN(notes.ten) && notes.ten !=0 && <p><strong className='mr-2'>10 :</strong> 
                    {String(notes.ten).replace("-","")}</p>}

                    {!isNaN(notes.others) && notes.others !=0 && <p><strong className='mr-2'>others :</strong> 
                    {String(notes.others).replace("-","")}</p>}
                    <br />
                    <p className='text-center font-bold'>VLE Name- Palash Panja</p>
                    <p className='text-center'>Address- Sajinagachi, Sajinagachi, Kolaghat, Purba medinipur, 721154</p>
                    <p className='text-center font-bold'>Thank You</p>
                    <p className=' text-right font-semibold'>Visit Again</p>
                </div>
                <button onClick={downloadImg}
                className='bg-green-600 hover:bg-green-500 py-2 px-3 rounded-lg m-2 text-white font-semibold'>
                    Download Img
                </button>
                <button onClick={downloadPdf}
                className='bg-green-600 hover:bg-green-500 py-2 px-3 rounded-lg m-2 text-white font-semibold float-right'>
                    Download PDF
                </button>
            </div>
        </div>
        </>
    )
}
