const BarGraph = ({ data }) => {
  const sortedData = data.sort((a, b) => a.id - b.id);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {sortedData.map((d) => (
        <div
          key={d.id}
          style={{
            width: "45px",
            height: `${d.weight}px`,
            backgroundColor: "#0074D9",
            margin: "2px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "#FFFFFF" }}>{d.weight}</div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;
