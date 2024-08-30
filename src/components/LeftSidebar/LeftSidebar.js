import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { getMatchList } from '../../appRedux/actions/User';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AiFillCaretDown } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const { Option } = Select;

const parseMatchDate = (dateString) => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');
  const isPM = timePart.includes('PM');

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
  let adminMatchList = JSON.parse(localStorage.getItem('matchList'));

  useEffect(() => {
    let matchListData = adminMatchList ? adminMatchList : matchList;

    const filteredAndSortedData = matchListData?.map((item, index) => ({
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
    })).sort((a, b) => parseMatchDate(a.matchDate) - parseMatchDate(b.matchDate));

    setMatchData(filteredAndSortedData);
  }, [matchList]);

  const handleChange = (value) => {
    const selectedMatch = matchData.find(match => match.key === value);
    if (selectedMatch) {
      history.push(`/main/match-deatils/${selectedMatch.marketId}/${selectedMatch.eventId}`);
    }
  };

  return (
    <div
    style={{
  backgroundColor:"white",
      borderTop:"10px solid black",
      borderTopLeftRadius: "1rem", 
      borderTopRightRadius: "1rem", 
    }}
  >
    <div  onClick={() => {
     
                  setClickedOutside(!clickedOutside);
                }}>
    <div className="flex items-center justify-between space-x-2 py-1 px-3 rounded cursor-pointer">
                  <span className="flex items-center">
                    <img src="/images/cricket.png" className="w-4 h-4" alt="" />
                    <span className="select-none text-base pl-1">Cricket</span>
                    <AiFillCaretDown size={12} />
                  </span>
                  <span className="border bg-black">
                    {clickedOutside ? (
                      <FiChevronUp size={16} className="text-white" />
                    ) : (
                      <FiChevronDown size={16} className="text-white" />
                    )}
                  </span>
                </div>
    </div>

    <div>
    {matchData && matchData.length > 0 ? matchData.map((element) => (
        <div className='gx-py-1 gx-fs-sm'  onClick={() => history.push( `/main/match-deatils/${element.marketId}/${ element.eventId }`)} key={element.key} value={element.key}>
          {element.matchName ? element.matchName : "--"}
        </div>
      )) : null}
    </div>
   </div>
  );
}

export default LeftSidebar;
