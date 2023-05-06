import moment from "moment";
import { forEach, get, reverse } from "lodash";

const sortDate = ({ data }) => {
  reverse(data);
  //place datetime object in all items
  forEach(data, function (item) {
    item["datetime"] = moment(item.updatedAt);
  });
  //re-sort data by time in ascending order using datetime object
  data.sort(function (a, b) {
    return a.datetime - b.datetime;
  });
  return;
};

export default sortDate;
