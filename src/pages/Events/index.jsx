import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./style.module.scss";
import { useState } from "react";
import Timeline from "../../components/pages/events/Timeline";
import Subcription from "../../components/pages/events/Subscription";

const radios = [
  { name: "Dòng sự kiện", value: "1" },
  { name: "Đã đăng ký", value: "2" },
];

function Events() {
  const [radioValue, setRadioValue] = useState("1");
  return (
    <>
      <section className={styles["events"]}>
        <div className="container">
          <div className={styles["events__title"]}>
            <h3>SỰ KIỆN</h3>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-success"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          {radioValue === "1" ? (
            <Timeline></Timeline>
          ) : (
            <Subcription></Subcription>
          )}
        </div>
      </section>
    </>
  );
}

export default Events;
