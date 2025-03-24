import { HTPP_STATUS_CODES } from "./constants.js";

export const validateFilterParams = (req, res, next) => {
  const errors = [];

  console.log(
    "🚀 ~ validateFilterParams ~ req.query?.player:",
    typeof req.query?.player
  );
  if (req.query?.player && typeof req.query?.player !== "string") {
    errors.push("Invalid player");
  }
  if (
    req.query?.yearStart &&
    (isNaN(req.query?.yearStart) || Number(req.query?.yearStart) < 0)
  ) {
    errors.push("Invalid yearStart");
  }
  if (
    req.query?.yearEnd &&
    (isNaN(req.query?.yearEnd) || Number(req.query?.yearEnd) < 0)
  ) {
    errors.push("Invalid yearEnd");
  }
  if (req.query?.color && !["White", "Black"].includes(req.query?.color)) {
    errors.push("Invalid color");
  }

  if (req.query?.opponent && typeof req.query?.opponent !== "string") {
    errors.push("Invalid opponent");
  }

  if (
    req.query?.result &&
    !["Win", "Loss", "Draw"].includes(req.query?.result)
  ) {
    errors.push("Invalid result");
  }
  if (
    req.query?.moves &&
    (isNaN(req.query?.moves) || Number(req.query?.moves) < 0)
  ) {
    errors.push("Invalid moves");
  }
  if (
    req.query?.player_elo &&
    (isNaN(req.query?.player_elo) || Number(req.query?.player_elo) < 0)
  ) {
    errors.push("Invalid player_elo");
  }
  if (
    req.query?.opponent_elo &&
    (isNaN(req.query?.opponent_elo) || Number(req.query?.opponent_elo) < 0)
  ) {
    errors.push("Invalid opponent_elo");
  }
  if (req.query?.site && typeof req.query?.site !== "string") {
    errors.push("Invalid site");
  }
  if (req.query?.event && typeof req.query?.event !== "string") {
    errors.push("Invalid event");
  }

  if (errors.length === 0) {
    return;
  }
  return res.status(HTPP_STATUS_CODES.BAD_REQUEST).send(errors.join(", "));
};
