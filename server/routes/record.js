// record.js
import { Link } from "react-router-dom";

// A reusable row component for each employee record
export default function Record({ record, deleteRecord }) {
  return (
    <tr>
      <td>{record.name}</td>
      <td>{record.position}</td>
      <td>{record.level}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
        <button
          className="btn btn-link text-danger"
          onClick={() => deleteRecord(record._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
