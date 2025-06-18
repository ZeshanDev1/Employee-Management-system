import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      const res = await fetch("http://54.87.76.62:5000/record");
      if (!res.ok) {
        window.alert("Error fetching records");
        return;
      }
      const data = await res.json();
      setRecords(data);
    }

    fetchRecords();
  }, []);

  function recordRow(record) {
    return (
      <tr key={record._id}>
        <td>{record.name}</td>
        <td>{record.position}</td>
        <td>{record.level}</td>
        <td>
          <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
          <Link className="btn btn-link" to={`/delete/${record._id}`}>Delete</Link>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h3>Employee Record List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{records.map(recordRow)}</tbody>
      </table>
    </div>
  );
}
