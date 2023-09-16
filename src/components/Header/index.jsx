import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./style.module.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header() {
  return (
    <>
      <header className={styles["header"]}>
        <div className="container">
          <div className={styles["header__content"]}>
            <a href="/">
              <img src={logo} alt="" />
            </a>
            <nav>
              <Link to={"/home"}>Giới thiệu</Link>
              <Link to={"/events"}>Sự kiện</Link>
              <Link to={"/clubs"}>Câu lạc bộ</Link>
            </nav>
            <div className={styles["header__left"]}>
              <Button variant="primary">ĐĂNG NHẬP</Button>
              <Button variant="outline-primary">ĐĂNG KÝ</Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
