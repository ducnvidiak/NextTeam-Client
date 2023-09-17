// import Hero from "../../components/pages/home/Hero";
// import Category from "../../components/pages/home/Category";
import Hero from "src/components/pages/home/Hero";
import styles from "./style.module.scss";
import Categories from "src/components/pages/home/Categories";

function Home() {
  return (
    <>
      <section className={styles["hero"]}>
        <Hero></Hero>
        <Categories></Categories>
      </section>
    </>
  );
}

export default Home;
