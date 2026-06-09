import { useEffect, useState } from "react";
import { getCases } from "../services/caseService";
import { getEvidence, uploadEvidence } from "../services/evidenceService";
import { getReports } from "../services/reportService";
import { getFindings } from "../services/findingService";

export default function InvestigatorDashboard() {
  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [reports, setReports] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [caseId, setCaseId] = useState("");
  const [evidenceType, setEvidenceType] = useState("Image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [selectedFindings, setSelectedFindings] = useState([]);
  const [showFindings, setShowFindings] = useState(false);
//   const [studentReports] = useState([
//   {
//     id: 1,
//     student: "Ravi",
//     student_id: "STU-2026-002",
//     issue: "Phishing Link",
//     status: "New"
//   },
//   {
//     id: 2,
//     student: "CCC",
//     student_id: "STU-2026-003",
//     issue: "OTP Fraud",
//     status: "Pending"
//   },
//   {
//     id: 3,
//     student: "Test Student",
//     student_id: "STU-2026-001",
//     issue: "Fake Website",
//     status: "Resolved"
//   }
// ]);
const [studentReports, setStudentReports] =
useState([]);


const [activityFeed] = useState([
  "Student reported suspicious URL",
  "Evidence uploaded",
  "Investigator reviewed complaint",
  "Case assigned"
]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const caseData = await getCases();
      const evidenceData = await getEvidence();
      const reportData = await getReports();

      setCases(caseData);
      setEvidence(evidenceData);
      setReports(reportData);

      if (!caseId && caseData.length > 0) {
        setCaseId(caseData[0].case_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewFindings = async (id) => {
    try {
      const data = await getFindings(id);
      setSelectedFindings(data);
      setShowFindings(true);
    } catch (error) {
      console.log(error);
      setSelectedFindings([]);
      setShowFindings(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("case_id", caseId);
      formData.append("evidence_type", evidenceType);
      formData.append("file", selectedFile);

      const result = await uploadEvidence(formData);
      setUploadMessage(`Uploaded successfully. Report: ${result.report}`);

      setSelectedFile(null);
      await loadData();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.detail || "Upload failed");
    }
  };

  const filteredEvidence = evidence.filter((item) =>
    item.evidence_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showFindings && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111827] p-8 rounded-xl w-[900px] max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-400">AI Findings</h2>
              <button
                onClick={() => setShowFindings(false)}
                className="text-red-500"
              >
                X
              </button>
            </div>

            <table className="w-full mt-6">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left">Type</th>
                  <th className="text-left">Risk</th>
                  <th className="text-left">Finding</th>
                </tr>
              </thead>

              <tbody>
                {selectedFindings.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-gray-400">
                      No Findings Available
                    </td>
                  </tr>
                ) : (
                  selectedFindings.map((finding) => (
                    <tr key={finding.id} className="border-b border-gray-800">
                      <td className="py-3">{finding.finding_type}</td>
                      <td>{finding.risk_level}</td>
                      <td>{finding.findings_text}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#0A0F1F] text-white p-8">
        <h1 className="text-4xl font-bold text-cyan-400">
          Investigator Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Digital Investigation Workspace
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-[#111827] p-6 rounded-xl">
            <h3>Total Cases</h3>
            <p className="text-3xl mt-3">{cases.length}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl">
            <h3>Total Evidence</h3>
            <p className="text-3xl mt-3">{evidence.length}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl">
            <h3>Reports Generated</h3>
            <p className="text-3xl mt-3">{reports.length}</p>
          </div>
        </div>


        <div className="grid grid-cols-4 gap-4 mt-6">

  <div className="bg-red-900/20 border border-red-500 p-4 rounded-xl">
    <h3 className="text-red-400">New Reports</h3>
    <p className="text-3xl font-bold">
      {studentReports.filter(
        x => x.status === "New"
      ).length}
    </p>
  </div>

  <div className="bg-yellow-900/20 border border-yellow-500 p-4 rounded-xl">
    <h3 className="text-yellow-400">Pending</h3>
    <p className="text-3xl font-bold">
      {studentReports.filter(
        x => x.status === "Pending"
      ).length}
    </p>
  </div>

  <div className="bg-cyan-900/20 border border-cyan-500 p-4 rounded-xl">
    <h3 className="text-cyan-400">Evidence Review</h3>
    <p className="text-3xl font-bold">
      2
    </p>
  </div>

  <div className="bg-green-900/20 border border-green-500 p-4 rounded-xl">
    <h3 className="text-green-400">Resolved</h3>
    <p className="text-3xl font-bold">
      {studentReports.filter(
        x => x.status === "Resolved"
      ).length}
    </p>
  </div>

</div>

        <div className="bg-[#111827] p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Upload Evidence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="p-3 rounded bg-[#0A0F1F] border border-gray-700"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.case_id}>
                  {c.case_id} - {c.case_title}
                </option>
              ))}
            </select>

            <select
              value={evidenceType}
              onChange={(e) => setEvidenceType(e.target.value)}
              className="p-3 rounded bg-[#0A0F1F] border border-gray-700"
            >
              <option>Image</option>
              <option>Document</option>
              <option>Mobile</option>
              <option>Video</option>
              <option>Other</option>
            </select>

            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="p-3 rounded bg-[#0A0F1F] border border-gray-700"
            />

            <button
              onClick={handleUpload}
              className="bg-cyan-500 px-6 py-3 rounded font-bold"
            >
              Upload Evidence
            </button>
          </div>

          {uploadMessage && (
            <p className="mt-4 text-green-400">{uploadMessage}</p>
          )}
        </div>

          <div className="bg-[#111827] p-6 rounded-xl mt-8">

  <h2 className="text-xl font-bold text-cyan-400 mb-4">
    Student Reports Center
  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b border-gray-700">

        <th className="text-left py-3">
          Student
        </th>

        <th className="text-left py-3">
          Student ID
        </th>

        <th className="text-left py-3">
          Issue
        </th>

        <th className="text-left py-3">
          Status
        </th>

        <th className="text-left py-3">
          Actions
        </th>

      </tr>

    </thead>

    <tbody>

      {studentReports.map(report => (

        <tr
          key={report.id}
          className="border-b border-gray-800"
        >

          <td className="py-3">
            {report.student}
          </td>

          <td>
            {report.student_id}
          </td>

          <td>
            {report.issue}
          </td>

          <td>
            {report.status}
          </td>

          <td>

            <button
              className="bg-cyan-600 px-3 py-1 rounded mr-2"
            >
              Open
            </button>

            <button
              className="bg-yellow-600 px-3 py-1 rounded mr-2"
            >
              Assign
            </button>

            <button
              className="bg-green-600 px-3 py-1 rounded"
            >
              Resolve
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

        <div className="bg-[#111827] p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Assigned Cases
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">Case ID</th>
                <th className="text-left py-3">Title</th>
                <th className="text-left py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-gray-800">
                  <td className="py-3">{c.case_id}</td>
                  <td>{c.case_title}</td>
                  <td>{c.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl mt-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Evidence Repository
          </h2>

          <input
            type="text"
            placeholder="Search Evidence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 mb-4 rounded bg-[#0A0F1F] border border-cyan-700"
          />

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Evidence Name</th>
                <th className="text-left py-3">Evidence Type</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
{/* <div className="bg-[#111827] p-6 rounded-xl mt-8">

  <h2 className="text-xl font-bold text-cyan-400 mb-4">
    Investigation Activity Feed
  </h2>

  <div className="space-y-4">

    {activityFeed.map((item,index) => (

      <div
        key={index}
        className="
        border-l-4
        border-cyan-500
        pl-4
        py-2
        "
      >

        <p className="text-gray-300">
          {item}
        </p>

      </div>

    ))}

  </div>

</div> */}
            <tbody>
              {filteredEvidence.map((item) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-3">{item.id}</td>
                  <td>{item.evidence_name}</td>
                  <td>{item.evidence_type}</td>
                  <td>
                    <button
                      onClick={() => viewFindings(item.id)}
                      className="bg-cyan-600 px-3 py-1 rounded mr-2"
                    >
                      Findings
                    </button>

                    <a
                      href={`http://127.0.0.1:8000/reports/download/${item.id}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-purple-600 px-3 py-1 rounded"
                    >
                      Report
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}