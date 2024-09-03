import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { getMatchList } from "../../appRedux/actions/User";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiFillCaretDown } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from  "./LeftSidebar.module.css"

const { Option } = Select;

const parseMatchDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  const isPM = timePart.includes("PM");

  let hour = parseInt(hours, 10);
  if (isPM && hour !== 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minutes);
};

function LeftSidebar({ matchListData }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchList());
  }, [dispatch]);

  const { matchList } = useSelector((state) => state.UserReducer);
  const [matchData, setMatchData] = useState([]);
  const [clickedOutside, setClickedOutside] = useState(false);

  const history = useHistory();
  let adminMatchList = JSON.parse(localStorage.getItem("matchList"));

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;

    const filteredAndSortedData = matchListData
      ?.map((item, index) => ({
        key: item._id,
        sn: index + 1,
        name: item.matchName,
        matchDate: item.matchDate,
        seriesName: item.seriesName,
        inplay: item.status,
        matchName: item.matchName,
        marketId: item.marketId,
        eventId: item.eventId,
        cacheUrl: item.cacheUrl,
      }))
      .sort(
        (a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate)
      );

    setMatchData(filteredAndSortedData);
  }, [matchList]);

  const handleChange = (value) => {
    const selectedMatch = matchData.find((match) => match.key === value);
    if (selectedMatch) {
      history.push(
        `/main/match-deatils/${selectedMatch.marketId}/${selectedMatch.eventId}`
      );
    }
  };

  return (
    <div style={{background:"white"}} className={`${styles.container} `}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div
            onClick={() => {
              // handleClickInside();
              setClickedOutside(!clickedOutside);
              // Add this log to check the state change
              console.log("Dropdown state:", !clickedOutside);
            }}
            className={styles["menu-trigger"]}
          >
            <span>
              <img src="/images/cricket.png" alt="" />
              <span className={styles["menu-trigger-text"]}>Cricket</span>
              <AiFillCaretDown size={12} />
            </span>
            <span className={styles["menu-icon"]}>
              {clickedOutside ? (
                <FiChevronUp size={16} className="text-white" />
              ) : (
                <FiChevronDown size={16} className="text-white" />
              )}
            </span>
          </div>

          <div
            className={`${styles["dropdown-menu"]} ${
              clickedOutside ? styles["dropdown-menu-open"] : ""
            } ${styles["dropdown-menu-lg"]}`}
          >
            <div className={styles.divider}>
              {matchData && matchData.length > 0
                ? matchData.map((element, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        history.push(
                          `/main/match-deatils/${element.marketId}/${element.eventId}`
                        )
                      }
                      className={styles["menu-item"]}
                    >
                      {element && element.matchName
                        ? element.matchName
                        : "--"}
                    </div>
                  ))
                : <div className={styles["menu-item"]}>No matches found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
