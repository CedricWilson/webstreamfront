export default function Navbar(props) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    props.setView(newValue);
  };
  return (
    <>
      <select value={props.view} onChange={handleChange}>
        <option value="grid">Grid View</option>
        <option value="long-grid">Long Grid View</option>
      </select>
    </>
  );
}
