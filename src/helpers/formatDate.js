import PropTypes from "prop-types";

export const formatDate = (createdAt) => {
    const date = createdAt
        .toDate()
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ")
        .replace(/(?:\d) /, ", ");
    const time = createdAt
        .toDate()
        .toTimeString()
        .split(":")
        .slice(0, 2)
        .join(":");
    return `${date} | ${time}`;
};

formatDate.propTypes = {
    createdAt: PropTypes.object.isRequired,
}
