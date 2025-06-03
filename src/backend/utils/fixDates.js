import moment from "moment";
import sql from "../postgres.js";

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
