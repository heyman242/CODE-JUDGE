import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewSubmission = () => {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/${userId}`);
        const { submissions } = response.data;
        setSubmissions(submissions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, [userId]);

  return (
    <div>
      <h1>View Submissions</h1>
      {submissions.map((submission) => (
        <div key={submission._id}>
          <h3>Problem Name: {submission.problemId.problemName}</h3>
          <p>Language: {submission.language}</p>
          <p>Code: {submission.code}</p>
          <p>Submitted At: {submission.submittedAt}</p>
          <p>Status: {submission.status}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ViewSubmission;
