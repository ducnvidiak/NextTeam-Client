import styles from "./style.module.scss";

const categories = [
  {
    icon: "fa-solid fa-book-open-reader",
    category: "Học thuật",
  },
  {
    icon: "fa-solid fa-volleyball",
    category: "Thể thao",
  },
  {
    icon: "fa-solid fa-icons",
    category: "Tài năng",
  },
  {
    icon: "fa-solid fa-group-arrows-rotate",
    category: "Cộng đồng",
  },
];

function Category() {
  return (
    <>
      <section className={styles["category"]}>
        <div className="container">
          <h3>MUÔN VÀN CÂU LẠC BỘ</h3>
          <ul>
            {categories.map((item, index) => (
              <li key={index}>
                <i className={item.icon}></i>
                <p>{item.category}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Category;
