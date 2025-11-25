import React from 'react';

function ExamTimeTable() {
    return (
        <div>
            {/* Introduction */}
            <div className="prose max-w-none mb-8">
                <p className="text-lg font-bold mb-4">Select the Exam You Would Like to Take</p>
                <p className="text-gray-700">
                    The 2026 AP Exams will be administered at Amberson High School over two weeks in May:
                    <span className="font-semibold"> May 4–8</span> and <span className="font-semibold">May 11–15</span> according to the schedule below.
                </p>
            </div>
            {/* Schedule Tables */}
            <div className="space-y-8 mb-8">
                    {/* Week 1 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-primary">Week 1</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Morning (8:20 a.m.)</th>
                                    <th>Afternoon (12:20 p.m.)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="font-semibold">Monday, May 4</td>
                                    <td>Biology<br/>Latin</td>
                                    <td>European History<br/>Microeconomics</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Tuesday, May 5</td>
                                    <td>Chemistry<br/>Human Geography</td>
                                    <td>United States Government and Politics</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Wednesday, May 6</td>
                                    <td>English Literature and Composition<br/>Comparative Government and Politics</td>
                                    <td>Physics 1: Algebra-Based</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Thursday, May 7</td>
                                    <td>Physics 2: Algebra-Based<br/>World History: Modern</td>
                                    <td>African American Studies<br/>Statistics</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Friday, May 8</td>
                                    <td>Italian Language and Culture<br/>United States History</td>
                                    <td>Chinese Language and Culture<br/>Macroeconomics</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="alert alert-warning mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <span><strong>Art and Design:</strong> Friday, May 8, 2026 (8 p.m. ET) is the deadline to submit portfolio components.</span>
                        </div>
                    </div>

                    {/* Week 2 */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-primary">Week 2</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Morning (8:20 a.m.)</th>
                                    <th>Afternoon (12:20 p.m.)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="font-semibold">Monday, May 11</td>
                                    <td>Calculus AB<br/>Calculus BC</td>
                                    <td>Music Theory<br/>Seminar</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Tuesday, May 12</td>
                                    <td>French Language and Culture<br/>Precalculus</td>
                                    <td>Japanese Language and Culture<br/>Psychology</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Wednesday, May 13</td>
                                    <td>English Language and Composition<br/>German Language and Culture</td>
                                    <td>Physics C: Mechanics<br/>Spanish Literature and Culture</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Thursday, May 14</td>
                                    <td>Art History<br/>Spanish Language and Culture</td>
                                    <td>Computer Science Principles<br/>Physics C: Electricity and Magnetism</td>
                                </tr>
                                <tr>
                                    <td className="font-semibold">Friday, May 15</td>
                                    <td>Environmental Science</td>
                                    <td>Computer Science A</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
)
}
export default ExamTimeTable;