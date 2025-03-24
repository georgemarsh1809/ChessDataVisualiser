// Dates can be like this
// Wed Nov 06 2019
// or this
// 2018.08.14
// or this
// 1901.??.??
// They are all valid date formats, but different
// Lazily use Moment to format them and create data for the year column
// bit slow but it's a one time thing

import moment from "moment";
import sql from "../postgres.js";

// Get dates with sql query
// date column string into moment

const fixDates = async () => {
  const dates = await sql`SELECT date FROM game_data`;
  for (let i = 0; i < dates.length; i++) {
    // log percent
    console.log(
      `${Math.round((i / dates.length) * 100)}% complete - ${i}/${dates.length}`
    );
    const date = dates[i].date;

    if (date) {
      const dateMoment = moment(date);

      if (dateMoment.isValid()) {
        await sql`UPDATE game_data SET year = ${dateMoment.format(
          "YYYY"
        )} WHERE date = ${date}`;
      } else {
        console.log("INVALID DATE", date);
      }
    }
  }
  console.log("Dates updated");
  sql.end();
};

await fixDates();
