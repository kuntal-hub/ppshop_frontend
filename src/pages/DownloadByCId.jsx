import React, { useRef, useState, useEffect } from 'react'
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import MainContainer from '../components/MainContainer';
import { entryService } from '../apiServices/entryService';
import { useDispatch } from 'react-redux';
import { setNotification } from '../store/notificaionSlice';
import { useParams,useNavigate } from 'react-router-dom';

export default function DownloadByCId() {
    const eleRef = useRef(null)
    const { cId } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newCId, setNewCId] = useState(cId);

    const downloadImg = () => {
        htmlToImage.toPng(eleRef.current, { quality: 1.0, width: 1440, height: 900 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `report_${cId}.png`;
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }

    // const downloadPdf = () => {
    //     htmlToImage.toPng(eleRef.current, { quality: 1.0, width: 1400, height: 860 })
    //         .then(function (dataUrl) {
    //             var pdf = new jsPDF('l', 'mm', 'a4'); // 'l' for landscape
    //             var imgWidth = pdf.internal.pageSize.getWidth(); // Get PDF width
    //             var imgHeight = pdf.internal.pageSize.getHeight(); // Get PDF height
    //             pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight); // Fit image to PDF
    //             pdf.save(`report_${date}.pdf`);
    //         });
    // }

    const downloadPdf = () => {
        htmlToImage.toPng(eleRef.current, { quality: 1.0, width: 1440, height: 900 })
            .then(function (dataUrl) {
                var pdf = new jsPDF('l', 'mm', 'a4');
                pdf.addImage(dataUrl, 'PNG', 0, 0, 297, 210);
                pdf.save(`report_${cId}.pdf`);
            });
    }

    const getReports = async (page) => {
        setLoading(true);
        const response = await entryService.getAllEntriesByOwnerId({ cId, page, limit: 24 });
        if (response.status < 400 && response.data) {
            setReports(response.data);
            setPage(page);
            setLoading(false);
        } else {
            dispatch(setNotification({ text: response.message, type: "error" }))
            setReports([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        getReports(1);
    }, [cId])

    return (
        <MainContainer>
            <div className='flex flex-nowrap justify-between py-1 px-3'>
                <div>
                    <label className='text-black bg-white py-[10px] mr-[1px] rounded-l-lg px-4 font-semibold'
                        htmlFor="customer_id">
                        Customer Id :
                    </label>
                    <input className='bg-white text-black py-2 px-4 font-semibold rounded-r-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
                        type="text" id='customer_id' value={newCId} onChange={(e)=>setNewCId(e.target.value)} />
                    <button onClick={() => navigate(`/download/${newCId}`)}
                        className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg ml-2'
                    >
                        Search
                    </button>
                </div>
                <div>
                    <button onClick={downloadImg} disabled={loading || reports.length === 0}
                        className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mr-3'
                    >
                        Download Img
                    </button>

                    <button onClick={downloadPdf} disabled={loading || reports.length === 0}
                        className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg'
                    >
                        Download Pdf
                    </button>
                </div>
            </div>
            {loading ? <div className='text-center text-4xl font-bold pt-52'>
                Loding......
            </div> :
                <div>
                    <div className='w-[1440px] h-[900px] mx-auto p-5' ref={eleRef}>

                        <table className='w-[1400px]'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Aadhar</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Amount</th>
                                    <th>Pay From</th>
                                    <th>OB</th>
                                    <th>CB</th>
                                    <th>Remarks :</th>
                                    <th>Date</th>
                                    <th> </th>
                                    <th>500</th>
                                    <th>200</th>
                                    <th>100</th>
                                    <th>50</th>
                                    <th>20</th>
                                    <th>10</th>
                                    <th>Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, index) => (
                                    <tr key={index}>
                                        <td>{report.owner.name}</td>
                                        <td>{report.owner.cId}</td>
                                        <td>{`XXXX XXXX ${report.owner.aadhar.slice(-4)}`}</td>
                                        <td>{report.owner.phone}</td>
                                        <td>{report.owner.address.slice(0,15)}</td>
                                        <td>{report.amount}</td>
                                        <td>{report.from}</td>
                                        <td>{report.ob? report.ob : "null"}</td>
                                        <td>{report.from !== "cash" ? (report.ob ? report.ob + report.amount : "null")
                                        :report.report.length > 0 ? (report.ob ? report.ob + report.amount : "null") : "null"}</td>
                                        <td>{report.remarks.slice(0,16)}</td>
                                        <td>{new Date(report.createdAt).toLocaleString()}</td>
                                        <td>

                                        </td>
                                        {report.report.length > 0 ?
                                            <>
                                                <td>{report.report[0].fiveh}</td>
                                                <td>{report.report[0].twoh}</td>
                                                <td>{report.report[0].oneh}</td>
                                                <td>{report.report[0].fifty}</td>
                                                <td>{report.report[0].twenty}</td>
                                                <td>{report.report[0].ten}</td>
                                                <td>{report.report[0].others}</td>
                                            </>
                                            :
                                            <>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                                <td>{"null"}</td>
                                            </>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full flex flex-nowrap justify-between px-8 pb-12'>
                    <button onClick={() => getReports(page - 1)} disabled={page === 1}
                    className={`${page === 1 ? 'opacity-0' : 'opacity-100'} text-center font-semibold bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg`}
                    >
                        Previous
                    </button>
                    <button onClick={() => getReports(page + 1)} disabled={reports.length < 24}
                    className={`${reports.length < 24 ? 'opacity-0' : 'opacity-100'} text-center font-semibold bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg`}
                    >
                        Next
                    </button>
                    </div>
                </div>}
        </MainContainer>
    )
}
