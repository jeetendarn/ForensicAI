import { useEffect, useState } from "react";
import { getCases } from "../services/caseService";
import { getEvidence } from "../services/evidenceService";
import { getFindings } from "../services/findingService";

export default function InvestigatorDashboard() {

  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
const [selectedFindings, setSelectedFindings] = useState([]);

const [showFindings, setShowFindings] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const caseData = await getCases();

      const evidenceData = await getEvidence();

      setCases(caseData);

      setEvidence(evidenceData);

    }

    catch(error){

      console.log(error);

    }

  };
const filteredEvidence = evidence.filter(
  item =>
    item.evidence_name
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
);
  const viewFindings = async(id) => {

  try {

    const data =
    await getFindings(id);

    setSelectedFindings(data);

    setShowFindings(true);

  }

  catch(error){

    console.log(error);

    alert(
      "No Findings Available"
    );

  }

};

  return (
      <>
   {showFindings && (

<div
 className="
 fixed
 inset-0
 bg-black/70
 flex
 items-center
 justify-center
 z-50
 "
>

<div
 className="
 bg-[#111827]
 p-8
 rounded-xl
 w-[900px]
 max-h-[80vh]
 overflow-auto
 "
>

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

<thead>

<tr className="border-b border-gray-700">

<th className="text-left">Type</th>

<th className="text-left">Risk</th>

<th className="text-left">Finding</th>

</tr>

</thead>

<tbody>

{selectedFindings.map((finding) => (

<tr
 key={finding.id}
 className="border-b border-gray-800"
>

<td className="py-3">
{finding.finding_type}
</td>

<td>
{finding.risk_level}
</td>

<td>
{finding.findings_text}
</td>

</tr>

))}

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

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-[#111827] p-6 rounded-xl">

          <h3>Total Cases</h3>

          <p className="text-3xl mt-3">

            {cases.length}

          </p>

        </div>

        <div className="bg-[#111827] p-6 rounded-xl">

          <h3>Total Evidence</h3>

          <p className="text-3xl mt-3">

            {evidence.length}

          </p>

        </div>

        <div className="bg-[#111827] p-6 rounded-xl">

          <h3>Reports Generated</h3>

          <p className="text-3xl mt-3">

            0

          </p>

        </div>

      </div>

      {/* Assigned Cases */}

      <div className="bg-[#111827] p-6 rounded-xl mt-8">

        <h2 className="text-xl font-bold text-cyan-400 mb-4">

          Assigned Cases

        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left py-3">

                Case ID

              </th>

              <th className="text-left py-3">

                Title

              </th>

              <th className="text-left py-3">

                Priority

              </th>

            </tr>

          </thead>

          <tbody>

            {cases.map((c) => (

              <tr
                key={c.id}
                className="border-b border-gray-800"
              >

                <td className="py-3">

                  {c.case_id}

                </td>

                <td>

                  {c.case_title}

                </td>

                <td>

                  {c.priority}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Evidence Repository */}

      <div className="bg-[#111827] p-6 rounded-xl mt-8">

        <h2 className="text-xl font-bold text-cyan-400 mb-4">

          Evidence Repository

        </h2>
<input
 type="text"
 placeholder="Search Evidence..."
 value={searchTerm}
 onChange={(e) =>
  setSearchTerm(e.target.value)
 }
 className="
 w-full
 p-3
 mb-4
 rounded
 bg-[#0A0F1F]
 border
 border-cyan-700
 "
/>
        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left py-3">

                ID

              </th>

              <th className="text-left py-3">

                Evidence Name

              </th>

              <th className="text-left py-3">

                Evidence Type

              </th>

              <th className="text-left py-3">
                Actions
                </th>

            </tr>

          </thead>

          <tbody>

         {filteredEvidence.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-800"
              >

                <td className="py-3">

                  {item.id}

                </td>

                <td>

                  {item.evidence_name}

                </td>

                <td>

                  {item.evidence_type}

                </td>

                <td>


<button
 onClick={() =>
  viewFindings(item.id)
 }
 className="
 bg-cyan-600
 px-3
 py-1
 rounded
 mr-2
 "
>
 Findings
</button>

<button
 className="
 bg-green-600
 px-3
 py-1
 rounded
 mr-2
 "
>

 Timeline

</button>

<a
 href={
  `http://127.0.0.1:8000/reports/download/${item.id}.pdf`
 }
 target="_blank"
 rel="noreferrer"
 className="
 bg-purple-600
 px-3
 py-1
 rounded
 "
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