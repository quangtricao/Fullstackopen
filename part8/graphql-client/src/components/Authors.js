import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [author, setAuthor] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const response = useQuery(ALL_AUTHORS);

  if (!props.show || response.loading) {
    return null;
  }

  const authors = response.data.allAuthors;
  const authorsOption = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        author: author.value,
        born: parseInt(born),
      },
    });

    setAuthor("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <h2> Set birthyear</h2>
      <Select defaultValue={author} onChange={setAuthor} options={authorsOption} />
      <br />
      <form onSubmit={submit}>
        <div>
          born <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
