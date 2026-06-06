
import { useEffect, useState } from "react";
import {
  getUsers,
  createUser
} from "../services/userService";

import {
  getCases,
  createCase
} from "../services/caseService";


import {
  getReports
} from "../services/reportService";

import {
  getEvidence
} from "../services/evidenceService";


import {
 getFindings
}
from "../services/findingService";

import {
 getTimeline
}
from "../services/timelineService";


export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [investigatorCount, setInvestigatorCount] = useState(0);
const [activePanel, setActivePanel] = useState("dashboard");

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("Investigator");
const [cases, setCases] = useState([]);
const [reports, setReports] = useState([]);

const [caseTitle, setCaseTitle] = useState("");

const [caseType, setCaseType] = useState("");

const [description, setDescription] = useState("");

const [assignedInvestigator, setAssignedInvestigator] = useState("");

const [priority, setPriority] = useState("High");

const [status, setStatus] = useState("Open");

const [evidence, setEvidence] = useState([]);

const [selectedFindings, setSelectedFindings] =
useState([]);

const [selectedTimeline, setSelectedTimeline] =
useState([]);

const [showFindings, setShowFindings] =
useState(false);

const [showTimeline, setShowTimeline] =
useState(false);
const viewFindings = async(id) => {

  console.log(
    "Loading Findings:",
    id
  );

  try {

    const data =
    await getFindings(id);

    console.log(
      "API Response:",
      data
    );

    setSelectedFindings(data);

    setShowFindings(true);

  }

  catch(error){

    console.log(
      "ERROR:",
      error
    );

  }

};
const viewTimeline = async(id) => {

  try {

    const data = await getTimeline(id);

    setSelectedTimeline(
      data.timeline
    );

    setShowTimeline(true);

  }

  catch(error){

    console.log(error);

  }

};

useEffect(() => {

  loadUsers();

  loadCases();

  loadReports();

  loadEvidence();

}, []);

 const loadUsers = async () => {

  try {

    const data = await getUsers();

    setUsers(data);

    setUserCount(data.length);

    const investigators = data.filter(
      (user) => user.role === "Investigator"
    );

    setInvestigatorCount(
      investigators.length
    );

  }

  catch (error) {

    console.log(error);

  }

};


const loadEvidence =
async () => {

  try {

    const data =
    await getEvidence();

    setEvidence(data);

  }

  catch(error){

    console.log(error);

  }

};

const loadCases = async () => {

  try {

    const data = await getCases();

    setCases(data);

  }

  catch(error){

    console.log(error);

  }

};
const loadReports = async () => {

  try {

    const data = await getReports();

    setReports(data);

  }

  catch(error){

    console.log(error);

  }

};
const handleCreateUser = async () => {

  try {

    const result = await createUser({

      name,
      email,
      password,
      role

    });

    alert(
      `User Created\n\nUser ID: ${result.user_id}`
    );

    setName("");
    setEmail("");
    setPassword("");

  
  }

  catch(error){

    console.log(error);

    alert("Failed To Create User");

  }

};
   

const handleCreateCase = async () => {

  try {

    const result = await createCase({

      case_title: caseTitle,

      case_type: caseType,

      description: description,

      investigator: assignedInvestigator,

      priority: priority,

      status: status

    });

    alert(
      `Case Created\n\n${result.case_id}`
    );

    setCaseTitle("");
    setCaseType("");
    setDescription("");

    loadCases();

  }

  catch(error){

    console.log(error);

    alert("Failed To Create Case");

  }

};


  return (

    <div className="min-h-screen bg-[#0A0F1F] text-white flex">

      {/* Sidebar */}

      <div className="w-64 bg-[#111827] p-6 border-r border-cyan-900">

        <h1 className="text-2xl font-bold text-cyan-400">
          ForensicAI
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Admin Console
        </p>

        <div className="mt-10 space-y-5">

         <div
  onClick={() => setActivePanel("dashboard")}
  className="hover:text-cyan-400 cursor-pointer"
>
  Dashboard
</div>

      <div
  onClick={() => setActivePanel("users")}
  className="hover:text-cyan-400 cursor-pointer"
>
  User Management
</div>

       <div
  onClick={() => setActivePanel("cases")}
  className="hover:text-cyan-400 cursor-pointer"
>
  Cases
</div>
         <div
  onClick={() => setActivePanel("evidence")}
  className="hover:text-cyan-400 cursor-pointer"
>
  Evidence
</div>

      <div
  onClick={() => setActivePanel("reports")}
  className="hover:text-cyan-400 cursor-pointer"
>
  Reports
</div>

          <div className="hover:text-red-400 cursor-pointer">
            Logout
          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8">


  {showTimeline && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-[#111827] p-8 rounded-xl w-[900px]">

      <div className="flex justify-between">

        <h2 className="text-2xl font-bold text-green-400">
          Investigation Timeline
        </h2>

        <button
          onClick={() => setShowTimeline(false)}
          className="text-red-500"
        >
          X
        </button>

      </div>

      <table className="w-full mt-6">

        <tbody>

          {selectedTimeline.map((item,index) => (

            <tr key={index}>

              <td>{item.event}</td>

              <td>{item.time}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
)}

{showFindings && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-[#111827] p-8 rounded-xl w-[900px]">

      <div className="flex justify-between">

        <h2 className="text-2xl font-bold text-cyan-400">
          AI Findings
        </h2>

        <button
          onClick={() => setShowFindings(false)}
          className="text-red-500"
        >
          X
        </button>

      </div>

      <table className="w-full mt-6">

        <tbody>

          {selectedFindings.map((finding) => (

            <tr key={finding.id}>

              <td>{finding.finding_type}</td>

              <td>{finding.risk_level}</td>

              <td>{finding.findings_text}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
)}


{
  activePanel === "users" && (

    <div>

      <h2 className="text-4xl font-bold text-cyan-400">

        User Management

      </h2>

      <p className="text-gray-400 mt-2">

        Manage Students, Investigators and Admins

      </p>

      <div className="bg-[#111827] p-6 rounded-xl mt-8">

        <h3 className="text-2xl font-bold text-cyan-400 mb-4">

          Create User

        </h3>

        <input
  value={name}
  onChange={(e)=>setName(e.target.value)}
  placeholder="Full Name"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

        <input
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  placeholder="Email Address"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

      <input
  type="password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  placeholder="Password"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

       <select
  value={role}
  onChange={(e)=>setRole(e.target.value)}
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        >

          <option>Investigator</option>

          <option>Student</option>

          {/* <option>Admin</option> */}

        </select>

      <button
  onClick={handleCreateUser}
  className="bg-cyan-500 px-6 py-3 rounded font-bold"
>
          Create User
        </button>

      </div>

    </div>

  )
}


{
  activePanel === "dashboard" && (
    <div>
        <h2 className="text-4xl font-bold text-cyan-400">
          Admin Dashboard
        </h2>

        <p className="text-gray-400 mt-2">
          Digital Forensics Investigation Control Center
        </p>

        {/* Statistics */}

        <div className="grid grid-cols-4 gap-6 mt-10">

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">

            <h3 className="text-gray-400">
              Total Users
            </h3>

            <p className="text-3xl font-bold mt-2">
              {userCount}
            </p>

          </div>

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">

            <h3 className="text-gray-400">
              Investigators
            </h3>

            <p className="text-3xl font-bold mt-2">
              {investigatorCount}
            </p>

          </div>

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">

            <h3 className="text-gray-400">
              Cases
            </h3>

            <p className="text-3xl font-bold mt-2">
              {cases.length}

            </p>

          </div>

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">

            <h3 className="text-gray-400">
              Evidence
            </h3>

            <p className="text-3xl font-bold mt-2">
              {evidence.length}
            </p>

          </div>

        </div>

        {/* Recent Activities */}

        <div className="bg-[#111827] rounded-xl p-6 mt-10">

          <h3 className="text-xl font-bold text-cyan-400">
            Recent Activities
          </h3>

          <p className="text-gray-500 mt-4">
            No recent activities available.
          </p>

        </div>
  
        {/* Users Table */}
    </div>

  )
}
{
  activePanel === "reports" && (

    <div>

      <h2 className="text-4xl font-bold text-cyan-400">

        Reports Center

      </h2>

      <p className="text-gray-400 mt-2">

        Generated Digital Forensics Reports

      </p>

      <div className="bg-[#111827] rounded-xl p-6 mt-8">

        <h3 className="text-xl font-bold text-cyan-400 mb-4">

          Available Reports

        </h3>

      <table className="w-full text-sm">
          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left py-3">
                Report Name
              </th>

              <th className="text-left py-3">
                Download
              </th>

            </tr>

          </thead>

          <tbody>

            {
              reports.map((report, index) => (

                <tr
                  key={index}
                  className="border-b border-gray-800"
                >

                  <td className="py-3">

                    {report.report_name}

                  </td>

                  <td>

                    <a
                      href={`http://127.0.0.1:8000/reports/download/${report.report_name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-cyan-500 px-4 py-2 rounded"
                    >

                      Download

                    </a>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  )
}


{
  activePanel === "evidence" && (

    <div>

      <h2 className="text-4xl font-bold text-cyan-400">

        Evidence Center

      </h2>

      <p className="text-gray-400 mt-2">

        Digital Evidence Repository

      </p>

      <div className="bg-[#111827] rounded-xl p-6 mt-8">

      <table className="w-full text-sm">
<thead>

<tr className="border-b border-cyan-900 text-cyan-400">

  <th className="text-left py-3 w-[80px]">
    ID
  </th>

  <th className="text-left py-3 w-[350px]">
    Evidence Name
  </th>

  <th className="text-left py-3 w-[200px]">
    Evidence Type
  </th>

  <th className="text-left py-3">
    Actions
  </th>

</tr>

</thead>

          <tbody>

            {
              evidence.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-gray-800"
                >

                 <td className="py-3">
  {item.id}
</td>
                  <td>{item.evidence_name}</td>

                  <td>{item.evidence_type}</td>

                  <td>

                    
<button
  onClick={() => {

    alert("Clicked");

    viewFindings(item.id);

  }}
  className="bg-cyan-600 px-3 py-1 rounded"
>
  Findings
</button>


        <button
 onClick={()=>
  viewTimeline(item.id)
 }
>
 Timeline
</button>
                <a
 href={
  `http://127.0.0.1:8000/reports/download/${item.id}.pdf`
 }
 target="_blank"
 rel="noreferrer"
 className="bg-purple-600 px-3 py-1 rounded"
>

 Report

</a>
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  )
}
{
  activePanel === "cases" && (

    <div>

      <h2 className="text-4xl font-bold text-cyan-400">

        Case Management

      </h2>

      <p className="text-gray-400 mt-2">

        Create and Assign Investigation Cases

      </p>

      <div className="bg-[#111827] p-6 rounded-xl mt-8">

        <h3 className="text-2xl font-bold text-cyan-400 mb-4">

          Create Case

        </h3>

        <input
          value={caseTitle}
          onChange={(e)=>setCaseTitle(e.target.value)}
          placeholder="Case Title"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

        <input
          value={caseType}
          onChange={(e)=>setCaseType(e.target.value)}
          placeholder="Case Type"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

        <textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        />

        <select
          value={assignedInvestigator}
          onChange={(e)=>setAssignedInvestigator(e.target.value)}
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        >

          <option value="">
            Select Investigator
          </option>

          {
            users
              .filter(
                user => user.role === "Investigator"
              )
              .map(user => (

                <option
                  key={user.id}
                  value={user.user_id}
                >
                  {user.user_id} - {user.name}
                </option>

              ))
          }

        </select>

        <select
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}
          className="w-full p-3 bg-[#0A0F1F] rounded mb-4"
        >

          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>

        </select>

        <button
          onClick={handleCreateCase}
          className="bg-cyan-500 px-6 py-3 rounded font-bold"
        >
          Create Case
        </button>

      </div>

      {/* Existing Cases */}

<div className="bg-[#111827] rounded-xl p-6 mt-8">

  <h3 className="text-xl font-bold text-cyan-400 mb-6">

    Existing Cases

  </h3>

  <div className="overflow-x-auto">

    <table className="w-full text-sm">

      <thead>

        <tr className="border-b border-cyan-900 text-cyan-400">

          <th className="text-left py-3 px-4">
            Case ID
          </th>

          <th className="text-left py-3 px-4">
            Title
          </th>

          <th className="text-left py-3 px-4">
            Type
          </th>

          <th className="text-left py-3 px-4">
            Investigator
          </th>

          <th className="text-left py-3 px-4">
            Priority
          </th>

          <th className="text-left py-3 px-4">
            Status
          </th>

        </tr>

      </thead>

      <tbody>

        {
          cases.map((c) => (

            <tr
              key={c.id}
              className="border-b border-gray-800 hover:bg-[#0A0F1F]"
            >

              <td className="py-3 px-4 font-semibold text-cyan-300">

                {c.case_id}

              </td>

              <td className="py-3 px-4">

                {c.case_title}

              </td>

              <td className="py-3 px-4">

                {c.case_type}

              </td>

              <td className="py-3 px-4">

                {c.investigator}

              </td>

              <td className="py-3 px-4">

                <span className="bg-yellow-600 px-3 py-1 rounded">

                  {c.priority || "N/A"}

                </span>

              </td>

              <td className="py-3 px-4">

                <span className="bg-green-700 px-3 py-1 rounded">

                  {c.status}

                </span>

              </td>

            </tr>

          ))
        }

      </tbody>

    </table>

  </div>

</div>
    </div>

  )
}
{

        <div className="bg-[#111827] rounded-xl p-6 mt-8">

          <h3 className="text-xl font-bold text-cyan-400 mb-4">
            Registered Users
          </h3>
  <table className="w-full text-sm">
            <thead>

              <tr className="text-left border-b border-gray-700">

                <th className="pb-2">User ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>

              </tr>

            </thead>

            <tbody>

              {
                users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b border-gray-800"
                  >

                    <td className="py-2">
                      {user.user_id}
                    </td>

                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.role}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>
   }
    </div>
            
    </div>
            
  );
}
