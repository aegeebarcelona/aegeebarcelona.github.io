const imgstyle = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  borderRadius: "25px",
};


const HomepageTab = ({ homepage_tab: { title, description } }) => {
  return (
    <div className="tab gx-5 row items-center">
      <div className="lg:col-7 lg:order-2">
        <div className="tab-content">
          <img className="w-fit lg:w-11/12 object-contain mx-auto my-4" src={"/images/europe_crop.png"} style={imgstyle}/>
        </div>
      </div>
      <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
        <div className="text-container">
          <h2 className="lg:text-4xl">{title}</h2>
          <p className="mt-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HomepageTab
