import Hero from "../../components/pages/home/Hero";
import Category from "../../components/pages/home/Category";
import styles from "./style.module.scss";
import axios from "axios";

function Home() {
  const getAPI = async () => {
    try {
      console.log("loading...");
      const res = await axios.get("http://localhost:8080/javaweb_api_testing/EmployeeServlet")
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  getAPI();
  return (
    <>
      <section className={styles["hero"]}>
        <Hero></Hero>
        <Category></Category>
      </section>
    </>
  );
}

export default Home;
