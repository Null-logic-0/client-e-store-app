import Header from "@/components/Header";

function layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
}

export default layout;
